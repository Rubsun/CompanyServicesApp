import React, {useEffect, useState} from "react";
import {Loader} from "@consta/uikit/Loader";
import "./MainPage.css";
import {PaginationExampleType} from "../../components/pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import { set } from './NewsSlice'

const MainPage = () => {
    const dispatch = useDispatch();
    const newsFromState = useSelector((state) => state.news.value);

    const [news, setAllNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const newsPerPage = 4;

    useEffect(() => {
        if (!newsFromState.length) {
            const fetchNews = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setAllNews(data);
                    dispatch(set(data));
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchNews();
        } else {
            setIsLoading(false);
            setAllNews(newsFromState);
        }
    }, [dispatch, newsFromState]);

    const totalPages = Math.ceil(news.length / newsPerPage);

    const startIndex = (currentPage - 1) * newsPerPage;
    const currentNews = news.slice(startIndex, startIndex + newsPerPage);

    if (isLoading) {
        return (
            <div className="loader-container">
                <Loader size="m"/>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="main2">
            <div className="content">
                {currentNews.map((item) => (
                    <div className="message-box" key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <div className="message-time">{new Date(item.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                <PaginationExampleType currentPage={currentPage} setCurrentPage={setCurrentPage}
                                       totalPages={totalPages}/>
            </div>
        </div>
    );
};

export default MainPage;
