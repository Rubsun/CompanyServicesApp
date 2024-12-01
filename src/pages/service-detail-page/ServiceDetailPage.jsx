import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from '@consta/uikit/Loader';
import {Text} from '@consta/uikit/Text';
import {Card} from "@consta/uikit/Card";
import {Button} from "@consta/uikit/Button";

const ServiceDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${id}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setService(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Loader size="m"/>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Card
                style={{
                    padding: '2rem',
                    borderRadius: '15px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    maxWidth: '1200px',
                    margin: '2rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '270px',
                    background: "white"
                }}
            >
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%'}}>
                    <div style={{flex: 1, marginRight: '2rem', position: 'relative'}}>
                        {!isImageLoaded && (
                            <div style={{
                                width: '100%',
                                aspectRatio: '16 / 9',
                                background: '#f0f0f0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '15px',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}>
                                <Loader size="xs"/>
                            </div>
                        )}
                        <img
                            src={service.image}
                            alt={service.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '16 / 9',
                                objectFit: 'cover',
                                borderRadius: '15px',
                                display: isImageLoaded ? 'block' : 'none'
                            }}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </div>
                    <div style={{flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Text size="2xl" weight="bold" style={{
                            marginBottom: '1rem',
                            color: '#333',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            {service.name}
                        </Text>
                        <Text size="l" style={{
                            fontSize: '1rem',
                            color: '#666',
                            lineHeight: '1.5',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            {service.description}
                        </Text>
                    </div>
                </div>
            </Card>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                <Button label='Назад' size='l' view='primary' onClick={() => navigate('/services')} />
            </div>
        </>
    );
};

export default ServiceDetailPage;
