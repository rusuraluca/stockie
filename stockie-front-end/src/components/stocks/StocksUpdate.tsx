import {Container, CardContent, TextField, Autocomplete} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";
import { Company } from "../../models/Company";
import React from "react";
import {Button} from "react-bootstrap";
import {Stock} from "../../models/Stock";
import {debounce} from "lodash";

export const StocksUpdate = () => {
    const { stockId } = useParams();
    const navigate = useNavigate();

    const [stock, setStock] = useState<Stock>({
        ticker: "",
        current_price: 0,
        min_price: 0,
        max_price: 0,
        company_id: -1,
    });

    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        const fetchStock = async () => {
            const response = await fetch(`${BACKEND_API_URL}/stocks/${stockId}`);
            const data = await response.json();
            setStock(data);
        };
        fetchStock();
    }, [stockId]);

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/stocks/${stockId}`, stock);
            navigate(`/stocks/${stockId}/details`);
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
        setStock((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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

    const handleInputChange = (event: any, value: any, reason: any) => {
        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Update stock:</h1>
            <CardContent>
                <form onSubmit={handleUpdate}>
                    <Autocomplete
                        id="company_id"
                        autoComplete={true}
                        options={companies}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) =>
                            <TextField {...params} label="Company" variant="outlined" />
                        }
                        filterOptions={(x) => x}
                        onInputChange={handleInputChange}
                        sx={{ mb: 2 }}
                        defaultValue={companies[companies.length - 1]}
                        onChange={(event, value) => {
                            if (value) {
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
                        value={stock?.ticker}
                        onChange={handleFieldChange}
                    />
                    <TextField
                        id="current-price"
                        label="Current Price"
                        variant="outlined"
                        fullWidth
                        value={stock?.current_price}
                        sx={{ mb: 2 }}
                        onChange={handleFieldChange}
                    />
                    <TextField
                        id="min-price"
                        label="Min Price"
                        variant="outlined"
                        fullWidth
                        value={stock?.min_price}
                        sx={{ mb: 2 }}
                        onChange={handleFieldChange}
                    />
                    <TextField
                        id="max-price"
                        label="Max Price"
                        variant="outlined"
                        fullWidth
                        value={stock?.max_price}
                        sx={{ mb: 2 }}
                        onChange={handleFieldChange}
                    />
                    <Button type="submit"  style={{ margin:"24px 24px 0 0" }} variant="primary">Update Stock</Button>
                    <Button onClick={handleCancel} style={{ margin:"24px 24px 0 0" }} href={`/stocks`} variant="danger">Cancel</Button>

                </form>
            </CardContent>
        </Container>
    );
};
