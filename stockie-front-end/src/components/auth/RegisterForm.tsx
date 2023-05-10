import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../services/auth.service";
import {User} from "../../models/User";
import {BACKEND_API_URL} from "../../constants";
import {useNavigate} from "react-router-dom";

const RegisterForm: React.FC = () => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [toLogin, setToLogin] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [confirmationCode, setConfirmationCode] = useState<string>("");
    const navigate = useNavigate();

    const initialValues: User = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 8 and 40 characters and must contain 1 upper case letter, 1 lowercase letter and 1 digit .",
                (val: any) =>
                    val &&
                    val.toString().length >= 8 &&
                    val.toString().length <= 40 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}$/.test(val)
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue: User) => {
        const { username, password } = formValue;

        register(username, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setConfirmationCode(response.data.confirmation_code);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    const handleConfirmation = () => {
        const url = `${BACKEND_API_URL}/register/confirm/${confirmationCode}`;

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    // Registration confirmed, redirect to login page
                    setToLogin(true);
                } else {
                    // Confirmation failed, show error message
                    return response.json();
                }
            })
            .then((data) => {
                if (data && data.message) {
                    setMessage(data.message);
                    setSuccessful(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const handleLogin = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/login");
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username"> Username </label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block mt-3">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}

                        {!toLogin && successful && confirmationCode && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="confirmationCode">Please copy this confirmation code in order to confirm your account:</label>
                                    <label style={{display: "inline-block", width: "100%"}}><b>{confirmationCode}</b></label>
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        name="confirmationCode"
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary btn-block mt-3" onClick={handleConfirmation}>Confirm</button>
                                </div>
                            </div>
                        )}
                        {toLogin && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="confirmationCode">Great, your account has been created. Plase go to the login page to enter in your account!</label>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary btn-block mt-3" onClick={handleLogin}>Go to login page</button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default RegisterForm;
