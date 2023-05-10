import {CircularProgress, Container, Link} from "@mui/material";
import React from "react";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "../pagination/Pagination";
import {Button, Table} from "react-bootstrap";
import {Stock} from "../../models/Stock";
import authHeader from "../../services/auth-header";


export const StocksShowAll = () => {
    const [loading, setLoading] = useState(false);

    const [stocks, setStocks] = useState<Stock[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/stocks/page/${currentPage}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setStocks(data.stocks);
                setTotalInstances(data.totalStocks);
                setLoading(false);
                setCurrentPage(currentPage);
            });
    }, [currentPage]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All stocks</h1>
            <div>
                <Button style={{margin: "24px 0"}} variant="primary" href={`/stocks/add`}>Add a new stock</Button>
            </div>
            {loading && <CircularProgress/>}
            {!loading && stocks?.length === 0 && <p>No stocks found</p>}
            {!loading && stocks?.length > 0 && (
                <div>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th align="left">Ticker</th>
                            <th align="left">Company</th>
                            <th align="left">User</th>
                            <th align="left">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stocks.map((stock, index) => (
                            <tr key={stock.id}>
                                <td align="left">{stock.ticker}</td>
                                <td align="left">
                                    {stock.company ? stock.company.name : "None"}
                                </td>
                                <Link href={`/users/${stock.user?.id}/details`}>
                                    <td align="left">{stock.user?.username}</td>
                                </Link>
                                <td align="left">
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="dark" href={`/stocks/${stock.id}/details`}>
                                        <ReadMoreIcon style={{color: "white"}}/>
                                        View stock details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="success" href={`/stocks/${stock.id}/edit`}>
                                        <EditIcon style={{color: "white"}}/>
                                        Edit stock details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="danger" href={`/stocks/${stock.id}/delete`}>
                                        <DeleteForeverIcon style={{color: "white"}}/>
                                        Delete stock
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        total={totalInstances}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </Container>
    );
};
