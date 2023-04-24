import { Container, CardContent, TextField } from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";
import { User } from "../../models/User";
import React from "react";
import {Button} from "react-bootstrap";

export const UserUpdate = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        birthday: ""
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
            navigate(`/users/${userId}/details`);
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
            <h1 style={{margin: "24px 0"}}>Update user:</h1>
                <CardContent>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            value={user?.first_name}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            variant="outlined"
                            value={user?.last_name}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={user?.email}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            value={user?.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="address"
                            name="address"
                            label="Address"
                            variant="outlined"
                            value={user?.address}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <TextField
                            id="birthday"
                            name="birthday"
                            label="Birthday"
                            variant="outlined"
                            value={user?.birthday}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleFieldChange}
                        />
                        <Button type="submit"  style={{ margin:"24px 24px 0 0" }} variant="primary">Update user</Button>
                        <Button onClick={handleCancel} style={{ margin:"24px 24px 0 0" }} href={`/users`} variant="danger">Cancel</Button>

                    </form>
                </CardContent>
        </Container>
    );
};
