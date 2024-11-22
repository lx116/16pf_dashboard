'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function UploadExcelPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Por favor, selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/upload-excel/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al subir el archivo');
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Subir Archivo Excel</h1>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="form-control mb-3" />
            <button onClick={handleUpload} className="btn btn-primary">
                Subir Archivo
            </button>

            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}
