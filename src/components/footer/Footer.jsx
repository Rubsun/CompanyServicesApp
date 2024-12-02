import React from "react";
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { getToken } from '../../services/token';

const Footer = () => {
    const token = getToken();

    return (
        <footer className="footer">
            <div className="footer-left">
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
                <p className="footer-text nav-right">© 2024 Моя компания</p>
            </div>
        </footer>
    );
};

export default Footer;
