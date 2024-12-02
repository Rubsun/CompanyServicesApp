import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Loader} from "@consta/uikit/Loader";
import "./ServicePage.css";
import {PaginationExampleType} from "../../components/pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {set} from "./ServiceSlice";

const ServicePage = () => {
    const dispatch = useDispatch();
    const servicesFromState = useSelector((state) => state.services.value);

    const [allCards, setAllCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    const cardsPerPage = 15;

    useEffect(() => {
    const currentUserID = localStorage.getItem('id')
    if (currentUserID) {
      if (!servicesFromState.length) {
        const fetchData = async () => {
            setIsLoading(true);
            try {
              const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services');
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setAllCards(data);
              dispatch(set(data));
            } catch (error) {
              setError(error.message);
            } finally {
              setIsLoading(false);
            }
        };
        fetchData();
      } else {
        setIsLoading(false);
        setAllCards(servicesFromState);
      }
    } else {
      setError('Вы должны войти в аккаунт.');
      setIsLoading(false);
    }


  }, [servicesFromState, dispatch]);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = allCards.slice(startIndex, startIndex + cardsPerPage);
    const totalPages = Math.ceil(allCards.length / cardsPerPage);

    if (isLoading) {
        return (
            <div className="loader-container">
                <Loader size="m"/>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="main-container">
            <main className="content-container">
                {currentCards.map((card) => (
                    <CompanyCard key={card.id} card={card}/>
                ))}
            </main>
            <div className="pagination-container">
                <PaginationExampleType
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

const CompanyCard = ({card}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Link to={`/services/${card.id}`} className="company-card-link">
            <div className="company-card">
                {!isImageLoaded && (
                    <div className="image-placeholder">
                        <Loader size="xs"/>
                    </div>
                )}
                <img
                    src={card.image}
                    alt={card.name}
                    className={`card-image ${isImageLoaded ? "visible" : "hidden"}`}
                    onLoad={() => setIsImageLoaded(true)}
                />
                <h3>{card.name}</h3>
                <p>{card.description}</p>
            </div>
        </Link>
    );
};

export default ServicePage;
