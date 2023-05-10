import {
    Container, CardContent,
    TextField,
    Autocomplete,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio, Box
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Stock} from "../../models/Stock";
import {debounce} from "lodash";
import {User} from "../../models/User";
import {Portfolio} from "../../models/Portfolio";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export const PortfolioUpdate = () => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    const {portfolioId} = useParams();
    const [portfolio, setPortfolio] = useState<Portfolio>();
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [portfolioStocks, setPortfolioStocks] = useState<number[]>([]);
    const [active, setActive] = useState<boolean>(true);
    const [publicc, setPublicc] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/portfolios/${portfolioId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setPortfolio(data);
            });
    }, []);

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Stock[]>(
                `${BACKEND_API_URL}/stocks/autocomplete?query=${query}`, {headers: authHeader()}
            );
            const data = await response.data;
            setStocks(data);
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
        name: Yup.string()
            .typeError("The name of the portfolio must be a string!")
            .required("This field is required!"),
        industry: Yup.string()
            .typeError("The industry of the portfolio must be a string!")
            .required("This field is required!"),
    });

    const handleUpdate = (formValue: { name: string; industry: string; }) => {
        if (currentUserRole === "admin"
            || currentUserRole === "moderator"
            || (currentUserRole === "regular" && currentUserId == portfolio?.user_id)) {
            const {name, industry} = formValue;

            setMessage("");
            setLoading(true);

            const updatedPortfolio = {
                name: name,
                industry: industry,
                public: publicc,
                active: active,
                user_id: currentUserId,
                stocks: portfolioStocks,
            };

            axios.put(`${BACKEND_API_URL}/portfolios/${portfolioId}`, updatedPortfolio, {headers: authHeader()}).then(
                () => {
                    navigate(`/portfolios/${portfolioId}/details`);
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
        navigate("/portfolios");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Update a new portfolio:</h1>
            <Box>
                { portfolio && (
                <Formik
                    initialValues={{
                        name: portfolio?.name,
                        industry: portfolio?.industry,
                    }}
                    validationSchema={(currentUserRole === "regular" && currentUserId == portfolio?.user_id) || currentUserRole === "admin" || currentUserRole === "moderator" ? validationSchema : Yup.object()}
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
                            <label htmlFor="industry">Industry</label>
                            <Field name="industry" type="text" className="form-control"/>
                            <ErrorMessage
                                name="industry"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <FormLabel id="demo-radio-buttons-group-label">Public?</FormLabel>
                        <RadioGroup
                            row aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={portfolio.public}
                            name="radio-buttons-group"
                            onChange={(event) => setPublicc(event.target.value === "true")}>
                            <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
                            <FormControlLabel value="false" control={<Radio/>} label="No"/>
                        </RadioGroup>
                        <FormLabel id="demo-radio-buttons-group-label">Active?</FormLabel>
                        <RadioGroup
                            row aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={portfolio.active}
                            name="radio-buttons-group"
                            onChange={(event) => setActive(event.target.value === "true")}>
                            <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
                            <FormControlLabel value="false" control={<Radio/>} label="No"/>
                        </RadioGroup>
                        <Autocomplete
                            multiple
                            id="stocks"
                            options={stocks}
                            getOptionLabel={(option) => `${option.ticker} ${option.current_price}`}
                            renderInput={(params) => <TextField {...params} label="Stocks" variant="outlined"/>}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            sx={{mb: 2}}
                            onChange={(event, values) => {
                                const stocksList: number[] = [];
                                values.forEach(value => {
                                    if (value.id !== undefined) {
                                        stocksList.push(value.id);
                                    }
                                });
                                setPortfolioStocks(stocksList);
                            }}
                        />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Update portfolio</span>
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
                )}
            </Box>
        </Container>
    );
};
