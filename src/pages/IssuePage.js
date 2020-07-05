import React, { useState, useEffect } from 'react';
import {Link, useParams,useLocation, useHistory } from "react-router-dom";
import PostIssue from '../components/PostIssue';
import Tab from '../components/Tab';

import Moment from 'react-moment';
import './pageStyle/issuepageStyle.css'
import 'react-tabs/style/react-tabs.css';
import Pagination from "react-js-pagination";


export default function IssuePage(props) {
const [issues,setIssues]=useState([]);
const [singleRepo, setSingleRepo] = useState({});
// let location = useLocation(); console.log("location", location)
let params  = useParams(); 
let fullname = params.owner + "/" + params.repo;

let [page, setPage] = useState(1);
let perPage = 10;



const getIssues = async()=>{
    const response=await fetch(`
    https://api.github.com/repos/${fullname}/issues?per_page=${perPage}`,{
      method: "GET",  
      headers: {
        'Content-Type': 'application/vnd.github.mercy-preview+json', 
      },
    }) 
    const data= await response.json();
    // console.log("getIssues data",data)
    setIssues(data);
  }

const getSingleRepo = async()=>{
    const response=await fetch(`
    https://api.github.com/repos/${fullname}`,{
      method: "GET", 
      headers: {
        'Content-Type': 'application/vnd.github.mercy-preview+json', 
      },
    }) 
    const data= await response.json();
    console.log("single repo",data)
    setSingleRepo(data);
  }


let handlePageChange= async (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    // setPage(pageNumber);
    const response=await fetch(`
    https://api.github.com/repos/${fullname}/issues?page=${pageNumber}&per_page=${perPage}`,{
      method: "GET",  
      headers: {
        'Content-Type': 'application/vnd.github.mercy-preview+json', 
      },
    }) 
    const data= await response.json();
    // console.log("getIssues data",data)
    setIssues(data);

}

  
useEffect(()=>{getIssues(); getSingleRepo()},[])


let renderIssueList = issues.map(el=>{return(<div className="issue-list">


<div className="issue-headline">
<Link className="issue-headline2"  to={`/repos/${fullname}/issues/${el.number}`}>
<div style={{paddingRight:".5rem", marginRight:".5rem", borderRight:"1px solid gray"}}>{el.state == "open"? <i style={{paddingRight:".3rem", color:"#48db7c"}} class="fas fa-exclamation-circle"></i> : <i class="fas fa-check-circle"></i>}{el.state}</div>

<div className="issue-title">{el.title}
<span><i style={{paddingLeft:"1.2rem",fontSize:"1rem", color:"gray"}} class="fas fa-link"></i></span>

</div>
</Link>

 
  <div className="issue-comments">
<span> <i style={{paddingRight:"1.2rem"}} class="far fa-comment-alt"></i></span>   
    <span>{el.comments}</span></div>

</div>

<div className="issues-user-detail">  
<img className="user-avatar" src={el.user.avatar_url} alt=""/> 
<div>
<div className="issueAuthor"><a href={el.user.html_url}>{el.user.login}</a></div>    
<div><span className="create-update">opened <Moment className="issueTimeOpened text-muted" fromNow>{el.created_at}</Moment> 
</span>

<span className="create-update">  last updated <Moment className="issueTimeOpened text-muted" fromNow>{el.updated_at}</Moment> 
</span>
</div>

</div>


</div>


<div className="issues-labels-wrapper">
  {el.labels.map(label=>{return(<div className="issues-labels" style={{backgroundColor:`#${label.color}`}}>{label.name}</div>)})}
</div>  



    
    
    </div>)})


return (
        <div className="issuepage-style">
<div className="issuepage-header">
  <div className="issuepage-headerbox"></div>

  <div className="fullname-issuepage">
      <span style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div className="decor-fullname"></div>
  <div className="decor-fullname2"></div>
  </span>
<span>{fullname}</span>    



  </div>
  
<div className="issuepage-repocount">
  
<button className="btn-repo-detail"><span>
<i  style={{fontSize:"1.5rem"}} class=" issuepage-icon-style far fa-eye"></i></span> 
<span>{singleRepo.watchers_count  }</span>
 </button>


  <button className="btn-repo-detail"><span>
<i style={{fontSize:"1.5rem"}} class=" issuepage-icon-style fas fa-code-branch"></i></span>
    {singleRepo.forks_count}</button>


<button className="btn-repo-detail">
  <span><i  style={{fontSize:"1.5rem"}} class=" issuepage-icon-style far fa-star"></i></span>
  {singleRepo.stargazers_count}</button>
  </div>

<div>{singleRepo.description}</div>
<PostIssue/></div>


<Tab renderIssueList={renderIssueList}/>
<div className="paginationrange">
<Pagination 
          activePage={page}
          itemsCountPerPage={perPage}
          totalItemsCount={singleRepo.open_issues}
          pageRangeDisplayed={10}
          onChange={handlePageChange.bind(this)}
          />
</div>
        </div>
    )
}
