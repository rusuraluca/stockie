import {Container, TextField, Autocomplete, Box} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Company} from "../../models/Company";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Stock} from "../../models/Stock";
import {debounce} from "lodash";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export const StocksUpdate = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { stockId } = useParams();
    const [stock, setStock] = useState<Stock>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/stocks/${stockId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setStock(data);
            });
        }, []);

    const [company, setCompany] = useState<number>();
    const [companies, setCompanies] = useState<Company[]>([]);

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

    const handleUpdate = (formValue: { ticker: string; current_price: number; min_price: number; max_price: number; }) => {
        if (currentUserRole === "admin"
            || currentUserRole === "moderator"
            || (currentUserRole === "regular" && currentUserId == stock?.user_id)) {
            const {ticker, current_price, min_price, max_price} = formValue;

            setMessage("");
            setLoading(true);

            const updatedStock = {
                ticker: ticker,
                current_price: current_price,
                min_price: min_price,
                max_price: max_price,
                company_id: company,
                user_id: currentUserId,
            };

            axios.put(`${BACKEND_API_URL}/stocks/${stockId}`, updatedStock, {headers: authHeader()}).then(
                () => {
                    navigate(`/stocks/${stockId}/details`);
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
            <h1 style={{margin: "24px 0"}}>Update stock:</h1>
            <Box>
                {stock && (
                    <Formik
                        initialValues={{
                            ticker: stock.ticker,
                            current_price: stock.current_price,
                            min_price: stock.min_price,
                            max_price: stock.max_price,
                        }}
                        validationSchema={(currentUserRole === "regular" && currentUserId == stock?.user_id) || currentUserRole === "admin" || currentUserRole === "moderator" ? validationSchema : Yup.object()}
                        onSubmit={handleUpdate}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <Autocomplete
                                    id="company_id"
                                    autoComplete={true}
                                    options={companies}
                                    getOptionLabel={(option) => `${option.name}`}
                                    renderInput={(params) =>
                                        <TextField {...params} variant="outlined" />
                                    }
                                    filterOptions={(x) => x}
                                    onInputChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                    defaultValue={companies[companies.length - 1]}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setCompany(value.id);
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
                                <label htmlFor="current_price">Current Price</label>
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
                                    <span>Update stock</span>
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
                                    <Modal.Body>You must be an <b>authenticated moderator or admin</b> to perform this
                                        operation!</Modal.Body>
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
