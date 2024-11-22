'use client'

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AgeDistributionChart = () => {
    const [ageData, setAgeData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/respontents/') // Ajusta la URL según tu endpoint
            .then(response => {
                const respondents = response.data;

                // Agrupar por edades iguales
                const groupedAges = respondents.reduce((acc, respondent) => {
                    if (respondent.age !== undefined) {
                        acc[respondent.age] = (acc[respondent.age] || 0) + 1;
                    }
                    return acc;
                }, {});

                setAgeData(groupedAges);
                console.log(groupedAges);
            })
            .catch(error => console.error('Error fetching age data:', error));
    }, []);

    // Configurar datos para el gráfico
    const data = {
        labels: Object.keys(ageData),
        datasets: [
            {
                data: Object.values(ageData),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#FF9F40', '#9966FF', '#FF4444', '#44FF44'
                ],
                hoverBackgroundColor: [
                    '#FF4384', '#36A2FB', '#FFDB56', '#4BC0D0',
                    '#FF7F40', '#7744FF', '#FF2222', '#22FF22'
                ]
            }
        ]
    };

    return (
        <div style={{maxWidth: '500px', margin:'auto' }}>
            <h3 style={{ textAlign: 'center' }}>Distribución de Edades</h3>
            <Pie data={data} />
        </div>
    );
};

export default AgeDistributionChart;
