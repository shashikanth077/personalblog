import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className="navbar-nav">
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/about" >About</NavigationItem>
        <NavigationItem link="/services" >Services</NavigationItem>
        <NavigationItem link="/contact" >Contact</NavigationItem>
    </ul>
);

export default navigationItems;