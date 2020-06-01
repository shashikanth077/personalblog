import React ,{Component} from 'react';
import Details from '../../components/BlogDetails/BlogDetails'
import bannerImage from "../../assets/images/intro-bg.jpg";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../utility/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BlogDetails extends Component {
   
    componentDidMount () {
        this.props.onFetchBlogDetailsData(this.props.location.state.orderID);
    } 

    render() {

        let data = <Spinner />
        if(!this.props.loading) {
        
            console.log(this.props);
           
             if(this.props.blogdetails != undefined) {
                console.log(this.props.blogdetails);
                data  =    <Details recentpost={this.props.blogdetails[0].recentpost} tags={this.props.blogdetails[0].tags} blogdetails = {this.props.blogdetails[0].blogDetails} />
            
             }
  
        }

        return (
        <div>{data}</div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
      return {
        blogdetails: state.blogdetails.blogdetails,
        orderId: ownProps.location.state.orderID,
        loading: state.blogdetails.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBlogDetailsData: (orderId) => dispatch( actions.fetchblogDetails(orderId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BlogDetails, axios ) );