import {Container, TextField, Autocomplete, Box} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Company} from "../../models/Company";
import {debounce} from "lodash";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export const StocksAdd = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [currentUserRole, setCurrentUserRole] = useState<string | undefined>(undefined);
    const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        setCurrentUserRole(AuthService.getCurrentUserRole());
        setCurrentUserId(AuthService.getCurrentUserId());
    }, [currentUserRole, currentUserId]);

    const [company, setCompany] = useState<number>();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [prediction, setPrediction] = useState<number>();

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Company[]>(
                `${BACKEND_API_URL}/companies/autocomplete?query=${query}`);
            const data = await response.data;
            setCompanies(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 250), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    const initialValues: {
        ticker: string,
        current_price: number,
        min_price: number,
        max_price: number,
    } = {
        ticker: "",
        current_price: 0,
        min_price: 0,
        max_price: 0,
    };

    const validationSchema = Yup.object().shape({
        ticker: Yup.string()
            .typeError("The ticker of the stock must be a string!")
            .required("This field is required!"),
        current_price: Yup.number()
            .typeError("The current price of the stock must be a number!")
            .positive("The current price of the stock must be greater than zero!")
            .required("This field is required!"),
        min_price: Yup.number()
            .typeError("The minimum price of the stock must be a number!")
            .positive("The current price of the stock must be greater than zero!")
            .required("This field is required!"),
        max_price: Yup.number()
            .typeError("The maximum price of the stock must be a number!")
            .positive("The current price of the stock must be greater than zero!")
            .required("This field is required!"),
    });

    const handleAdd = (formValue: { ticker: string; current_price: number; min_price: number; max_price: number; }) => {
        if (currentUserRole === "regular" || currentUserRole === "admin" || currentUserRole === "moderator") {
            const {ticker, current_price, min_price, max_price} = formValue;

            setMessage("");
            setLoading(true);

            const addedStock = {
                ticker: ticker,
                current_price: current_price,
                min_price: min_price,
                max_price: max_price,
                company_id: company,
                user_id: currentUserId,
            };

            axios.post(`${BACKEND_API_URL}/stocks/`, addedStock, {headers: authHeader()} ).then(
                () => {
                    navigate("/stocks");
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
        navigate("/stocks");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Add a new stock:</h1>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={currentUserRole === "regular" || currentUserRole === "admin" || currentUserRole === "moderator" ? validationSchema : Yup.object()}
                    onSubmit={handleAdd}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <Autocomplete
                                id="company_id"
                                options={companies}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => <TextField {...params} variant="outlined"/>}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChange}
                                onChange={(event, value) => {
                                    if (value) {
                                        setCompany(value.id);
                                        fetch(`${BACKEND_API_URL}/price_predictions/predict?company_id=${value.id}`, {headers: authHeader()})
                                            .then((response) => response.json())
                                            .then((data) => {
                                                setPrediction(data.predicted);
                                            });
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticker">Ticker</label>
                            <Field name="ticker" type="text" className="form-control"/>
                            <ErrorMessage
                                name="ticker"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="current_price">Price</label>
                            { prediction && (
                                <div className="form-group">
                                    <label htmlFor="predicted_price">Predicted stock price: {prediction}$</label>
                                </div>
                            )}
                            <Field name="current_price" type="text" className="form-control"/>
                            <ErrorMessage
                                name="current_price"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="min_price">Minimum Price</label>
                            <Field name="min_price" type="text" className="form-control"/>
                            <ErrorMessage
                                name="min_price"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="max_price">Maximum Price</label>
                            <Field name="max_price" type="text" className="form-control"/>
                            <ErrorMessage
                                name="max_price"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Add stock</span>
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

                        <Button style={{margin: "24px 24px 0 0"}} variant="danger" onClick={handleCancel}>Cancel</Button>{' '}
                    </Form>
                </Formik>
            </Box>
        </Container>
    );
};
