'use client';

import Image from 'next/image'
import React from 'react';
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import appLogo from '../../public/logo.svg'
import homeIcon from '../../public/home-svgrepo-com.svg'
import dashboardIcon from '../../public/dashboard-graph-analytics-report-svgrepo-com.svg'
import uploadIcon from '../../public/upload-svgrepo-com.svg'

import './styles.css'

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className='overflow-hidden'>

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home" className='logo'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Image src={appLogo} alt='logo'
                               style={{maxHeight: '50px', width: 'auto', marginRight: '20px'}}/>
                        <h3>16PF</h3>
                    </div>
                </Navbar.Brand>
                <Nav className="p-3">
                    <Nav.Link href="/" className="btn btn-primary m-2">
                        <Image src={homeIcon} alt="Inicio"
                               style={{maxHeight: '20px', width: 'auto', marginRight: '8px'}}/>
                        Inicio
                    </Nav.Link>
                    <Nav.Link href="/uploadexcel" className="btn btn-success m-2">
                        <Image src={uploadIcon} alt="Cargar Datos"
                               style={{maxHeight: '20px', width: 'auto', marginRight: '8px'}}/>
                        Cargar Datos
                    </Nav.Link>
                    <Nav.Link href="/reports" className="btn btn-danger m-2">
                        <Image src={dashboardIcon} alt="Reporte General"
                               style={{maxHeight: '20px', width: 'auto', marginRight: '8px'}}/>
                        Reporte general
                    </Nav.Link>

                </Nav>
            </Container>
        </Navbar>

        <Container fluid>
            <Row className="justify-content-center">
                <Col xs={10} style={{overflowY: 'auto', maxHeight: '90vh'}}>
                    <div className="container">
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
        </body>
        </html>
    );
}
