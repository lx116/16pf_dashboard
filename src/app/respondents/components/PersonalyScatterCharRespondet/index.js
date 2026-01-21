'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Form, Spinner, Alert } from 'react-bootstrap';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

// 🔹 Mapa de factores
const FACTOR_LABELS = {
    A: "A: Reservado - Abierto",
    B: "B: Concreto - Abstracto",
    C: "C: Inestabilidad Emocional - Estabilidad Emocional",
    E: "E: Sumiso - Dominante",
    F: "F: Prudente - Impulsivo",
    G: "G: Despreocupado - Escrupuloso",
    H: "H: Tímido - Espontáneo",
    I: "I: Racional - Emocional",
    L: "L: Confiado - Suspicaz",
    M: "M: Práctico - Soñador",
    N: "N: Sencillo - Astuto",
    O: "O: Seguro - Inseguro",
    Q1: "Q1:Tradicionalista - Innovador",
    Q2: "Q2: Dependencia del Grupo - Autosuficiencia",
    Q3: "Q3: Desinhibido - Controlado",
    Q4: "Q4: Tranquilo - Tensionado"
};

export default function PersonalityScatterRespondentChart({ highlightedId }) {
    const [data, setData] = useState(null);
    const [factor1, setFactor1] = useState('');
    const [factor2, setFactor2] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validFactors = Object.keys(FACTOR_LABELS);

    const fetchData = async () => {
        if (!factor1 || !factor2) {
            setError('Por favor selecciona ambos factores.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(
                'http://localhost:8000/api/personality-factors-filter/',
                {
                    params: { factor1, factor2 },
                }
            );
            setData(response.data);
        } catch (err) {
            setError('Error al cargar los datos. Por favor verifica los factores seleccionados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (factor1 && factor2) fetchData();
    }, [factor1, factor2]);

    const scatterData = {
        datasets: [
            {
                label: `${FACTOR_LABELS[factor1]} vs ${FACTOR_LABELS[factor2]}`,
                data: data
                    ? data
                        .filter(item => item.annotated_respondent_id !== parseInt(highlightedId))
                        .map(item => ({
                            x: item.factor1,
                            y: item.factor2,
                            name: item.respondent_name,
                            id: item.annotated_respondent_id,
                        }))
                    : [],
                pointBackgroundColor: data
                    ? data
                        .filter(item => item.annotated_respondent_id !== parseInt(highlightedId))
                        .map(item =>
                            item.respondent_name === 'sujeto_estudio_desertor'
                                ? 'rgba(255, 0, 0, 0.6)'
                                : item.respondent_name === 'sujeto_estudio_casi_desertor'
                                    ? 'rgba(255, 255, 0, 0.6)'
                                    : 'rgba(75, 192, 192, 0.4)'
                        )
                    : [],
                pointRadius: 10,
            },
            {
                label: 'Sujeto destacado',
                data: data
                    ? data
                        .filter(item => item.annotated_respondent_id === parseInt(highlightedId))
                        .map(item => ({
                            x: item.factor1,
                            y: item.factor2,
                            name: `Sujeto destacado: ${item.respondent_name}`,
                            id: item.annotated_respondent_id,
                        }))
                    : [],
                pointBackgroundColor: 'rgb(255,175,0)',
                pointBorderColor: 'black',
                pointBorderWidth: 1,
                pointRadius: 15,
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
                                    const { raw } = context;
                                    return `(${raw.x}, ${raw.y}) — ${raw.name} (ID: ${raw.id})`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: FACTOR_LABELS[factor1],
                            },
                            min: 0,
                            max: 10,
                        },
                        y: {
                            title: {
                                display: true,
                                text: FACTOR_LABELS[factor2],
                            },
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
                            {validFactors.map(factor => (
                                <option key={factor} value={factor}>
                                    {FACTOR_LABELS[factor]}
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
                            {validFactors.map(factor => (
                                <option key={factor} value={factor}>
                                    {FACTOR_LABELS[factor]}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}
