import React from 'react';
import './Blog.css';

const Blog = (props) => {

    return <div class="col-md-4">
          <div class="card card-blog">
            <div class="card-img">
            <a href="#" ><img  className="img-fluid" src={props.image} alt={props.blog_title} /></a>  
            </div>
            <div class="card-body">
              <div class="card-category-box">
                <div class="card-category">
<h6 class="category">{props.blog_type}</h6>
                </div>
              </div>
              <h3 class="card-title"><a href="#">See more details about {props.blog_type}</a></h3>
              <p class="card-description">
              {props.blog_description}
              </p>
            </div>
            <div class="card-footer">
              <div class="post-author">
              {props.blog_author}
              </div>
              <div class="post-date">
                <span class="ion-ios-clock-outline"></span> {props.created_date}
              </div>
            </div>
          </div>
        </div>
}

export default Blog;