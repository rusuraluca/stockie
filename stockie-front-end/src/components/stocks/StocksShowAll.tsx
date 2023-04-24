import {
    CircularProgress,
    Container,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "../pagination/Pagination";
import {Button, Table} from "react-bootstrap";
import {Stock} from "../../models/Stock";


export const StocksShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/stocks/page/${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setStocks(data.stocks);
                setTotalInstances(data.totalStocks);
                setLoading(false);
                setCurrentPage(currentPage);
            });
    }, [currentPage]);

    const handleSortByName = () => {
        const sortedStocks = [...stocks].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.ticker.localeCompare(b.ticker);
            } else {
                return b.ticker.localeCompare(a.ticker);
            }
        });
        setStocks(sortedStocks);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All stocks</h1>
            {loading && <CircularProgress />}
            {!loading && stocks?.length === 0 && <p>No stocks found</p>}
            {!loading && stocks?.length > 0 && (
                <div>
                    <Button style={{margin: "24px 0"}} variant="primary" href={`/stocks/add`}>Add a new stock</Button>{' '}
                    <Button style={{margin: "24px 0"}} variant="secondary" onClick={handleSortByName}>
                        Sort by ticker
                    </Button>{' '}
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th align="left">Ticker</th>
                            <th align="left">Current Price</th>
                            <th align="left">Company</th>
                            <th align="left">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stocks.map((stock, index) => (
                            <tr key={stock.id}>
                                <td align="left">{stock.ticker}</td>
                                <td align="left">{stock.current_price}</td>
                                <td align="left">
                                    {stock.company? stock.company.name : "None"}
                                </td>
                                <td align="left">
                                    <Button style={{margin: "5px 0px"}} variant="dark" href={`/stocks/${stock.id}/details`}><ReadMoreIcon style={{color:"white"}} />View stock details</Button>{' '}
                                    <Button style={{margin: "5px 0px"}} variant="success" href={`/stocks/${stock.id}/edit`}><EditIcon style={{color:"white"}} />Edit stock details</Button>{' '}
                                    <Button style={{margin: "5px 0px"}} variant="danger" href={`/stocks/${stock.id}/delete`}><DeleteForeverIcon style={{color:"white"}} />Delete stock</Button>{' '}
                                </td>
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
