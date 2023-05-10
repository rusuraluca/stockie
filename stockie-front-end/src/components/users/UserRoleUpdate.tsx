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

export const UserRoleUpdate = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {userId} = useParams();
    const [user, setUser] = useState<User>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/users/${userId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        role: Yup.string()
            .typeError("The role of the user must be a string!")
            .required("This field is required!")
    });

    const handleUpdate = (formValue: { role: string; }) => {
        if (currentUserRole === "admin" && user){
            const {role} = formValue;

            setMessage("");
            setLoading(true);

            const updatedUser = {
                role: role,
                user_id: currentUserId,
            };

            axios.put(`${BACKEND_API_URL}/users/${userId}`, updatedUser, {headers: authHeader()}).then(
                () => {
                    navigate(`/users/${userId}/details`);
                    return;
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
        } else {
            handleShow()
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/manage_users");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Update user:</h1>
            <Box>
                {user && (
                    <Formik
                        initialValues={{
                            role: user?.role || "",
                        }}
                        validationSchema={currentUserRole === "admin" ? validationSchema : Yup.object()}
                        onSubmit={handleUpdate}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <Field name="role" type="string" className="form-control"/>
                                <ErrorMessage
                                    name="role"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Update user role</span>
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
                                    <Modal.Body>You must be an <b>authenticated admin</b> to perform this operation!</Modal.Body>
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


