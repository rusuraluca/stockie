import {
    CircularProgress,
    Container,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../constants";
import { User } from "../../models/User";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "../pagination/Pagination";
import {Button, Table} from "react-bootstrap";
import {Portfolio} from "../../models/Portfolio";


export const UserShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalInstances, setTotalInstances] = useState<number>(0);


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/users/page/${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.users);
                setTotalInstances(data.totalUsers);
                setLoading(false);
                setCurrentPage(currentPage);
            });
    }, [currentPage]);

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
            <h1 style={{margin: "24px 0"}}>All users</h1>
            {loading && <CircularProgress />}
            {!loading && users.length === 0 && <p>No users found</p>}
            {!loading && users.length > 0 && (
                <div>
                    <Button style={{margin: "24px 0"}} variant="primary" href={`/users/add`}>Add a new user</Button>{' '}
                    <Button style={{margin: "24px 0"}} variant="secondary" onClick={handleSortByFirstName}>
                        Sort by first name
                    </Button>{' '}
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th align="left">First Name</th>
                                <th align="left">Last Name</th>
                                <th align="left">Email</th>
                                <th align="left">No of Portfolios</th>
                                <th align="left">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td align="left">{user.first_name}</td>
                                    <td align="left">{user.last_name}</td>
                                    <td align="left">{user.email}</td>
                                    <td align="left">
                                        {user.portfolios? user.portfolios.length : 0}
                                    </td>
                                    <td align="left">
                                        <Button style={{margin: "5px 0px"}} variant="dark" href={`/users/${user.id}/details`}><ReadMoreIcon style={{color:"white"}} />View user details</Button>{' '}
                                        <Button style={{margin: "5px 0px"}} variant="success" href={`/users/${user.id}/edit`}><EditIcon style={{color:"white"}} />Edit user details</Button>{' '}
                                        <Button style={{margin: "5px 0px"}} variant="danger" href={`/users/${user.id}/delete`}><DeleteForeverIcon style={{color:"white"}} />Delete user</Button>{' '}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        total={totalInstances}
                        limit={25}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </Container>
    );
};
