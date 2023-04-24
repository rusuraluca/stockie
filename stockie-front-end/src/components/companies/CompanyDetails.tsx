import { Container, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Company } from "../../models/Company";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {Button, Table} from "react-bootstrap";
import {Stock} from "../../models/Stock";


export const CompanyDetails = () => {
    const { companyId } = useParams();
    const [company, setCompany] = useState<Company>();
    const [stocks, setStocks] = useState<Stock>();


    useEffect(() => {
        fetch(`${BACKEND_API_URL}/companies/${companyId}`)
            .then((response) => response.json())
            .then((data) => {
                setCompany(data);
            });
        fetch(`${BACKEND_API_URL}/companies/${companyId}/stocks`)
            .then((response) => response.json())
            .then((data) => {
                setStocks(data);
            });
    }, [companyId]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>About the company:</h1>
            <CardContent>
                <p><b>Company Name:</b> {company?.name}</p>
                <p><b>Company Size:</b> {company?.size}</p>
                <p><b>Company Country:</b> {company?.country}</p>
                <p><b>Company Industry:</b> {company?.industry}</p>

                <p><b>Company Stock:</b></p>
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
                     <tr key={stocks?.id}>
                         <td align="left">{stocks?.ticker}</td>
                         <td align="left">{stocks?.current_price}</td>
                         <td align="left">{stocks?.min_price}</td>
                         <td align="left">{stocks?.max_price}</td>
                     </tr>
                    </tbody>
                </Table>
                <Button style={{margin: "5px 0px"}} variant="dark" href={`/companies`}><ArrowBackIcon style={{color:"white"}} />Go Back</Button>{' '}
                <Button style={{margin: "5px 0px"}} variant="success" href={`/companies/${companyId}/edit`}><EditIcon style={{color:"white"}} />Edit company details</Button>{' '}
                <Button style={{margin: "5px 0px"}} variant="danger" href={`/companies/${companyId}/delete`}><DeleteForeverIcon style={{color:"white"}} />Delete company</Button>{' '}
            </CardContent>
        </Container>
    );
};
