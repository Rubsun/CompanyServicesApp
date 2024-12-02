import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { handleLogout, getToken } from '../../services/token';
import { getProfileId } from "../../services/profile";

const Header = () => {
    const navigate = useNavigate();
    const token = getToken();
    const id = getProfileId();

    return (
        <header className="header">
            <div className="nav-left">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
                    Главная страница
                </NavLink>
                {token && (
                    <NavLink to="/services" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
                        Услуги компании
                    </NavLink>
                )}
            </div>
            <div className="nav-right">
                {token ? (
                    <>
                        <NavLink to={`/user/${id}`} className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
                            Профиль
                        </NavLink>
                        <button className="nav-button" onClick={() => handleLogout(navigate)}>
                            Выход
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
                        Вход
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
