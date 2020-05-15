import React from 'react';
import '../NavigationItems/NavigationItem/NavigationItem.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <nav className="navbar navbar-b navbar-trans navbar-expand-md fixed-top" >
     <div className="container">
     
        <a className="navbar-brand js-scroll" href="#page-top">Web TechDis</a>
        
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div className="navbar-collapse collapse justify-content-end" id="navbarDefault">
            <NavigationItems  />
        </div> 
     </div> 

    </nav>
);

export default toolbar;