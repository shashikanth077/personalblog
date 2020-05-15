import React from 'react';
import classes from '../../Contact/Contact.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.button,props.button_a].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;