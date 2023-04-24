import Table from 'react-bootstrap/Table';
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../constants";
import { StocksCountPortfolios } from "../models/StocksCountPortfolios";
import { CircularProgress, Container } from "@mui/material";
import Pagination from './pagination/Pagination';

export const PortfoliosStocksCount = () => {
    const [loading, setLoading] = useState(false);
    const [portfolios, setPortfolios] = useState<StocksCountPortfolios[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/count_stocks_portfolios/page/${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setPortfolios(data.raport);
                setTotalInstances(data.total);
                setLoading(false);
                setCurrentPage(currentPage);
            });
    }, [currentPage]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All portfolios and their stocks count</h1>
            {loading && <CircularProgress />}
            {!loading && portfolios?.length === 0 && <p>No portfolios found</p>}
            {!loading && portfolios?.length > 0 && (
                <div>
                    <Table striped bordered hover responsive>
                        <thead>
                                <tr>
                                    <th>Portfolio Name</th>
                                    <th>Stocks Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolios.map((portfolio) => (
                                    <tr key={portfolio.portfolio_id}>
                                        <td>
                                            {portfolio.portfolio_name}
                                        </td>
                                        <td>{portfolio.stock_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        total={totalInstances}
                        limit={25}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </Container>
    );
};
