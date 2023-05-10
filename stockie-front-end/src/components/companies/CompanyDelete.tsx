import {Box, Container} from "@mui/material";
import {Button, Modal} from "react-bootstrap";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import React, {useEffect, useState} from "react";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import {Company} from "../../models/Company";

export const CompanyDelete = () => {
    let navigate: NavigateFunction = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {companyId} = useParams();
    const [company, setCompany] = useState<Company>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());
    const [currentUserId] = useState<string | undefined>(AuthService.getCurrentUserId());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/companies/${companyId}`, {headers: authHeader()})
            .then((response) => response.json())
            .then((data) => {
                setCompany(data);
            });
    }, []);

    const handleDelete = () => {
        if (currentUserRole === "admin"
            || currentUserRole === "moderator"
            || (currentUserRole === "regular" && currentUserId == company?.user_id)) {
            axios.delete(`${BACKEND_API_URL}/companies/${companyId}`, {headers: authHeader()})
                .then(
                () => {
                    navigate("/companies");
                    return;
                });
        } else {
            handleShow()
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/companies");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Delete company:</h1>
            <Box>
                {show && (
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You must be an <b>authenticated admin/moderator</b> to perform this
                            operation!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Understood
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
                <Button style={{margin: "24px 24px 0 0"}} variant="danger" onClick={handleDelete}>Delete company</Button>
                <Button style={{margin: "24px 24px 0 0"}} variant="primary" onClick={handleCancel}>Cancel</Button>
            </Box>
        </Container>
    );
};
