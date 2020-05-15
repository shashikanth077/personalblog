import React ,{Component} from 'react';
import Serv from '../../components/Services/Services'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../utility/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Banner extends Component {
      
    componentDidMount () {
        this.props.onServiceData();
    }    

    render() {
        
        let data = <Spinner />
        
        if(!this.props.loading) {
            data =  <Serv services={this.props.services}/>
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
        services: state.services.services,
        loading: state.services.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onServiceData: () => dispatch( actions.fetchServices() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Banner, axios ) );