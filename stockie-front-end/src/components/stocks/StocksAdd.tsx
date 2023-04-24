import {Container, CardContent, TextField, Autocomplete} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import {Stock} from "../../models/Stock";
import {Company} from "../../models/Company";
import { debounce } from "lodash";

export const StocksAdd = () => {
    const navigate = useNavigate();

    const [stock, setStock] = useState<Stock>({
        ticker: "",
        current_price: 0,
        min_price: 0,
        max_price: 0,
        company_id: -1,
    });

    const [companies, setCompanies] = useState<Company[]>([]);

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Company[]>(
                `${BACKEND_API_URL}/companies/autocomplete?query=${query}`
            );
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

    const addStock = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/stocks/`, stock);
            navigate("/stocks");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event: any, value: any, reason: any) => {
        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Add a new stock:</h1>
            <CardContent>
                    <form onSubmit={addStock}>
                        <Autocomplete
                            id="company_id"
                            options={companies}
                            getOptionLabel={(option) => `${option.name}`}
                            renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            sx={{ mb: 2 }}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setStock({ ...stock, company_id: value.id });
                                }
                            }}
                        />
                        <TextField
                            id="ticker"
                            label="Ticker"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setStock({ ...stock, ticker: event.target.value })}
                        />
                        <TextField
                            id="current-price"
                            label="Current Price"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setStock({ ...stock, current_price: Number(event.target.value) })}
                        />
                        <TextField
                            id="min-price"
                            label="Min Price"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setStock({ ...stock, min_price: Number(event.target.value) })}
                        />
                        <TextField
                            id="max-price"
                            label="Max Price"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setStock({ ...stock, max_price: Number(event.target.value) })}
                        />
                        <Button type="submit" style={{ margin:"24px 24px 0 0" }} variant="primary">Add Stock</Button>{' '}
                        <Button style={{ margin:"24px 24px 0 0" }} href={`/stocks`} variant="danger">Cancel</Button>{' '}
                    </form>
            </CardContent>
        </Container>
    );
};
