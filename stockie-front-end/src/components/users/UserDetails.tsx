import { Container, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {Button} from "react-bootstrap";
import {User} from "../../models/User";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";


export const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<User>();

    const [currentUserRole] = useState<string | undefined>(AuthService.getCurrentUserRole());

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/users/${userId}`, { headers: authHeader() })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                console.log(userId);
            });
    }, [userId]);

    return (
        <Container>
             <CardContent>
                 <h1 style={{margin: "24px 0"}}>{user?.user?.username}</h1>
                 <p><b>Name:</b> {user?.user_account?.name}</p>
                 <p><b>Role:</b> {user?.role}</p>
                 <p><b>Bio:</b> {user?.user_account?.bio}</p>
                 <p><b>Birthday:</b> {user?.user_account?.birthday}</p>
                 <p><b>Gender:</b> {user?.user_account?.gender}</p>
                 <p><b>Address:</b> {user?.user_account?.address}</p>
                 <p><b>User Companies:</b> {user?.companies?.length}</p>
                 <p><b>User Stocks:</b> {user?.stocks?.length}</p>
                 <p><b>User Portfolios:</b> {user?.portfolios?.length}</p>
                 <Button style={{margin: "10px 10px 0 0px"}} variant="dark" href={`/users`}>
                     <ArrowBackIcon style={{color:"white"}} />
                     Go Back
                 </Button>
                 <Button style={{margin: "10px 10px 0 0px"}} variant="success" href={`/users/${userId}/edit`}>
                     <EditIcon style={{color:"white"}} />
                     Edit user details
                 </Button>
                 <Button style={{margin: "10px 10px 0 0px"}} variant="danger" href={`/users/${userId}/delete`}>
                     <DeleteForeverIcon style={{color:"white"}} />
                     Delete user
                 </Button>
                 {currentUserRole === "admin" && (
                     <div className="form-group">
                         <Button style={{margin: "10px 10px 0 0px"}} variant="success" href={`/users/${userId}/edit_role`}>
                             <EditIcon style={{color:"white"}} />
                             Edit user role
                         </Button>
                 </div>
                 )}

             </CardContent>
        </Container>
    );
};
