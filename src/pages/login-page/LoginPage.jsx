import React, {useState} from "react";
import './LoginPage.css';
import {saveToken} from "../../services/token";
import {saveProfileId} from "../../services/profile";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 100,
                }),
            });

            if (!response.ok) {
                console.log(response.status);
                console.log(username, password);
                throw new Error('Ошибка авторизации');
            }

            const data = await response.json();
            let accessToken = data['accessToken']
            saveToken(accessToken)
            const getMeResp = await fetch('https://dummyjson.com/auth/me', {
                method: "GET",
                headers: {'Authorization': `Bearer ${accessToken}`},
            })
            const userData = await getMeResp.json()
            saveProfileId(userData)
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container-login">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleLogin}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="User name / Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                className="login__input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
