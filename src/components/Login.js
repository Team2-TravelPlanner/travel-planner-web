import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

class Login extends React.Component {
    state = {
        LoginStatus: false,
        RegisterStatus: false
    };
    //Schemas used to validate input of form.
    RegisterSchema = yup.object({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], "Password does not match")
            .required('Password confirm is required'),
    })
    LoginSchema = yup.object({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
    })
    //When forms close, need to set the state of its parent(App) back to false. 
    switchToRegister = () => {
        this.props.isLoginData(false);
        this.props.isRegisterData(true);
    }

    switchToLogin = () => {
        this.props.isRegisterData(false);
        this.props.isLoginData(true);
    }

    handleLoginForm = () => {
        this.props.isLoginData(false);
        if (this.state.RegisterStatus === true) {
            this.setState({RegisterStatus : false})
        }
    };

    handleRegisterForm = () => {
        this.props.isRegisterData(false);
    };
    //Handle Submit. TODO(Http request.)
    handleSubmitLogin = (event) => {
        console.log(event);
        const URL = 'http://localhost:8080/users/login'
        Axios({
            method: 'POST',
            url: URL,
            data: {
                email: event.email,
                password: event.password,
                userName: event.userName
            }
        })
        .then(
            response => {
                console.log(response.data.operationResponse.failed);
                if (response.data.operationResponse.failed === false) {
                    this.setState({LoginStatus : true})
                    this.props.ID(response.data.id)
                    this.props.TOKEN(response.data.token)
                    this.props.loginStatus(true)
                    this.handleLoginForm();
                }
            }
        )
        .catch(
            response => {
                console.log('failed')
            }
        )
    }
    handleSubmitRegister = (event) => {
        console.log(event);
        const URL = 'http://localhost:8080/users/register'
        Axios({
            method: 'POST',
            url: URL,
            data: {
                email: event.email,
                password: event.password,
                userName: event.userName
            }
        })
        .then(
            response => {
                console.log(response.data);
                if (response.data.failed === false) {
                    this.setState({RegisterStatus : true})
                    this.handleRegisterForm();
                }
            }
        )
        .catch(
            response => {
                console.log('failed')
            }
        )
    }
    render() {
        return (
            <div className=".login">
                {/* Modal is the pop up window */}
                {<Modal show={this.props.isLoginForm} onHide={this.handleLoginForm}>

                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Formik and yup are used to validate input of form */}
                        <Formik
                            validationSchema={this.LoginSchema}
                            onSubmit={this.handleSubmitLogin}
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                        >
                            {/* Form start here */}
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors }) => (<Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name='email'
                                            onChange={handleChange}
                                            isInvalid={!!errors.email && touched.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="UserName"
                                            name='userName'
                                            onChange={handleChange}
                                            isInvalid={!!errors.userName && touched.userName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userName}
                                        </Form.Control.Feedback>
                                    </Form.Group>



                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.password && touched.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button size="sm" block="true" variant="link" onClick={this.switchToRegister}>
                                        Not registered? Sign up
                                    </Button> {' '}
                                    <Button block="true" className="Submit_Buttom" variant="primary" type="submit">
                                        Log in
                                    </Button>
                                </Form>
                                )}
                        </Formik>
                    </Modal.Body>
                </Modal>}

                {<Modal show={this.props.isRegisterForm} onHide={this.handleRegisterForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Formik
                            validationSchema={this.RegisterSchema}
                            onSubmit={this.handleSubmitRegister}
                            initialValues={{
                                email: '',
                                password: '',
                                confirm_password: '',
                            }}
                        >
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors }) => (<Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUserName">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name='email'
                                            onChange={handleChange}
                                            isInvalid={!!errors.email && touched.email}
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="UserName"
                                            name='userName'
                                            onChange={handleChange}
                                            isInvalid={!!errors.userName && touched.userName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.password && touched.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='confirm_password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirm_password && touched.confirm_password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirm_password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button size="sm" block="true" variant="link" onClick={this.switchToLogin}>
                                        Aready registered? Log in
                                    </Button> {' '}
                                    <Button block="true" className="Submit_Buttom" variant="primary" type="submit">
                                        Join
                                    </Button>
                                </Form>
                                )}
                        </Formik>
                    </Modal.Body>
                </Modal>}
                
                {<Modal show={this.state.RegisterStatus} onHide={this.handleLoginForm}>

                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Formik and yup are used to validate input of form */}
                        <Formik
                            validationSchema={this.LoginSchema}
                            onSubmit={this.handleSubmitLogin}
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                        >
                            {/* Form start here */}
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors }) => (<Form noValidate onSubmit={handleSubmit}>
                                    <Form.Text className="text-muted">
                                            You have successfully register. Please sign in. 
                                    </Form.Text>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name='email'
                                            onChange={handleChange}
                                            isInvalid={!!errors.email && touched.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="UserName"
                                            name='userName'
                                            onChange={handleChange}
                                            isInvalid={!!errors.userName && touched.userName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.password && touched.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button block="true" className="Submit_Buttom" variant="primary" type="submit">
                                        Sign in
                                    </Button>
                                </Form>
                                )}
                        </Formik>
                    </Modal.Body>
                </Modal>}
            </div>
        )
    }
}

export default Login;