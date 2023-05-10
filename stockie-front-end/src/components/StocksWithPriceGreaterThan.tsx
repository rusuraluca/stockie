import React, { useEffect, useState } from 'react';
import { BACKEND_API_URL } from "../constants";
import { Stock } from "../models/Stock";
import Pagination from "./pagination/Pagination";
import {CircularProgress, Container} from "@mui/material";
import Table from "react-bootstrap/Table";
import authHeader from "../services/auth-header";

export const StocksWithPriceGreaterThan = () => {
    const [loading, setLoading] = useState(false);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);
    const [inputValue, setInputValue] = useState<number>();

    useEffect(() => {
        fetchStocks();
    }, [currentPage, inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        setInputValue(inputValue);
    };

    const fetchStocks = () => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/stocks?price=${inputValue}&page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setStocks(data.stocks);
                setTotalInstances(data.totalStocks);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        fetchStocks();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All stocks greater than:</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" defaultValue={inputValue} onChange={handleInputChange} />
            </form>
            {loading && <CircularProgress />}
            {!loading && stocks?.length === 0 && <p>No stocks found</p>}
            {!loading && stocks?.length > 0 && (
                <div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Stock Ticker</th>
                                <th>Current Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {stocks?.map((stock) => (
                            <tr key={stock.id}>
                                <td>
                                    {stock.ticker}
                                </td>
                                <td>{stock.current_price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination
                    currentPage={currentPage}
                    total={totalInstances}
                    limit={25}
                    onPageChange={handlePageChange}
                    />
                </div>
            )}
        </Container>
    );
};
