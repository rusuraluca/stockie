import {Container, TextField, Typography, Box} from "@mui/material";
import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {User, UserError, TouchedFields} from "../../models/User";
import React from "react";
import { Button } from "react-bootstrap";

export const UserAddd = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        birthday: "",
    });

    const [userError, setUserError] = useState<UserError>({
        generic: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const [touchedFields, setTouchedFields] = useState<TouchedFields>({
        first_name: false,
        last_name: false,
        email: false,
        password: false,
    });

    const validateUserData = () => {
        setUserError((prevError) => ({
            ...prevError,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        }));

        if (user.first_name === "") {
            setUserError((prevError) => ({
                ...prevError,
                first_name: "First name is required",
            }));
        }
        if (user.last_name === "") {
            setUserError((prevError) => ({
                ...prevError,
                last_name: "Last name is required",
            }));
        };
        if (user.email === "") {
            setUserError((prevError) => ({
                ...prevError,
                email: "Email is required",
            }));
        }
        if (user.password === "") {
            setUserError((prevError) => ({
                ...prevError,
                password: "Password is required",
            }));
        };

    }

    useEffect(() => {
        validateUserData();
    }, [user]);

    const addUser = async () => {
        setTouchedFields((prevTouched) => ({
            ...prevTouched,
            first_name: true,
            last_name: true,
            email: true,
            password: true,
        }));

        validateUserData();

        if (userError.first_name !== "" || userError.last_name !== "" || userError.email !== "" || userError.password !== "") return;

        const addedUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            address: user.address,
            birthday: user.birthday,
        };

        try {
            const response = await axios.post(`${BACKEND_API_URL}/users/`, addedUser);
            if (response.status === 201) {
                navigate("/users");
                return;
            }
            setUserError((prevError) => ({
                ...prevError,
                generic: "Something went wrong! Make sure you filled all the fields correctly.",
            }));
        } catch (error: any) {
            if (error.response.data) {
                if (error.response.data.first_name) {
                    setUserError((prevError) => ({
                        ...prevError,
                        first_name: error.response.data.first_name,
                    }));
                    setUser((prevUser) => ({...prevUser, first_name: ""}));
                }
                if (error.response.data.last_name) {
                    setUserError((prevError) => ({
                        ...prevError,
                        last_name: error.response.data.last_name,
                    }));
                    setUser((prevUser) => ({...prevUser, last_name: ""}));
                }
                if (error.response.data.email) {
                    setUserError((prevError) => ({
                        ...prevError,
                        email: error.response.data.email,
                    }));
                    setUser((prevUser) => ({...prevUser, email: ""}));
                }
                if (error.response.data.password) {
                    setUserError((prevError) => ({
                        ...prevError,
                        password: error.response.data.password,
                    }));
                    setUser((prevUser) => ({...prevUser, password: ""}));
                }
            } else {
                setUserError((prevError) => ({
                    ...prevError,
                    generic: "Something went wrong! Make sure you filled all the fields correctly.",
                }));
            }
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/users");
    };

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>Add a new user:</h1>
            {userError.generic && (
                <Typography variant="body2" sx={{ color: "#e64545", mb: 4}}>
                    {userError.generic}
                </Typography>
            )}
            <Box>
                <TextField
                    id="first_name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setUser((prevUser) => ({ ...prevUser, first_name: event.target.value }))}
                    error={!!userError.first_name && !!touchedFields.first_name}
                    helperText={userError.first_name}
                    onBlur={(event) =>
                        setTouchedFields((prevTouched) => ({
                            ...prevTouched,
                            first_name: true,
                        }))
                    }
                />
                <TextField
                    id="last_name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setUser((prevUser) => ({ ...prevUser, last_name: event.target.value }))}
                    error={!!userError.last_name && !!touchedFields.last_name}
                    helperText={userError.last_name}
                    onBlur={(event) =>
                        setTouchedFields((prevTouched) => ({
                            ...prevTouched,
                            last_name: true,
                        }))
                    }
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setUser((prevUser) => ({ ...prevUser, email: event.target.value }))}
                    error={!!userError.email && !!touchedFields.email}
                    helperText={userError.email}
                    onBlur={(event) =>
                        setTouchedFields((prevTouched) => ({
                            ...prevTouched,
                            email: true,
                        }))
                    }
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setUser((prevUser) => ({ ...prevUser, password: event.target.value }))}
                    error={!!userError.password && !!touchedFields.password}
                    helperText={userError.password}
                    onBlur={(event) =>
                        setTouchedFields((prevTouched) => ({
                            ...prevTouched,
                            password: true,
                        }))
                    }
                />
                <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setUser((prevUser) => ({ ...prevUser, address: event.target.value }))}
                />
                <TextField
                    id="birthday"
                    label="Birthday"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setUser((prevUser) => ({ ...prevUser, birthday: event.target.value }))}
                />
                <Button style={{ margin:"24px 24px 0 0" }} variant="primary" onClick={() => addUser()}>Add User</Button>{' '}
                <Button style={{ margin:"24px 24px 0 0" }} variant="danger"  onClick={handleCancel}>Cancel</Button>{' '}
            </Box>
        </Container>
    );
};
