import {Container, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export const AdminSettings = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pages, setPages] = useState<number>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/admin_settings`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setPages(data.perPage);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        perPage: Yup.number()
            .positive("The no of pages must be greater than zero!")
            .typeError("The no of pages must be a number!")
            .required("This field is required!")

    });

    const handleUpdate = (formValue: { perPage: number; }) => {
        if (currentUserRole === "admin"){
            const {perPage} = formValue;

            setMessage("");
            setLoading(true);

            axios.put(`${BACKEND_API_URL}/admin_settings/${perPage}`, {headers: authHeader()})
                .then(
                () => {
                    navigate(`/users`);
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
        navigate("/users");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Update per page setting:</h1>
            <Box>
                {pages && (
                    <Formik
                        initialValues={{
                            perPage: pages,
                        }}
                        validationSchema={currentUserRole === "admin" ? validationSchema : Yup.object()}
                        onSubmit={handleUpdate}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="perPage">Per page setting:</label>
                                <Field name="perPage" type="number" className="form-control"/>
                                <ErrorMessage
                                    name="perPage"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Update per page setting</span>
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


