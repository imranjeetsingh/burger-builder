import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHandler = (WrappedContent, Axios) => {
    return class extends Component {
        state = {
            error : null
        }
        componentWillMount (){
           this.requestInterceptor =  Axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req
            })
            this.responseInterceptor = Axios.interceptors.response.use(res => res,error =>{
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            Axios.interceptors.request.eject(this.requestInterceptor);
            Axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmHandler = () =>{
            this.setState({error:null})
        }
        render() {
                return (
                    <Aux>
                        <Modal show = {this.state.error} modalClosed = {this.errorConfirmHandler}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedContent {...this.props} />
                    </Aux>
                )
            }
    }
}

export default ErrorHandler;