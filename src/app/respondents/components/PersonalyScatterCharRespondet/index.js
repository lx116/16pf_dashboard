'use client';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Scatter} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {Form, Spinner, Alert} from 'react-bootstrap';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function PersonalityScatterRespondentChart({highlightedId}) {
    const [data, setData] = useState(null);
    const [factor1, setFactor1] = useState('');
    const [factor2, setFactor2] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validFactors = ['A', 'B', 'C', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'Q1', 'Q2', 'Q3', 'Q4'];

    const fetchData = async () => {
        if (!factor1 || !factor2) {
            setError('Por favor selecciona ambos factores.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:8000/api/personality-factors-filter/`, {
                params: {factor1, factor2},
            });
            setData(response.data);
        } catch (err) {
            setError('Error al cargar los datos. Por favor verifica los factores seleccionados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(data)
        if (factor1 && factor2) fetchData();
    }, [factor1, factor2]);

    const scatterData = {
        datasets: [
            {
                label: `${factor1} vs ${factor2}`,
                data: data
                    ? data
                        .filter((item) => item.annotated_respondent_id !== parseInt(highlightedId))
                        .map((item) => ({
                            x: item.factor1,
                            y: item.factor2,
                            name: item.respondent_name,
                            id: item.annotated_respondent_id,
                        }))
                    : [],
                pointBackgroundColor: data
                    ? data
                        .filter((item) => item.annotated_respondent_id !== parseInt(highlightedId))
                        .map((item) =>
                            item.respondent_name === 'sujeto_estudio_desertor'
                                ? 'rgba(255, 0, 0, 0.6)' // Rojo
                                : item.respondent_name === 'sujeto_estudio_casi_desertor'
                                    ? 'rgba(255, 255, 0, 0.6)' // Amarillo
                                    : 'rgba(75, 192, 192, 0.4)' // Verde claro
                        )
                    : [],
                pointRadius: 10,
            },
            {
                label: 'Sujeto destacado',
                data: data
                    ? data
                        .filter((item) => item.annotated_respondent_id === parseInt(highlightedId))
                        .map((item) => ({
                            x: item.factor1,
                            y: item.factor2,
                            name: `Sujeto destacado: ${item.respondent_name}`,
                            id: item.annotated_respondent_id,
                        }))
                    : [],
                pointBackgroundColor: 'rgb(255,175,0)', // Azul intenso
                pointBorderColor: 'black', // Borde negro para destacar más
                pointBorderWidth: 1,
                pointRadius: 15, // Radio mayor para destacarlo
            },
        ],
    };


    return (
        <div>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Scatter
                data={scatterData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const {raw} = context;
                                    return `(${raw.x}, ${raw.y}) - ${raw.name} (ID: ${raw.id})`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: factor1,
                            },
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                        },
                        y: {
                            title: {
                                display: true,
                                text: factor2,
                            },
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                        },
                    },
                }}
            />
            <Form className="mb-4">
                <div className="d-flex justify-content-between">
                    <Form.Group className="col-5">
                        <Form.Label>Selecciona el primer factor:</Form.Label>
                        <Form.Select
                            value={factor1}
                            onChange={(e) => setFactor1(e.target.value)}
                        >
                            <option value="">-- Selecciona un factor --</option>
                            {validFactors.map((factor) => (
                                <option key={factor} value={factor}>
                                    {factor}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="col-5">
                        <Form.Label>Selecciona el segundo factor:</Form.Label>
                        <Form.Select
                            value={factor2}
                            onChange={(e) => setFactor2(e.target.value)}
                        >
                            <option value="">-- Selecciona un factor --</option>
                            {validFactors.map((factor) => (
                                <option key={factor} value={factor}>
                                    {factor}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}
