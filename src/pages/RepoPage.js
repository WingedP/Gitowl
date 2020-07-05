import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './pageStyle/repopageStyle.css'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";

import Moment from 'react-moment';


export default function RepoPage(props) {
let [spinnerLoad, setSpinnerLoad] = useState(true)
//  console.log("repoList props", props.repoList)
 
 let handlePageChange= pageNumber => {
    console.log(`active page is ${pageNumber}`);
    props.setPage(pageNumber);
    props.getSearch(props.searchTerm, pageNumber)
}


 let renderRepoList = props.repoList.map(el=>{
    return(<div className="renderRepoList">
<div  className="renderRepoList-inner">

<div className="repo-link-fullname">     
     <i style={{fontSize:"1.3rem", marginRight:".5rem"}} class="far fa-address-book"></i>
      <Link to={`./repos/${el.full_name}/issues`} > {el.full_name}</Link>  
        
     </div>

<div className="repo-description">{el.description}</div>

<div className="repo-time">
<div style={{paddingRight:"1.5rem", color:"black"}}><i class="far fa-star"></i>{el.stargazers_count}</div>
<div style={{paddingRight:"1.5rem", color:"black"}}>{el.language}</div>

<div style={{paddingRight:"1.5rem"}}>Last updated <Moment fromNow>{el.updated_at}</Moment></div>
<div>Created at <Moment  format="D MMM YYYY" withTitle >{el.updated_at}</Moment></div>    
</div>

</div>
     </div>)})


  if(props.repoList.length<=0) return (
  <div className="sweet-loading"><ClipLoader size={150} color={"#123abc"} loading={spinnerLoad}/></div>)
    return (
        <div className="repostyle">
            <div className="searchIntroText">Here is what you are searching:
            <span className="repoNumber">    {props.totalResult} </span>
            repositories results</div>
            <div className="searchIntroText2">Not what you want? Try another words.</div>
            <div className="paginationrange-mobile">
<Pagination
          activePage={props.page}
          itemsCountPerPage={props.perPage}
          totalItemsCount={props.totalResult}
          pageRangeDisplayed={10}
          onChange={handlePageChange.bind(this)}
          />
</div>
            <div className="breakline"></div>
            <div className="renderRepoList-wrapper">    {renderRepoList} </div>

<div className="paginationrange">
<Pagination
          activePage={props.page}
          itemsCountPerPage={props.perPage}
          totalItemsCount={props.totalResult}
          pageRangeDisplayed={10}
          onChange={handlePageChange.bind(this)}
          />
</div>

        </div>
    )
}
