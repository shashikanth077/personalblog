import React ,{Component} from 'react';
import Bann from '../../components/Banner/Banner'
import bannerImage from "../../assets/images/intro-bg.jpg";
import Aux from '../../hoc/Auxiliary'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../utility/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Banner extends Component {
      
    componentDidMount () {
        this.props.onFetchPersonalData();
    }    

    render() {
        
        let data = <Spinner />
        
        if(!this.props.loading) {
            
            let sectionStyle = {
                backgroundImage: `url(${bannerImage})`
            };

            data = this.props.personaldata.map( data => (
                <Bann
                    key={data.id}
                    style={sectionStyle}
                    name={data.name}
                    designation={data.designation} />
            ) )

            //console.log(this.props.personaldata);
   
        }
      

        return (
            <div>
                {data}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        personaldata: state.personal.personal,
        loading: state.personal.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPersonalData: () => dispatch( actions.fetchPersonal() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Banner, axios ) );