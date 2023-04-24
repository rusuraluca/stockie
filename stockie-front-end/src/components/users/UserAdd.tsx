import { Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {User} from "../../models/User";
import React from "react";
import { Button } from "react-bootstrap";

export const UserAdd = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        birthday: "",
    });

    const addUser = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/users/`, user);
            navigate("/users");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
        <h1 style={{margin: "24px 0"}}>Add a new user:</h1>
                <CardContent>

                    <form onSubmit={addUser}>
                        <TextField
                            id="first_name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setUser({ ...user, first_name: event.target.value })}
                        />
                        <TextField
                            id="last_name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setUser({ ...user, last_name: event.target.value })}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setUser({ ...user, email: event.target.value })}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                        />
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setUser({ ...user, address: event.target.value })}
                        />
                        <TextField
                            id="birthday"
                            label="Birthday"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setUser({ ...user, birthday: event.target.value })}
                        />
                        <Button type="submit" style={{ margin:"24px 24px 0 0" }} variant="primary">Add User</Button>{' '}
                        <Button style={{ margin:"24px 24px 0 0" }} href={`/users`} variant="danger">Cancel</Button>{' '}


                    </form>
                </CardContent>

        </Container>
    );
};
