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
import {Portfolio} from "../../models/Portfolio";


export const PortfoliosShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/portfolios/page/${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setPortfolios(data.portfolios);
                setTotalInstances(data.totalPortfolios);
                setLoading(false);
                setCurrentPage(currentPage);
            });
    }, [currentPage]);

    const handleSortByName = () => {
        const sortedPortfolios = [...portfolios].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setPortfolios(sortedPortfolios);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All portfolios</h1>
            {loading && <CircularProgress />}
            {!loading && portfolios?.length === 0 && <p>No portfolios found</p>}
            {!loading && portfolios?.length > 0 && (
                <div>
                    <Button style={{margin: "24px 0"}} variant="primary" href={`/portfolios/add`}>Add a new portfolio</Button>{' '}
                    <Button style={{margin: "24px 0"}} variant="secondary" onClick={handleSortByName}>
                        Sort by name
                    </Button>{' '}
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th align="left">Name</th>
                            <th align="left">User name</th>
                            <th align="left">Stock count</th>
                            <th align="left">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {portfolios.map((portfolio) => (
                            <tr key={portfolio.id}>
                                <td align="left">{portfolio.name}</td>
                                <td align="left">{portfolio.user?.first_name} {portfolio.user?.last_name}</td>
                                <td align="left">{portfolio.stocks?.length}</td>
                                <td align="left">
                                    <Button style={{margin: "5px 0px"}} variant="dark" href={`/portfolios/${portfolio.id}/details`}><ReadMoreIcon style={{color:"white"}} />View portfolio details</Button>{' '}
                                    <Button style={{margin: "5px 0px"}} variant="success" href={`/portfolios/${portfolio.id}/edit`}><EditIcon style={{color:"white"}} />Edit portfolio details</Button>{' '}
                                    <Button style={{margin: "5px 0px"}} variant="danger" href={`/portfolios/${portfolio.id}/delete`}><DeleteForeverIcon style={{color:"white"}} />Delete portfolio</Button>{' '}
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
