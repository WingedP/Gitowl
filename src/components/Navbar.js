import React, { useState, useEffect } from 'react';
import {CSSTransition} from 'react-transition-group';
import {Link, useHistory} from 'react-router-dom';

import './componentStyle/navbarStyle.css';

export default function Navbar(props) {
  let history = useHistory();
  let [authUser,setAuthUser] = useState({});
  const getAuthUser = async()=>{
    const response=await fetch(`https://api.github.com/user`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/vnd.github.mercy-preview+json', 
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
    const data= await response.json();
    setAuthUser(data);
  }

useEffect(()=>{getAuthUser()},[])
return (
<nav className="navbar">
<span className="brandname">GITOWL</span>


<form className="nav-search-form" onSubmit={(e)=>{e.preventDefault(); props.getSearch(props.searchTerm);}}>
<img className="owlicon"  src="/images/owlicon.png"></img>
<div className="navsearch-input-wrapper">  <input className="navsearch-input" type="search" id="gsearch" name="gsearch" 
onChange={e=>props.setSearchTerm(e.target.value)} value={props.searchTerm}
/><button className="nav-search-btn" type="submit"><i class="fas fa-search"></i></button>
</div>
</form>

<ul className="navbar-nav">
<AuthUser authUser={authUser}/>
<NavItemHome icon={<Icon1/>}/>
<NavItem icon={<Icon3/>}/>
<NavItem icon={<Icon2/>}>
<DropdownMenu authUser={authUser} icon={<Icon2/>} />
</NavItem>
</ul>
</nav>
    )
}

let AuthUser=(props)=>{
  return(<Link className="auth-user-pillbtn"> 
    <img className="auth-user-avatar" src={`${props.authUser.avatar_url}`}></img>
     <div  className="auth-user-name"> {props.authUser.login} </div>
      </Link>);
}


function Icon1(){return(<i style={{fontSize:"2rem", color:"black"}} class="fas fa-home"></i>)}
function Icon2(){return(<i style={{fontSize:"2rem", color:"black"}}  class="owliconz fab fa-earlybirds"></i>)}
function Icon3(){return(<i style={{fontSize:"2rem", color:"black"}}  class="owlbell fas fa-bell"></i>)}
function Icon4(){return(<i style={{fontSize:"2rem", color:"black"}} class="fas fa-cog"></i>)}
function FeedbackIcon(){return(<i style={{fontSize:"2rem", color:"black"}} class="fab fa-whatsapp"></i>)}
function IconChevron(){return(<i style={{fontSize:"2rem", color:"black"}} class="fas fa-chevron-right"></i>)}
function ChevronLeft(){return(<i style={{fontSize:"2rem", color:"black"}} class="fas fa-chevron-left"></i>)}
function GoRight(){return(<i style={{fontSize:"2rem", color:"black"}} class="fas fa-skating"></i>)}
function GoLeft(){return(<i style={{fontSize:"2rem", color:"black"}} class="far fa-hand-point-left"></i>)}

function NavItem(props){
  const [open,setOpen] = useState(false);

  return(
  <li className="nav-item">
  <a href="#" className="icon-button" onClick={()=>{setOpen(!open)}}>{props.icon}</a>
  {open && props.children}
  </li>
)}
function NavItemHome(props){
  return(
  <li className="nav-item">
  <a href="https://gitowl.netlify.app" className="icon-button">{props.icon}</a>
  </li>
)}
function DropdownMenu(props){
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
function calcHeight(el){
  const height=el.offsetHeight;
  setMenuHeight(height);
}
  function DropdownItem(props){
    return(
    <a href="#" className="menu-item" onClick={()=>{props.goToMenu && setActiveMenu(props.goToMenu)}}> 
      <span className="nav-icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
  )}


  return(<div className="dropdown" style={{height:menuHeight}}>


    <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
<div className="menu">
  <Link className="menu-item" to={`/${props.authUser.login}`}>
  <img className="auth-user-avatar" src={`${props.authUser.avatar_url}`}></img>
 <div className="menu-username1">
   <div className="menu-username">{props.authUser.login}</div>
 <div className="menu-username2">See your profile</div>
 </div>
</Link>

<div className="breakline"></div>
<DropdownItem leftIcon={<FeedbackIcon/>}>
  <div className="feedback">
    <div>    Give Gitowl feedback
</div>
    <div  className="improve">    Help us improve
</div>

  </div>
</DropdownItem>
<div className="breakline"></div>

    <DropdownItem leftIcon={<Icon1/>}>Home</DropdownItem>
    <DropdownItem leftIcon={<Icon4/>} 
    rightIcon={<IconChevron/>}
    >Setting & Privacy</DropdownItem>
   <DropdownItem leftIcon={<GoRight/>}    rightIcon={<IconChevron/>} goToMenu="settings"
    >Go right!</DropdownItem>
  
      <div className="privacystuff">
      Privacy  · Terms  · Advertising  · Ad choices   · Cookies  ·   · NhanzNguyen © 2020
      </div>
 
</div>

    </CSSTransition>
    <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
<div className="menu">
    <DropdownItem>My secondary</DropdownItem>
    <DropdownItem leftIcon={<Icon4/>}>Stuff</DropdownItem>
   <DropdownItem leftIcon={<GoLeft/>} rightIcon={<ChevronLeft/>} goToMenu="main">Go left!</DropdownItem>
   <DropdownItem leftIcon={<Icon4/>}>Stuff</DropdownItem>
   <DropdownItem leftIcon={<Icon4/>}>Stuff</DropdownItem>
   <DropdownItem leftIcon={<Icon4/>}>Stuff</DropdownItem>
   <DropdownItem leftIcon={<Icon4/>}>Stuff</DropdownItem>
</div>

    </CSSTransition>




  </div>)}