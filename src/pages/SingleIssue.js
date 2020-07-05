import React, { useState, useEffect } from 'react';
import {Link, useParams,useLocation, useHistory } from "react-router-dom";
import PostComment from '../components/PostComment';
import './pageStyle/singleissueStyle.css'
import Moment from 'react-moment';

export default function SingleIssue() {
    const [singleIssue,setSingleIssue] = useState([]);
    const [comments,setComments] = useState([]);

    const issueLabels = singleIssue.labels;
    let params  = useParams(); 
    let fullname = params.owner + "/" + params.repo;
    let issueNum = params.issuenum;
    useEffect(()=>{
      getSingleIssues(); getComments()},[])


    const getComments = async () => {
      let res = await fetch(`https://api.github.com/repos/${fullname}/issues/${issueNum}/comments`, {
          method: "GET",
          headers: {
              "Content-Type": "application/vnd.github.mercy-preview+json"
          }
      });
      let data = await res.json();
      console.log('comments:',data);
      setComments(data);
  }
    const getSingleIssues = async()=>{
        const response=await fetch(`
        https://api.github.com/repos/${fullname}/issues/${issueNum}`,{
          method: "GET", 
          headers: {
            'Content-Type': 'application/vnd.github.mercy-preview+json', 
          },
        }) 
        const data= await response.json();
        console.log("getSingleIssues data",data)
        setSingleIssue(data);
  }

    if(!issueLabels) return(<div>no labels</div>);
    let labelrender = issueLabels.map(el=>{return(<div><span className="label-name"> {el.name}</span></div>
    )})

if(!comments) return(<div>no comments</div>);
      let renderAllComments = comments.map(el=>{return(
      <div className="issues-comment">


<div className="issues-user-detail">  
<img className="user-avatar" src={el.user.avatar_url} alt=""/> 
<div>
<div className="issueAuthor"><a href={el.user.html_url}>{el.user.login}</a></div>    
<div><span className="create-update">commented  <Moment className="issueTimeOpened text-muted" fromNow>{el.created_at}</Moment> 
</span>

</div>
</div>
</div>
<span> {el.body}</span>

      </div>
      
      )})

    return (
        <div className="single-issue-style">
            {/* <PostComment fullname={fullname} issueNum={issueNum}/> */}


<div className="single-issue-title">  
<div className="single-issue-title1"> {singleIssue.title} </div>
<div className="single-issue-detailz">
<div className="single-issue-number">#{singleIssue.number}</div>
<div className="single-issue-state">
{singleIssue.state == "open"? 
<i style={{paddingRight:".3rem", color:"#48db7c"}} class="fas fa-exclamation-circle"></i> 
: <i class="fas fa-check-circle"></i>}{singleIssue.state}
</div>

<div className="issue-comments">
    <span><i style={{paddingRight:"1.2rem"}} class="far fa-comment-alt"></i></span>   
    <span>{singleIssue.comments}</span></div>


</div>
<div style={{display:"flex", alignItems:"center"}}><PostComment fullname={fullname} issueNum={issueNum}/>
<span className="labelrender" >{labelrender}</span></div>

    
    </div>


    <div className="render-all-comments">{renderAllComments}</div>


        </div>
    )
}
