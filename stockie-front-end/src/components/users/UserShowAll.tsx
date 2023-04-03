import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { User } from "../../models/User";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


export const UserShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/users`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });
    }, []);

    const handleSortByFirstName = () => {
        const sortedUsers = [...users].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.first_name.localeCompare(b.first_name);
            } else {
                return b.first_name.localeCompare(a.first_name);
            }
        });

        setUsers(sortedUsers);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <Container>
            <h1>All users</h1>

            {loading && <CircularProgress />}
            {!loading && users.length === 0 && <p>No users found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/users/add`}>
                    <Tooltip title="Add a new user" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && users.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell align="right">
                                    First Name
                                    <IconButton onClick={handleSortByFirstName}>
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Addres</TableCell>
                                <TableCell align="right">Birthday</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/users/${user.id}/details`} title="View user details">
                                            {user.first_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{user.last_name}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.address}</TableCell>
                                    <TableCell align="right">{user.birthday}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/users/${user.id}/details`}>
                                            <Tooltip title="View user details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/users/${user.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/users/${user.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};
