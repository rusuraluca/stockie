import {Container, CardContent} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {Company} from "../../models/Company";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {Button, Table} from "react-bootstrap";
import authHeader from "../../services/auth-header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export const CompanyDetails = () => {
    const {companyId} = useParams();
    const [company, setCompany] = useState<Company>();
    const [prediction, setPrediction] = useState<0>();

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/companies/${companyId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setCompany(data);
            });
    }, []);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/growth_predictions/predict?company_id=${companyId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setPrediction(data.predicted);
            });
    }, []);


    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>About the company:</h1>
            <CardContent>
                <p><b>Name:</b> {company?.name} </p>
                <p><b>Growth prediction:</b> {prediction}%</p>
                <p><b>Added by: </b><a href={`/users/${company?.user?.id}/details`}>{company?.user?.username}</a></p>
                <p><b>Size:</b> {company?.size} </p>
                <p><b>Country:</b> {company?.country} </p>
                <p><b>Industry:</b> {company?.industry} </p>
                <p><b>Stock:</b></p>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Current Price</th>
                        <th>Min Price</th>
                        <th>Max Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={company?.stock?.id}>
                        <td align="left">{company?.stock?.ticker}</td>
                        <td align="left">{company?.stock?.current_price}</td>
                        <td align="left">{company?.stock?.min_price}</td>
                        <td align="left">{company?.stock?.max_price}</td>
                    </tr>
                    </tbody>
                </Table>
                <Button style={{margin: "10px 10px 0 0px"}} variant="dark" href={`/companies`}>
                    <ArrowBackIcon style={{color: "white"}}/>
                    Go Back
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="success" href={`/companies/${companyId}/edit`}>
                    <EditIcon style={{color: "white"}}/>
                    Edit company details
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="danger" href={`/companies/${companyId}/delete`}>
                    <DeleteForeverIcon style={{color: "white"}}/>
                    Delete company
                </Button>
            </CardContent>
        </Container>
    );
};
