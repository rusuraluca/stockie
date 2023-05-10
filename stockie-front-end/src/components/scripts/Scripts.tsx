import {CardContent, Container} from "@mui/material";
import React from "react";
import {Button} from "react-bootstrap";
import {AddAlarm, AddBox} from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {BACKEND_API_URL} from "../../constants";
import authHeader from "../../services/auth-header";

export const Scripts = () => {
    const handleUserDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/delete_data/users`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleUserAdd = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/generate_data/users`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleCompanyDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/delete_data/companies`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleCompanyAdd = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/generate_data/companies`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleStockDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/delete_data/stocks`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleStockAdd = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/generate_data/stocks`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handlePortfolioDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/delete_data/portfolios`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handlePortfolioAdd = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        fetch(`${BACKEND_API_URL}/generate_data/portfolios`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <Container>
            <div>
                <h1 style={{margin: "24px 0"}}>Control users:</h1>
                <Button style={{margin: "10px 10px 0 0px"}} variant="danger" onClick={handleUserDelete}>
                    <DeleteForeverIcon style={{color:"white"}} />
                    Bulk delete users
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="success" onClick={handleUserAdd}>
                    <AddBox style={{color:"white"}} />
                    Bulk add users
                </Button>
            </div>
            <div>
                <h1 style={{margin: "24px 0"}}>Control companies:</h1>
                <Button style={{margin: "10px 10px 0 0px"}} variant="danger" onClick={handleCompanyDelete}>
                    <DeleteForeverIcon style={{color:"white"}} />
                    Bulk delete companies
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="success" onClick={handleCompanyAdd}>
                    <AddBox style={{color:"white"}} />
                    Bulk add companies
                </Button>
            </div>
            <div>
                <h1 style={{margin: "24px 0"}}>Control stocks:</h1>
                <Button style={{margin: "10px 10px 0 0px"}} variant="danger" onClick={handleStockDelete}>
                    <DeleteForeverIcon style={{color:"white"}} />
                    Bulk delete stocks
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="success" onClick={handleStockAdd}>
                    <AddBox style={{color:"white"}} />
                    Bulk add stocks
                </Button>
            </div>
            <div>
                <h1 style={{margin: "24px 0"}}>Control portfolios:</h1>
                <Button style={{margin: "10px 10px 0 0px"}} variant="danger" onClick={handlePortfolioDelete}>
                    <DeleteForeverIcon style={{color:"white"}} />
                    Bulk delete portfolios
                </Button>
                <Button style={{margin: "10px 10px 0 0px"}} variant="success" onClick={handlePortfolioAdd}>
                    <AddBox style={{color:"white"}} />
                    Bulk add portfolios
                </Button>
            </div>
        </Container>
    );
};
