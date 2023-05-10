import {Container, Box} from "@mui/material";
import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import authHeader from "../../services/auth-header";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as AuthService from "../../services/auth.service";

export const CompanyAdd = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [currentUserRole, setCurrentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId, setCurrentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    const initialValues: {
        name: string,
        size: number,
        country: string,
        industry: string,
    } = {
        name: "",
        size: 0,
        country: "",
        industry: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .typeError("The industry of the company must be a string!")
            .required("This field is required!"),
        country: Yup.string()
            .typeError("The industry of the company must be a string!")
            .required("This field is required!"),
        size: Yup.number()
            .typeError("The size of the company must be a number!")
            .positive("The size of the company must be greater than zero!")
            .required("This field is required!"),
        industry: Yup.string()
            .typeError("The industry of the company must be a string!")
            .required("This field is required!"),
    });

    const handleAdd = (formValue: { name: string; size: number; country: string; industry: string }) => {
        if (currentUserRole === "regular" || currentUserRole === "admin" || currentUserRole === "moderator") {
            const {name, size, country, industry} = formValue;

            setMessage("");
            setLoading(true);

            const addedCompany = {
                name: name,
                size: Number(size),
                country: country,
                industry: industry,
                user_id: currentUserId,
            };

            axios.post(`${BACKEND_API_URL}/companies/`, addedCompany, {headers: authHeader()}).then(
                () => {
                    navigate("/companies");
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
        navigate("/companies");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Add a new company:</h1>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={currentUserRole === "regular" || currentUserRole === "admin" || currentUserRole === "moderator" ? validationSchema : Yup.object()}
                    onSubmit={handleAdd}
                >
                    <Form>
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
                            <label htmlFor="size">Size</label>
                            <Field name="size" type="text" className="form-control"/>
                            <ErrorMessage
                                name="size"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <Field name="country" type="text" className="form-control"/>
                            <ErrorMessage
                                name="country"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="industry">Industry</label>
                            <Field name="industry" type="text" className="form-control"/>
                            <ErrorMessage
                                name="industry"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Add company</span>
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
                                <Modal.Body>You must be <b>authenticated</b> to perform this operation!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleClose}>Understood</Button>
                                </Modal.Footer>
                            </Modal>
                        )}

                        <Button style={{margin: "24px 24px 0 0"}} variant="danger" onClick={handleCancel}>Cancel</Button>
                    </Form>
                </Formik>
            </Box>
        </Container>
    );
};
