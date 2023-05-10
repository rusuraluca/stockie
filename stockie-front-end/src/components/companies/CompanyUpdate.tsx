import {Container, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Company} from "../../models/Company";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export const CompanyUpdate = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {companyId} = useParams();
    const [company, setCompany] = useState<Company>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/companies/${companyId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setCompany(data);
            });
    }, []);

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

    const handleUpdate = (formValue: { name: string; size: number; country: string; industry: string; }) => {
        if (currentUserRole === "admin"
            || currentUserRole === "moderator"
            || (currentUserRole === "regular" && currentUserId == company?.user_id)) {
            const {name, size, country, industry} = formValue;

            setMessage("");
            setLoading(true);

            const updatedCompany = {
                name: name,
                size: size,
                country: country,
                industry: industry,
                user_id: currentUserId,
            };

            axios.put(`${BACKEND_API_URL}/companies/${companyId}`, updatedCompany, {headers: authHeader()}).then(
                () => {
                    navigate(`/companies/${companyId}/details`);
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
            <h1 style={{margin: "24px 0"}}>Update company:</h1>
            <Box>
                {company && (
                    <Formik
                        initialValues={{
                            name: company.name,
                            size: company.size,
                            country: company.country,
                            industry: company.industry
                        }}
                        validationSchema={(currentUserRole === "regular" && currentUserId == company?.user_id) || currentUserRole === "admin" || currentUserRole === "moderator" ? validationSchema : Yup.object()}
                        onSubmit={handleUpdate}
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
                                <Field name="size" type="number" className="form-control"/>
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
                                    <span>Update company</span>
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
