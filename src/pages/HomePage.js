import React from 'react';
import Guide from '../components/Guide';
import './pageStyle/homepageStyle.css';

export default function HomePage() {
    return (
        <div className="homepagestyle">
            <div className="home-boxstyle"></div>
            <div className="home-boxstyle1"></div>
            <div className="home-boxstyle1"></div>

            <Guide/>
            <div className="examplehome">
             <h1>Example:</h1>
             <h2>facebook/React</h2>    
            <h2>WingedP/tic-tac-toe</h2>    
            </div>
  
        </div>
    )
}
