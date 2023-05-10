import {Container, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {User} from "../../models/User";
import {UserAccount} from "../../models/UserAccount";

export const UserUpdate = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {userId} = useParams();
    const [user, setUser] = useState<User>();
    const [userAccount, setUserAccount] = useState<UserAccount>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/users/${userId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setUserAccount(data.user_account);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .typeError("The username of the user must be a string!")
            .required("This field is required!"),
        password: Yup.string()
            .typeError("The password of the user must be a string!")
            .required("This field is required!"),
        name: Yup.string()
            .typeError("The name of the user must be a string!")
            .required("This field is required!"),
        bio: Yup.string()
            .typeError("The bio of the user must be a string!")
            .required("This field is required!"),
        birthday: Yup.string()
            .typeError("The birthday of the user must be a string!")
            .required("This field is required!"),
        gender: Yup.string()
            .typeError("The gender of the user must be a string!")
            .required("This field is required!"),
        address: Yup.string()
            .typeError("The address of the user must be a string!")
            .required("This field is required!")
    });

    const handleUpdate = (formValue: { username: string; password: string; name: string; bio: string; birthday: string; gender: string; address: string;}) => {
        if (currentUserRole === "admin"
            || currentUserRole === "moderator"
            || (currentUserRole === "regular" && currentUserId == user?.user_id)) {
            const {username, password, name, bio, birthday, gender, address} = formValue;

            setMessage("");
            setLoading(true);

            const updatedUser = {
                username: username,
                password: password,
                user_id: currentUserId,
            };

            axios.put(`${BACKEND_API_URL}/users/${userId}`, updatedUser, {headers: authHeader()})
                .then((response) => {
                    const byUser = response.data.id;

                    const updatedUserAccount = {
                        name: name,
                        bio: bio,
                        birthday: birthday,
                        gender: gender,
                        address: address,
                        user_id: byUser,
                    };

                    axios.put(`${BACKEND_API_URL}/user_accounts/${userId}`, updatedUserAccount, {headers: authHeader()})
                        .then(
                            () => {
                                navigate(`/users/${userId}/details`);
                            },
                            (error) => {
                                const resMessage =
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString();

                                setLoading(false);
                                setMessage(resMessage);
                            }
                        );
                })
                .catch((error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                });


        } else {
            handleShow()
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/users");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Update user:</h1>
            <Box>
                { user && (
                <Formik
                    initialValues={{
                        username: user?.username,
                        password: user?.password,
                        name: userAccount?.name,
                        bio: userAccount?.bio,
                        birthday: userAccount?.birthday,
                        gender: userAccount?.gender,
                        address: userAccount?.address
                    }}
                    validationSchema={(currentUserRole === "regular" && currentUserId == user?.user_id) || currentUserRole === "admin" || currentUserRole === "moderator" ? validationSchema : Yup.object()}
                    onSubmit={handleUpdate}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className="form-control"/>
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="text" className="form-control"/>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <Field name="bio" type="text" className="form-control"/>
                            <ErrorMessage
                                name="bio"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Birthday</label>
                            <Field name="birthday" type="text" className="form-control"/>
                            <ErrorMessage
                                name="birthday"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <Field name="gender" type="text" className="form-control"/>
                            <ErrorMessage
                                name="gender"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field name="address" type="text" className="form-control"/>
                            <ErrorMessage
                                name="address"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Update user</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        {show && (
                            <Modal show={show} onHide={handleClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Error</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>You must be an <b>authenticated moderator or admin</b> to perform this operation!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleClose}>Understood</Button>
                                </Modal.Footer>
                            </Modal>
                        )}

                        <Button style={{margin: "24px 24px 0 0"}} variant="danger" onClick={handleCancel}>Cancel</Button>
                    </Form>
                </Formik>
                )}
            </Box>
        </Container>
    );
};

