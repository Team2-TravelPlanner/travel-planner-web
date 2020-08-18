import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik, yupToFormErrors } from 'formik';
import { Formik } from 'formik';
import * as yup from 'yup';

class Login extends React.Component {
    state = {
        validated: false,
        password: 0,
        confirm_password: 0,
        temp: true,
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
    handleLoginForm = () => {
        this.props.isLoginData(false);
    };

    handleRegisterForm = () => {
        this.props.isRegisterData(false);
    };
    //Handle Submit. TODO(Http request.)
    handleSubmitLogin = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true })
    }
    handleSubmitRegister = (event) => {
        const form = event.currentTarget;
        const compare = this.state.password === this.state.confirm_password
        console.log(compare)
        if (form.checkValidity() === false || compare === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true })
    }
    render() {
        return (
            <div>
                {/* Modal is the pop up window */}
                {<Modal show={this.props.isLoginForm} onHide={this.handleLoginForm}> 

                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Formik and yup are used to validate input of form */}
                        <Formik
                            validationSchema={this.LoginSchema}
                            onSubmit={console.log}
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

                                    <Button variant="secondary" onClick={this.handleLoginForm}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Submit
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
                            onSubmit={console.log}
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
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
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

                                    <Button variant="secondary" onClick={this.handleLoginForm}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit" >
                                        Submit
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