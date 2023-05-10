import {CircularProgress, Container} from "@mui/material";
import React from "react";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Company} from "../../models/Company";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "../pagination/Pagination";
import {Button, Table} from "react-bootstrap";
import authHeader from "../../services/auth-header";

export const CompanyShowAll = () => {
    const [loading, setLoading] = useState(false);

    const [companies, setCompanies] = useState<Company[]>([]);
    const [totalInstances, setTotalInstances] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/companies/page/${currentPage}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setCompanies(data.companies);
                setTotalInstances(data.totalCompanies);
                setCurrentPage(currentPage);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>All companies</h1>
            <div>
                <Button style={{margin: "24px 0"}} variant="primary" href={`/companies/add`}>Add a new company</Button>
            </div>
            {loading && <CircularProgress/>}
            {!loading && companies?.length === 0 && <p>No companies found</p>}
            {!loading && companies?.length > 0 && (
                <div>
                    <Table bordered hover responsive>
                        <thead>
                        <tr>
                            <th align="left">Company</th>
                            <th align="left">Stock</th>
                            <th align="left">User</th>
                            <th align="left">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {companies.map((company, index) => (
                            <tr key={company.id}>
                                <td align="left">{company.name}</td>
                                <td align="left">{company.stock ? company.stock.ticker : "None"}</td>
                                <td align="left"><a href={`/users/${company.user?.id}/details`}>{company.user?.username}</a></td>
                                <td align="left">
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="dark" href={`/companies/${company.id}/details`}>
                                        <ReadMoreIcon style={{color: "white"}}/>
                                        View company details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="success" href={`/companies/${company.id}/edit`}>
                                        <EditIcon style={{color: "white"}}/>
                                        Edit company details
                                    </Button>
                                    <Button style={{margin: "5px 5px 5px 5px"}} variant="danger" href={`/companies/${company.id}/delete`}>
                                        <DeleteForeverIcon style={{color: "white"}}/>
                                        Delete company
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
