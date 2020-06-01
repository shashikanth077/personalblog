import React from 'react';
import './Blog.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = (props) => {

    return <div className="col-md-4">
          <div className="card card-blog">
            <div className="card-img">
            <Link to={{pathname : '/blogdetails', state: {orderID: props.id}}}>
              <img  className="img-fluid" src={props.image} alt={props.blog_title} />
            </Link>  
            </div>
            <div className="card-body">
              <div className="card-category-box">
                <div className="card-category">
                      <h6 className="category">{props.blog_type}</h6>
                </div>
              </div>
              <h3 className="card-title"><a href="#">See more details about {props.blog_type}</a></h3>
              <p className="card-description">
              {props.blog_description}
              </p>
            </div>
            <div className="card-footer">
              <div className="post-author">
              {props.blog_author}
              </div>
              <div className="post-date">
                <span className="ion-ios-clock-outline"></span> {props.created_date}
              </div>
            </div>
          </div>
        </div>
}

Blog.propTypes = {
  blog_title:PropTypes.string,
  blog_type:PropTypes.string,
  blog_author:PropTypes.string,
}

export default Blog;