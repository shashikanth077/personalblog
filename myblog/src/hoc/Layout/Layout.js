import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary';
import classes from './Layout.css';
import Footer from '../../components/Footer/Footer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  
    render () {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: ''
    };
};

export default connect( mapStateToProps )( Layout );