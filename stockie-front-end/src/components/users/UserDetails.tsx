import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { User } from "../../models/User";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

export const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchUser = async () => {
            // TODO: use axios instead of fetch
            // TODO: handle errors
            // TODO: handle loading state
            const response = await fetch(`${BACKEND_API_URL}/users/${userId}`);
            const user = await response.json();
            setUser(user);
        };
        fetchUser();
    }, [userId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/users`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>User Details</h1>
                    <p>User First Name: {user?.first_name}</p>
                    <p>User Last Name: {user?.last_name}</p>
                    <p>User Email: {user?.email}</p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/user/${userId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/user/${userId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
