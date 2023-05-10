import React from "react";
import { getCurrentUser } from "../../services/auth.service";
import LoginForm from "./LoginForm";

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser?.toString()}</strong> Profile
                </h3>
            </header>
            <p>
            </p>
        </div>
    );
};

export default Profile;
