import React, { useState, useEffect } from 'react';
import {Link, useParams,useLocation, useHistory } from "react-router-dom";
import Modali, { useModali } from 'modali';
import './postIssueStyle.css';

export default function PostIssue(props) {
    let [formInput, setFormInput] = useState({});
    let history = useHistory();
    let token = props.token;
    let params  = useParams(); 
    let fullname = params.owner + "/" + params.repo
    const [completeExample, toggleCompleteModal] = useModali({
        animated: true,
        title: 'Add Issue',
      });

      const handleSubmitchange=(e)=>{setFormInput({...formInput, [e.target.name] : e.target.value })  }

      const submitIssue = async(e)=> {
        e.preventDefault();       
        console.log("formInput", formInput);
        try{
        const url = `https://api.github.com/repos/${fullname}/issues`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`
                // Authorization: `token ${props.token}`
              },
            body: JSON.stringify(formInput)
        });             
      } 
        catch (error) {console.log(error)}
      alert('Create Issue Success')
      history.goBack()
      }


return (
        <div>
    <button className="add-issue-btn" onClick={toggleCompleteModal}>
    <i style={{fontSize:"1.3rem"}} class="fas fa-wrench"></i>
      Add issue  </button>
      <Modali.Modal {...completeExample}>

<form className="post-issue-form" onChange={handleSubmitchange} onSubmit={submitIssue}>

<div className="form-group">
{/* <label for="exampleFormControlInput1">Issue's title:</label> */}
<div>Issue's title:</div>
<input 
name='title' placeholder="Title" type="text" className="form-control-title"  
id="exampleFormControlInput1"/></div>

<div className="form-group">
<div>Issue's content:</div>
<textarea  name='body'  className="form-control-content"  id="exampleFormControlTextarea1"rows="6"> </textarea>
</div>

<div className="submitbtn">
<Modali.Button label="Cancel" isStyleCancel onClick={() => toggleCompleteModal()}/>
<button type="submit" >submitIssue</button>
</div>

</form></Modali.Modal></div>
    )
}



// const handleSubmit = async (e) => {
//   e.preventDefault()
//   try {
//       const url = `https://api.github.com/repos/${fullname}/issues`;
//       const response = await fetch(url, {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//               Authorization: `token ${props.token}`
//           },
//           body: JSON.stringify(formInput)
//       });
//       console.log(response)
//       if (response.status * 1 === 422) {
//           throw new Error(response.statusText = alert('Data could not be posted Error 422 Unprocessable Entity'))
//       }
//   } catch (error) {
//       console.log(error)
//   }
//   alert('Create Issue Success')
//   history.goBack()
// }