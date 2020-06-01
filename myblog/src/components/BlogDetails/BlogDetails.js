import React from 'react';
import './BlogDetails.css';
import {Link} from 'react-router-dom';

const BlogDetails = (props) => {

    return <section className="blog-wrapper sect-pt4" id="blog">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="post-box">
            <div className="post-thumb">
              <img src={props.blogdetails[0].blog_image} className="img-fluid" alt="" />
            </div>
            <div className="post-meta">
            <h1 className="article-title">{props.blogdetails[0].blog_title}</h1>
              <ul>
                <li>
                  <span className="ion-ios-person"></span>
                  <a href="#">{props.blogdetails[0].blog_author}</a>
                </li>
                <li>
                  <span className="ion-pricetag"></span>
                  <a href="#">{props.blogdetails[0].blog_type}</a>
                </li>
                <li>
                  <span className="ion-chatbox"></span>
                  <a href="#">14</a>
                </li>
              </ul>
            </div>
            <div className="article-content">
              {props.blogdetails[0].blog_description}
            </div>
          </div> 
          </div>
          <div className="col-md-4">
            <div className="widget-sidebar sidebar-search">
              <h5 className="sidebar-title">Search</h5>
              <div className="sidebar-content">
                <form>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..." />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary btn-search" type="button">
                        <span className="ion-android-search"></span>
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="widget-sidebar">
              <h5 className="sidebar-title">Recent Post</h5>
              <div className="sidebar-content">
                <ul className="list-sidebar">

                  {props.recentpost.map((item, key) =>
                  <li>
                    <Link key={item.id} to={{pathname : '/blogdetails', state: {orderID: item.id}}}>{item.blog_title}</Link>
                  </li>
                  )}
                </ul>
              </div>
            </div>
           
            <div className="widget-sidebar widget-tags">
              <h5 className="sidebar-title">Tags</h5>
              <div className="sidebar-content">
                <ul>

                {props.tags.map((item, key) =>
                  <li>
                    <Link key ={item.id} to={{pathname : '/blogdetails', state: {orderID: item.id}}}>{item.tag_name}</Link>
                  </li>
                  )}
                
               
                </ul>
              </div>
            </div>
          </div>
          </div>
          </div>
         
          </section>
}

export default BlogDetails;