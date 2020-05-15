import React,{Component} from 'react';
import ChildContact from '../../components/Contact/Contact'
import * as actions from '../../store/actions/index';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from '../../utility/axios';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../utility/utility';

class Contact extends Component {

    state = {
        contactForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
           
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            subject: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Subject'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Your Subject'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
            
        },
        formIsValid: false
    }


    contactHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.contactForm) {
            formData[formElementIdentifier] = this.state.contactForm[formElementIdentifier].value;
        }

       // console.log(formData);
        const contact = {
            contactData: formData,
          }

        this.props.onContact(contact);
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        //alert('d');
        const updatedFormElement = updateObject(this.state.contactForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.contactForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.contactForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        //console.log(updatedOrderForm);
        this.setState({contactForm: updatedOrderForm, formIsValid: formIsValid});
    }
    

    render() {

        const insertRedirect = this.props.status ? "Message Send Successfully" : null;

        const formElementsArray = [];
        for (let key in this.state.contactForm) {
                formElementsArray.push({
                id: key,
                config: this.state.contactForm[key]
            });
        }
        
        //console.log(formElementsArray);
        
        let form = (

            <div className="row">
                {insertRedirect}
                <form className="php-email-form" onSubmit={this.contactHandler}>
                    
                    {formElementsArray.map(formElement => (
                        <div className="col-md-12 mb-3">
                        <div className="form-group">
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        </div>
                    </div>    
                            ))}
                    
                    <Button button_big="button-big" button_a="button-a" btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                </form>
            </div>
        );

        let contactForm = ''
        if ( this.props.loading ) {
            contactForm = <Spinner />;
        }

        contactForm = <ChildContact form={form}/>
        
        return (
            <div className="">
              {contactForm}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
       loading: state.contact.loading,
       status:state.contact.contact
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onContact: (contactData) => dispatch(actions.InsertContact(contactData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contact, axios));
