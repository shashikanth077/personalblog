import React ,{Component} from 'react';
import Blg from '../../components/Blog/Blog'
import bannerImage from "../../assets/images/intro-bg.jpg";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../utility/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Blog extends Component {
      
    componentDidMount () {
        this.props.onFetchBlogData();
    }    

    render() {
        
        let data = <Spinner />
        
        if(!this.props.loading) {
        
                
            data = this.props.blog.map( data => (
                <Blg
                    key={data.id}
                    image={data.blog_image}
                    blog_author={data.blog_author}
                    created_date={data.created_date}
                    blog_title={data.blog_title}
                    blog_type={data.blog_type}
                    blog_description={data.blog_description} />
            ) )

            //console.log(this.props.personaldata);
   
        }
      

        return (
            <section id="blog" class="blog-mf sect-pt4 route">
            <div class="container">
              <div class="row">
                <div class="col-sm-12">
                  <div class="title-box text-center">
                  </div>
                </div>
              </div>
              <div class="row">
                {data}
                </div>  
            </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        blog: state.blog.blog,
        loading: state.blog.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBlogData: () => dispatch( actions.fetchblogs() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Blog, axios ) );