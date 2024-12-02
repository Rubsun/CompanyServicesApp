import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Responses404} from '@consta/uikit/Responses404';
import {getToken} from "../../services/token";
import {Text} from '@consta/uikit/Text';
import {Card} from '@consta/uikit/Card';
import {cnMixFlex} from '@consta/uikit/MixFlex';
import {Layout} from "@consta/uikit/Layout";
import './ProfilePage.css'

const Profile = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState(null);

    const IDFromStorage = parseInt(localStorage.getItem('id'));
    let accessToken = getToken();

    useEffect(() => {
        fetch('https://dummyjson.com/auth/me', {
            method: "GET",
            headers: {'Authorization': `Bearer ${accessToken}`},
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching the user data:', error);
            });
    }, []);

    return (
        <>
            {userData && (parseInt(id) === IDFromStorage) ? (
                <Layout>
                    <Layout flex={1} style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Card style={{
                            maxWidth: '800px',
                            marginLeft: '200px',
                            marginTop: '200px',
                            background: "white",
                            borderRadius: '15px'
                        }}>
                            <div className={cnMixFlex({
                                direction: "column",
                                gap: "s",
                                align: "center",
                                justify: "center"
                            })} style={{maxWidth: '800px', height: '188px'}}>
                                <Text size="2xl" weight="bold">
                                    {userData.firstName + ' ' + userData.lastName}
                                </Text>
                            </div>
                        </Card>
                        <Card style={{
                            maxWidth: '800px',
                            marginLeft: '200px',
                            marginTop: '50px',
                            background: "white",
                            borderRadius: '15px'
                        }}>
                            <div className={cnMixFlex({
                                direction: 'column',
                                gap: "s",
                                align: "center",
                                justify: "center"
                            })}>
                                <Text>Age: <Text weight="bold">{userData.age}</Text></Text>
                                <Text>Email: <Text weight="bold">{userData.email}</Text></Text>
                                <Text>Phone: <Text weight="bold">{userData.phone}</Text></Text>
                                <Text>Birth Date: <Text weight="bold">{userData.birthDate}</Text></Text>
                            </div>
                        </Card>

                    </Layout>
                    <Layout flex={1} style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: '175px'
                    }}>
                        <div className='photo-circle' style={{marginTop: '40px', marginLeft: '200px',}}>
                            <img src={userData.image} alt="User Photo"
                                 style={{borderRadius: '50%', width: '400px', height: '400px'}}/>
                        </div>
                    </Layout>
                </Layout>


            ) : (IDFromStorage === parseInt(id)) ? <div></div> : (
                <cnMixFlex justify="center" align="center" style={{marginTop: '200px'}}>
                    <Responses404/>
                </cnMixFlex>
            )
            }
        </>
    )
        ;
};

export default Profile;
