import { Container, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Portfolio } from "../../models/Portfolio";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {Button, Table} from "react-bootstrap";
import {User} from "../../models/User";


export const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<User>();
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);


    useEffect(() => {
        fetch(`${BACKEND_API_URL}/users/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
        fetch(`${BACKEND_API_URL}/users/${userId}/portfolios`)
            .then((response) => response.json())
            .then((data) => {
                setPortfolios(data);
            });
    }, [userId]);

    return (
        <Container>
            <h1 style={{margin: "24px 0"}}>About the user:</h1>
             <CardContent>
                 <p><b>User First Name:</b> {user?.first_name}</p>
                 <p><b>User Last Name:</b> {user?.last_name}</p>
                 <p><b>User Email:</b> {user?.email}</p>
                 <p><b>User Address:</b> {user?.address}</p>
                 <p><b>User Birthday:</b> {user?.birthday}</p>

                 <p><b>User Portfolios:</b></p>
                 <Table striped bordered hover responsive>
                     <thead>
                     <tr>
                         <th>Name</th>
                         <th>Industry</th>
                         <th>Public</th>
                         <th>Active</th>
                     </tr>
                     </thead>
                     <tbody>
                     {portfolios.map((portfolio) => (
                         <tr key={portfolio.id}>
                             <td align="left">{portfolio.name}</td>
                             <td align="left">{portfolio.industry}</td>
                             <td align="left">{portfolio.public ? "Yes" : "No"}</td>
                             <td align="left">{portfolio.active ? "Yes" : "No"}</td>
                         </tr>
                     ))}
                     </tbody>
                 </Table>
                 <Button style={{margin: "5px 0px"}} variant="dark" href={`/users`}><ArrowBackIcon style={{color:"white"}} />Go Back</Button>{' '}
                 <Button style={{margin: "5px 0px"}} variant="success" href={`/users/${userId}/edit`}><EditIcon style={{color:"white"}} />Edit user details</Button>{' '}
                 <Button style={{margin: "5px 0px"}} variant="danger" href={`/users/${userId}/delete`}><DeleteForeverIcon style={{color:"white"}} />Delete user</Button>{' '}
             </CardContent>
        </Container>
    );
};
