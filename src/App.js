import React, { useState, useEffect } from 'react';
import './App.css';
import {Link, useHistory} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import RepoPage from './pages/RepoPage';
import IssuePage from './pages/IssuePage';
import SingleIssue from './pages/SingleIssue';
import ProfilePage from './pages/ProfilePage';
import Pagination from "react-js-pagination";



function App() {
  let history = useHistory();
  const [token, setToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fullName, setFullName] = useState('');
  const [reps, setReps]=useState([]);
  let [totalResult,setTotalResult]= useState(0);
  let [page, setPage] = useState(1);
  let perPage = 10;

  const clientId = process.env.REACT_APP_CLIENT_ID;
  useEffect(() => {    
    const existingToken = localStorage.getItem('token');
    const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;

    if (!accessToken && !existingToken) {
      window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);
      let splitToken = accessToken.split("&")

      localStorage.setItem("token", splitToken[0]);
      setToken(splitToken[0])
    }

    if (existingToken) {
      setToken(existingToken);
    }
  }, [])

const getSearch =  async (searchTerm, pageN) => {
    let res = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${pageN}`, {
    method: "GET",
    headers: {
        "Content-Type": 'application/vnd.github.mercy-preview+json'
    }
});
    let data = await res.json();
    setReps(data.items);
    setTotalResult(data.total_count);
    history.push(`/repos`);    
}


return (
    <div className="gitowl-app">
<Navbar getSearch={getSearch} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
<Switch>
 <Route path="/" exact component={HomePage}/>
 <Route path="/repos" exact render={() => (<RepoPage repoList={reps} getSearch={getSearch}
  page={page} setPage={setPage} totalResult={totalResult} searchTerm={searchTerm} />)}/> 
 <Route path="/repos/:owner/:repo/issues" exact render={() => (<IssuePage token={token}/>)}/> 
<Route path="/repos/:owner/:repo/issues/:issuenum" exact render={() => (<SingleIssue/>)}/>
  <Route path="/:owner" exact render={() => (<ProfilePage  />)}/>
</Switch>
    </div>
  );
}

export default App;
