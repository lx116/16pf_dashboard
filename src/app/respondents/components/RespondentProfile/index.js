'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import Image from 'next/image'
import profileImageMan from '../../../../../public/account-avatar-profile-user-8-svgrepo-com.svg'
import profileImageWoman from '../../../../../public/account-avatar-profile-user-10-svgrepo-com.svg'

export default function RespondentProfile({id}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/respondents/${id}/`);
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar el perfil del usuario.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchUserProfile();
    }, [id]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Alert variant="warning">No se encontró información del usuario.</Alert>
            </Container>
        );
    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: '50%' }} className="shadow-lg">
                <Card.Body className="text-center">
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            margin: '0 auto 15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            border: '1px solid black',
                            color: '#666',
                        }}
                    >
                        {user.gender === 'M'?(
                            <Image src={profileImageMan} alt='perfil' style={{width: '100%'}}/>
                        ):(<Image src={profileImageWoman} alt='perfil' style={{width: '100%'}}/>)}

                    </div>
                    <Card.Title className="mb-3" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                        {user.name}
                    </Card.Title>
                    <Card.Text>
                        <strong>Edad:</strong> {user.age} años
                    </Card.Text>
                    <Card.Text>
                        <strong>Género:</strong> {user.gender}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}
