import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {User} from "../../models/User";
import React from "react";

export const UserUpdate = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        birthday: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${BACKEND_API_URL}/users/${userId}`);
            const user = await response.json();
            setUser(user);
        };
        fetchUser();
    }, [userId]);

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/users/${userId}`, user);
            navigate("/users");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/users");
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/users`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={handleUpdate}>
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            defaultValue={user.first_name}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            variant="outlined"
                            defaultValue={user.last_name}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            defaultValue={user.email}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            defaultValue={user.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="address"
                            name="address"
                            label="Address"
                            variant="outlined"
                            defaultValue={user.address}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="birthday"
                            name="birthday"
                            label="Birthday"
                            variant="outlined"
                            defaultValue={user.birthday}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <Button type="submit">Update user</Button>
                    </form>
                </CardContent>
                <CardActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};
