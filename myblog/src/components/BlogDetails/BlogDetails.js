import React from 'react';
import './BlogDetails.css';

const BlogDetails = (props) => {

    return <section className="blog-wrapper sect-pt4" id="blog">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="post-box">
            <div className="post-thumb">
              <img src={props.blog_image} className="img-fluid" alt="" />
            </div>
            <div className="post-meta">
            <h1 className="article-title">{props.blog_title}</h1>
              <ul>
                <li>
                  <span className="ion-ios-person"></span>
                  <a href="#">{props.blog_author}</a>
                </li>
                {/* <li>
                  <span className="ion-pricetag"></span>
                  <a href="#">{props.blog_title}</a>
                </li> */}
                <li>
                  <span className="ion-chatbox"></span>
                  <a href="#">14</a>
                </li>
              </ul>
            </div>
            <div className="article-content">
              {props.blog_description}
            </div>
          </div> 
          </div>
          </div>
          </div>
          </section>
}

export default BlogDetails;