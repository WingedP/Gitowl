import React, { useState, useEffect } from 'react';
import {Link, useParams,useLocation, useHistory } from "react-router-dom";
import Modali, { useModali } from 'modali';
import './componentStyle/guideStyle.css';

export default function Guide() {
    const [completeExample, toggleCompleteModal] = useModali({
        animated: true,
        title: 'Add Issue',
      });
    return (
        <div>

<div className="introduction">
    <div  className="guide-intro">
        
<div> <span className="guide-brandname">GITOWL</span></div>

<div className="guide-intro2">
    <div style={{fontSize:"2.2rem", marginBottom:"1rem"}}>HERE YOU CAN:</div>

<div className="actionView">
<div  className="guide-img-repo-wrapper iconanim1"><img className="guide-img-repo" src="/images/repo.png"></img></div>
<div className="textwrapper">
<div className="something ">VIEW
<div className="action-view">   </div>
</div> 
<span>ALL GITHUB REPOSITORIES AND ISSUES</span></div>

</div>

<div className="actionAdd">
<div  className="guide-img-repo-wrapper iconanim2"><img className="guide-img-issue" src="/images/issue.png"></img></div>
<div className="textwrapper"><div className="something">
<div className="action-view">   </div>

  ADD</div> 
<span>NEW COMMENTS AND ISSUES</span></div>

</div>


{/* <div className="actionAdd">
<div  className="guide-img-repo-wrapper"><img className="guide-img-repo" src="/images/repo.png"></img></div>


<div>
<span className="something">ADD</span>
<span>NEW ISSUE (:( ) AND COMMENT</span>     
</div>

</div> */}

</div>
    
    </div>

<div className="owltalk">
<div class="talk-bubble round tri-right border btm-right-in">
  <div class="talktext">
<div>Examples: "username/repo name"</div>
<div>Type <span className="example-names">facebook/react</span>or 
<span  className="example-names">WingedP/tic-tac-toe</span>
into the searchbox.
</div>
  </div>
</div>
  <img className="guidingowl"  src="/images/owl.gif"></img>
</div>
  
</div>


<Modali.Modal {...completeExample}>


</Modali.Modal>
    
    </div>
    )
}
