import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Home from './containers/Banner/Banner';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary'

const asyncAbout = asyncComponent(() => {
  return import('./containers/About/About');
});

const asyncServices = asyncComponent(() => {
  return import('./containers/Services/Services');
});

const asyncContact = asyncComponent(() => {
  return import('./containers/Contact/Contact');
});

const asyncBlog = asyncComponent(() => {
  return import('./containers/Blog/Blog');
});

const asynBlogDetails = asyncComponent(() => {
  return import('./containers/BlogDetails/BlogDetails');
});

class App extends Component {
 
  render () {
   
    let mainroute = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={asyncAbout} />
          <Route path="/services" component={asyncServices} />
          <Route path="/contact" component={asyncContact} />
          <Route path="/blog" component={asyncBlog} />
          <Route path="/blogdetails" component={asynBlogDetails} />
        </Switch>
      );
    
    return (
      <div>
       
        <Layout>
          <ErrorBoundary>
            {mainroute}
          </ErrorBoundary>
 
        </Layout>
      </div>
    );
  }
}

App.defaultProps = {
};

export default withRouter(App);

