import { Container, CardContent } from "@mui/material";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import React from "react";

export const PortfolioDelete = () => {
    const { portfolioId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${BACKEND_API_URL}/portfolios/${portfolioId}`);
        navigate("/portfolios");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/portfolios");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Delete portfolio:</h1>
            <CardContent>
                <p><b>Are you sure you want to delete this portfolio? This cannot be undone!</b></p>
                <Button style={{ margin:"24px 24px 0 0" }} variant="danger" onClick={handleDelete}>Delete portfolio</Button>{' '}
                <Button style={{ margin:"24px 24px 0 0" }} onClick={handleCancel} variant="primary">Cancel</Button>{' '}
            </CardContent>
        </Container>
    );
};
