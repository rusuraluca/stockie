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


export const StocksDetails = () => {
    const { stockId } = useParams();
    const [stock, setStock] = useState<Stock>();
    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/stocks/${stockId}`)
            .then((response) => response.json())
            .then((data) => {
                setStock(data);
            });
        fetch(`${BACKEND_API_URL}/stocks/${stockId}/companies`)
            .then((response) => response.json())
            .then((data) => {
                setCompany(data);
            });
    }, [stockId]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>About the stock:</h1>
            <CardContent>
                <p><b>Stock Ticker:</b> {stock?.ticker}</p>
                <p><b>Stock Current Price:</b> {stock?.current_price}</p>
                <p><b>Stock Min Price:</b> {stock?.min_price}</p>
                <p><b>Stock Max Price:</b> {stock?.max_price}</p>

                <p><b>Stock Company:</b></p>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Country</th>
                        <th>Industry</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={company?.id}>
                        <td align="left">{company?.name}</td>
                        <td align="left">{company?.size}</td>
                        <td align="left">{company?.country}</td>
                        <td align="left">{company?.industry}</td>
                    </tr>
                    </tbody>
                </Table>
                <Button style={{margin: "5px 0px"}} variant="dark" href={`/stocks`}><ArrowBackIcon style={{color:"white"}} />Go Back</Button>{' '}
                <Button style={{margin: "5px 0px"}} variant="success" href={`/stocks/${stockId}/edit`}><EditIcon style={{color:"white"}} />Edit stock details</Button>{' '}
                <Button style={{margin: "5px 0px"}} variant="danger" href={`/stocks/${stockId}/delete`}><DeleteForeverIcon style={{color:"white"}} />Delete stock</Button>{' '}
            </CardContent>
        </Container>
    );
};
