import React, { useState, useEffect } from 'react';
import {Link, useParams,useLocation, useHistory } from "react-router-dom";
import Modali, { useModali } from 'modali';
import './componentStyle/postcommentStyle.css';

//POST /repos/:owner/:repo/issues/:issue_number/comments


export default function PostComment(props) {
    let [formInput, setFormInput] = useState({});
    let history = useHistory();
    const [completeExample, toggleCompleteModal] = useModali({
        animated: true,
        title: 'Add Comment',
      });

    const handleSubmitChange =(e)=>{setFormInput({...formInput, [e.target.name]: e.target.value}) }
    const submitComment = async(e)=> {
        e.preventDefault();       
        console.log("formInput", formInput);
        try{
        const url = `https://api.github.com/repos/${props.fullname}/issues/${props.issueNum}/comments`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            body: JSON.stringify(formInput)
        });             
      } 
        catch (error) {console.log(error)}
      alert('Create Comment Success')
      history.goBack()
      }



    useEffect(()=> {    }, [])


    return (
        <div className="post-comment-style">
        <button className="post-comment-btn" onClick={toggleCompleteModal}>Add Comment  </button>
    <Modali.Modal {...completeExample}>
    
    <form className="post-comment-form" onChange={handleSubmitChange} onSubmit={submitComment}>
    
    <div className="form-group">
    <div>Comment here:</div>
    <textarea  name='body'  className="form-control-content"  id="exampleFormControlTextarea1"rows="6"> </textarea>
    </div>
    
    <div className="submitbtn">
    <Modali.Button label="Cancel" isStyleCancel onClick={() => toggleCompleteModal()}/>
    <button type="submit" >Comment</button>
    </div>
    
    </form></Modali.Modal></div>
    )
}
