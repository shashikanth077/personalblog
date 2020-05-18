import React,{ Component } from "react";
import Aux from '../../hoc/Auxiliary'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../utility/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Abt from '../../components/About/About';

class About extends Component {

    componentDidMount () {
        this.props.onFetchAboutData();
    }
      
    
    render() {

        let data = <Spinner />
        
        if(!this.props.loading) {
            
            data = this.props.about.map( data => (
                <Abt
                    key={data.id}
                    skills={data.skills}
                    name={data.name}
                    email={data.email}
                    phone={data.phone}
                    designation={data.designation}
                    description={data.description} />
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
        about: state.about.about,
        loading: state.about.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAboutData: () => dispatch( actions.fetchabout() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( About, axios ) );
