import {
    Container,
    CardContent,
    TextField,
    Autocomplete,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import {Stock} from "../../models/Stock";
import { debounce } from "lodash";
import {User} from "../../models/User";
import {Portfolio} from "../../models/Portfolio";

export const PortfolioUpdate = () => {
    const { portfolioId } = useParams();
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Portfolio>({
        name: "",
        industry: "",
        public: true,
        active: true,
        user_id: -1,
    });

    useEffect(() => {
        const fetchPortfolio = async () => {
            const response = await fetch(`${BACKEND_API_URL}/portfolios/${portfolioId}`);
            const data = await response.json();
            setPortfolio(data.portfolio);
        };
        fetchPortfolio();
    }, [portfolioId]);

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/portfolios/${portfolioId}`, portfolio);
            navigate(`/portfolios/${portfolioId}/details`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/stocks");
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPortfolio((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [users, setUsers] = useState<User[]>([]);
    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<User[]>(
                `${BACKEND_API_URL}/users/autocomplete?query=${query}`
            );
            const data = await response.data;
            setUsers(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const [stocks, setStocks] = useState<Stock[]>([]);
    const fetchStockSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Stock[]>(
                `${BACKEND_API_URL}/stocks/autocomplete?query=${query}`
            );
            const data = await response.data;
            setStocks(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 250), []);
    const debouncedFetchStockSuggestions = useCallback(debounce(fetchStockSuggestions, 250), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
            debouncedFetchStockSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions, debouncedFetchStockSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        if (reason === "input") {
            debouncedFetchSuggestions(value);
            debouncedFetchStockSuggestions(value);
        }
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Update portfolio:</h1>
            <CardContent>
                <form onSubmit={handleUpdate}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={portfolio?.name}
                        onChange={handleFieldChange}
                    />
                    <TextField
                        id="industry"
                        label="Industry"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={portfolio?.industry}
                        onChange={handleFieldChange}
                    />
                    <FormLabel id="demo-radio-buttons-group-label">Public?</FormLabel>
                    <RadioGroup
                        row aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        defaultValue={portfolio?.public}
                        onChange={(event) => setPortfolio({ ...portfolio, public: event.target.value === "true" })}>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                    <FormLabel id="demo-radio-buttons-group-label">Active?</FormLabel>
                    <RadioGroup
                        row aria-labelledby="demo-radio-buttons-group-label1"
                        name="radio-buttons-group1"
                        defaultValue={portfolio?.active}
                        onChange={(event) => setPortfolio({ ...portfolio, public: event.target.value === "true" })}>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                    <Autocomplete
                        id="user_id"
                        options={users}
                        defaultValue={portfolio.user}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name} ${option.email}`}
                        renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
                        filterOptions={(x) => x}
                        onInputChange={handleInputChange}
                        sx={{ mb: 2 }}
                        onChange={(event, value) => {
                            if (value) {
                                setPortfolio({ ...portfolio, user_id: value.id });
                            }
                        }}
                    />
                    <Autocomplete
                        multiple
                        id="stocks"
                        options={stocks}
                        getOptionLabel={(option) => `${option.ticker} ${option.current_price}`}
                        renderInput={(params) => <TextField {...params} label="Stocks" variant="outlined" />}
                        filterOptions={(x) => x}
                        onInputChange={handleInputChange}
                        sx={{ mb: 2 }}
                        onChange={(event, values) => {
                            // Create an array to store the stock IDs
                            const stocksList: number[] = [];

                            // Loop through the selected values and push their IDs to the array
                            values.forEach(value => {
                                if (value.id !== undefined) {
                                    stocksList.push(value.id);
                                }
                            });

                            // Update the portfolio state with the new stock IDs
                            setPortfolio({ ...portfolio, stocks: stocksList });
                        }}
                    />
                    <Button type="submit" style={{ margin:"24px 24px 0 0" }} variant="primary">Update Portfolio</Button>{' '}
                    <Button onClick={handleCancel} style={{ margin:"24px 24px 0 0" }} variant="danger">Cancel</Button>{' '}
                </form>
            </CardContent>
        </Container>
    );
};
