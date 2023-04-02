import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../constants";
import {StocksCountPortfolios} from "../models/StocksCountPortfolios";

export const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [portfolios, setPortfolios] = useState<StocksCountPortfolios[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/count_stocks_portfolios`)
            .then((response) => response.json())
            .then((data) => {
                setPortfolios(data);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1>All portfolios and their stocks count</h1>

            {loading && <CircularProgress />}
            {!loading && portfolios.length === 0 && <p>No portfolios found</p>}
            {!loading && portfolios.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Portfolio Id</TableCell>
                                <TableCell>Stocks Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {portfolios.map((portfolio, index) => (
                                <TableRow key={portfolio.portfolio_id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{portfolio.stock_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};
