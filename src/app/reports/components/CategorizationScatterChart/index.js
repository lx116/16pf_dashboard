'use client';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Scatter} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import {Form, Spinner, Alert} from 'react-bootstrap';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function CategorizationScatterChart() {
    const [data, setData] = useState(null);
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const validFactors = ['An', 'Ex', 'So', 'In', 'Ob', 'Cr', 'Ne', 'Ps', 'Li', 'Ac'];

    const fetchData = async () => {
        if (!category1 || !category2) {
            setError('Por favor selecciona ambos factores.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:8000/api/categorization-filter/`, {
                params: {category1, category2},
            });
            setData(response.data);
        } catch (err) {
            setError('Error al cargar los datos. Por favor verifica los factores seleccionados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category1 && category2) fetchData();
    }, [category1, category2]);

    const scatterData = {
        datasets: [
            {
                label: `${category1} vs ${category2}`,
                data: data
                    ? data.map((item) => ({
                        x: item.category1,
                        y: item.category2,
                        name: item.respondent_name,
                        id: item.annotated_respondent_id,
                    }))
                    : [],
                pointBackgroundColor: data
                    ? data.map((item) => {
                        if (item.respondent_name === 'sujeto_estudio_desertor') return 'rgba(255, 0, 0, 0.6)';
                        if (item.respondent_name === 'sujeto_estudio_casi_desertor') return 'rgba(255, 255, 0, 0.6)';
                        return 'rgba(75, 192, 192, 0.6)';
                    })
                    : [],
                pointRadius: 8,
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
                                text: category1,
                            },
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                        },
                        y: {
                            title: {
                                display: true,
                                text: category2,
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
                        <Form.Label>Primera categorizacion:</Form.Label>
                        <Form.Select
                            value={category1}
                            onChange={(e) => setCategory1(e.target.value)}
                        >
                            <option value="">-- Selecciona una categorización --</option>
                            {validFactors.map((factor) => (
                                <option key={factor} value={factor}>
                                    {factor}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="col-5">
                        <Form.Label>Segunda categorizacion:</Form.Label>
                        <Form.Select
                            value={category2}
                            onChange={(e) => setCategory2(e.target.value)}
                        >
                            <option value="">-- Selecciona una categorización --</option>
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
    )
}