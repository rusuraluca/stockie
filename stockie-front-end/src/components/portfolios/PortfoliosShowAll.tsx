import {CircularProgress, Container, Link} from "@mui/material";
import React from "react";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "../pagination/Pagination";
import {Button, Table} from "react-bootstrap";
import {Portfolio} from "../../models/Portfolio";
import authHeader from "../../services/auth-header";


export const PortfoliosShowAll = () => {
    const [loading, setLoading] = useState(false);

    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [totalInstances, setTotalInstances] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/portfolios/page/${currentPage}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setPortfolios(data.portfolios);
                setTotalInstances(data.totalPortfolios);
                setCurrentPage(currentPage);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All portfolios</h1>
            <div>
                <Button style={{margin: "24px 0"}} variant="primary" href={`/portfolios/add`}>Add a new portfolio</Button>
            </div>
            {loading && <CircularProgress/>}
            {!loading && portfolios?.length === 0 && <p>No portfolios found</p>}
            {!loading && portfolios?.length > 0 && (
                <div>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th align="left">Portfolio</th>
                            <th align="left">Stocks count</th>
                            <th align="left">User</th>
                            <th align="left">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {portfolios.map((portfolio) => (
                            <tr key={portfolio.id}>
                                <td align="left">{portfolio.name}</td>
                                <td align="left">{portfolio.stocks?.length}</td>
                                <td align="left">
                                    <Link href={`/users/${portfolio.user?.id}/details`}>
                                        {portfolio.user?.username}
                                    </Link>
                                </td>
                                <td align="left">
                                    <Button className="btn" style={{margin: "5px 5px 5px 5px"}} variant="dark" href={`/portfolios/${portfolio.id}/details`}>
                                        <ReadMoreIcon style={{color: "white"}}/>
                                        View portfolio details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="success" href={`/portfolios/${portfolio.id}/edit`}>
                                        <EditIcon style={{color: "white"}}/>
                                        Edit portfolio details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="danger" href={`/portfolios/${portfolio.id}/delete`}>
                                        <DeleteForeverIcon style={{color: "white"}}/>
                                        Delete portfolio
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
