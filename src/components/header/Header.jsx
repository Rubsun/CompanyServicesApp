import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import './Header.css';
import {getToken, handleLogout} from '../../services/token';
import {getProfileId} from "../../services/profile";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../../pages/profile-page/ProfileSlice";
import {User} from "@consta/uikit/User";

const Header = () => {
    const dispatch = useDispatch();
    const userFromState = useSelector((state) => state.user.userData);

    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const token = getToken();
    const id = getProfileId();

    useEffect(() => {
        if (!userFromState) {
            const fetchData = async () => {
                try {
                    const response = await fetch("https://dummyjson.com/auth/me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Не удалось загрузить информацию о пользователе");
                    }
                    const data = await response.json();
                    setUserData(data);
                    dispatch(set(data));
                } catch (e) {
                    console.error("Ошибка при загрузке пользователя:", e.message);
                }
            };
            fetchData();
        } else {
            setUserData(userFromState);
        }
    }, [userFromState, dispatch, token]);

    const user_image = userData.image
    const fio = userData.firstName + ' ' + userData.lastName

    return (
        <header className="header">
            <div className="nav-left">
                <NavLink to="/" className={({isActive}) => isActive ? "nav-button active" : "nav-button"}>
                    Главная страница
                </NavLink>
                {token && (
                    <NavLink to="/services" className={({isActive}) => isActive ? "nav-button active" : "nav-button"}>
                        Услуги компании
                    </NavLink>
                )}
            </div>
            <div className="nav-right">
                {token ? (
                    <>
                        <NavLink to={`/user/${id}`}
                                 className={({isActive}) => isActive ? "nav-button active" : "nav-button"}>
                            <User name={fio} avatarUrl={user_image}/>
                        </NavLink>
                        <button className="nav-button" onClick={() => handleLogout(navigate)}>
                            Выход
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={({isActive}) => isActive ? "nav-button active" : "nav-button"}>
                        Вход
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
