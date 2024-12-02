    import React from "react";
    import { NavLink, useNavigate } from 'react-router-dom';
    import './Header.css';
    import { handleLogout, getToken } from '../../services/token';
    import {getProfileId} from "../../services/profile";

    const Header = () => {
        const navigate = useNavigate();
        const token = getToken();
        const id = getProfileId()

        return (
            <header className="header">
                <div className="nav-left">
                    <NavLink to="/" className="nav-button" activeClassName="active">
                        Главная страница
                    </NavLink>
                    {token && (
                        <NavLink to="/services" className="nav-button" activeClassName="active">
                            Услуги компании
                        </NavLink>
                    )}
                </div>
                <div className="nav-right">
                    {token ? (
                        <>
                            <NavLink to={`user/${id}`} className="nav-button" activeClassName="active">
                                Профиль
                            </NavLink>
                            <button className="nav-button" onClick={() => handleLogout(navigate)}>
                                Выход
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-button" activeClassName="active">
                            Вход
                        </NavLink>
                    )}
                </div>
            </header>
        );
    };

    export default Header;
