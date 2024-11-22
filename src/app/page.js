'use client';

import Image from 'next/image'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ListGroup, Spinner, Alert, Table} from 'react-bootstrap';
import Divider from "@/app/components/divider";


export default function Home() {
    const [respondents, setRespondents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRespondents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/respontents/');
                setRespondents(response.data);
            } catch (err) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchRespondents();
    }, []);

    if (loading) return <Spinner animation="border" role="status" className="mt-3"><span
        className="visually-hidden">Cargando...</span></Spinner>;
    if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

    return (
        <div>
            <h1 className='text-center'>Lista de Encuestados</h1>
            <Divider />
            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {respondents.map((respondent) => (
                    <tr key={respondent.id}>
                        <td>{respondent.id}</td>
                        <td>{respondent.name}</td>
                        <td>{respondent.age}</td>
                        <td>
                            <a href={`/respondents/${respondent.id}`} className="btn btn-primary btn-sm">
                                Ver Detalles
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
