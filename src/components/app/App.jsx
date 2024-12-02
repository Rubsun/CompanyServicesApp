import React from 'react';
import {presetGpnDefault, Theme} from '@consta/uikit/Theme';
import {Responses404} from '@consta/uikit/Responses404';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/main-page/MainPage";
import ServiceDetailPage from "../../pages/service-detail-page/ServiceDetailPage";
import ServicePage from "../../pages/service-page/ServicePage";
import Header from "../header/Header";
import LoginPage from "../../pages/login-page/LoginPage";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import ProtectedRoute from "../routing/ProtectedRouter";
import {Button} from "@consta/uikit/Button";
import Footer from "../footer/Footer";

const App = function () {
    return (
        <Theme preset={presetGpnDefault}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="services" element={<ServicePage/>}/>
                        <Route path='services/:id' element={<ServiceDetailPage/>}/>
                        <Route path='user/:id' element={<ProfilePage/>}/>
                    </Route>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='*' element={
                        <div style={{marginTop: '200px'}}>
                            <Responses404
                                actions={
                                    <Button
                                        onClick={() => (window.location.href = '/')}
                                        size="m"
                                        view="ghost"
                                        label="На главную"
                                    />
                                }
                            />
                        </div>
                    }/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </Theme>
    );
};

export default App;
