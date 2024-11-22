'use client'


import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const GenderDistributionChart = () => {
    const [genderData, setGenderData] = useState({ male: 0, female: 0 });

    useEffect(() => {
        axios.get('http://localhost:8000/api/respontents/') // Ajusta la URL según tu endpoint
            .then(response => {
                const respondents = response.data;

                // Contar hombres y mujeres
                const genderCounts = { male: 0, female: 0 };
                respondents.forEach(respondent => {
                    const gender = respondent.gender; // Asumiendo que 'gender' es una propiedad del respondiente
                    if (gender === 'M') genderCounts.male++;
                    else if (gender === 'F') genderCounts.female++;
                });

                setGenderData(genderCounts);
            })
            .catch(error => console.error('Error fetching gender data:', error));
    }, []);

    // Prepara los datos para Chart.js
    const data = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                data: [genderData.male, genderData.female],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF4384', '#36A2FB']
            }
        ]
    };

    return (
        <div style={{margin:'auto', maxWidth:'500px'}}>
            <h3 className='text-center'>Distribución de Géneros</h3>
            <Pie data={data} />
        </div>
    );
};

export default GenderDistributionChart;
