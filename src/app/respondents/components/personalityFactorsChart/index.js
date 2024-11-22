import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'next/navigation';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PersonalityFactorsChart({respondent_id}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPersonalityFactors = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/personality-factors/${respondent_id}/`);
                console.log(response);
                setData(response.data);
            } catch (err) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchPersonalityFactors();
    }, [respondent_id]);

    if (loading) return <Spinner animation="border" role="status" className="mt-3"><span className="visually-hidden">Cargando...</span></Spinner>;
    if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

    // Preparar datos para el gráfico
    const chartData = {
        labels: Object.keys(data[0] || {}).filter((key) => key !== 'id' && key !== 'respondent'),
        datasets: [
            {
                label: 'Factores de Personalidad',
                data: Object.values(data[0] || {}).filter((value) => typeof value === 'number'),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Factores de Personalidad por Respondente',
                        },
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
}
