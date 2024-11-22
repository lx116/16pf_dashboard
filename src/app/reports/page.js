'use client'

import './styles.css'
import PersonalityFactorsChart from "@/app/respondents/components/personalityFactorsChart";
import PersonalityScatterChart from "@/app/reports/components/PersonalityScatterChart";
import CategorizationScatterChart from "@/app/reports/components/CategorizationScatterChart";
import {Col, Row} from "react-bootstrap";
import Divider from "@/app/components/divider";
import AgeDistributionChart from "@/app/reports/components/AgeDistributionChart";
import GenderDistributionChart from "@/app/reports/components/GenderDistributionChart";

export default function ReportPage(props) {
    return (
        <div>
            <h1 className='text-center'>
                Reportes generales
            </h1>
            <Divider />
            <Row>
                <Col>
                    <GenderDistributionChart />
                </Col>
                <Col>
                    <AgeDistributionChart/>
                </Col>
            </Row>
            <Divider />
            <Row>
                <h2 className='text-center'>
                    Factores de la personalidad
                </h2>
            </Row>
            <Divider />
            <Row>
                <Col>
                    <PersonalityScatterChart/>
                </Col>
                <Col>
                    <PersonalityScatterChart/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PersonalityScatterChart/>
                </Col>
                <Col>
                    <PersonalityScatterChart/>
                </Col>
            </Row>
            <Divider />
            <Row>
                <h2 className='text-center'>
                    Categorizaciones
                </h2>
            </Row>
             <Divider />
            <Row>
                <Col>
                    <CategorizationScatterChart/>
                </Col>
                <Col>
                    <CategorizationScatterChart/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CategorizationScatterChart/>
                </Col>
                <Col>
                    <CategorizationScatterChart/>
                </Col>
            </Row>

        </div>

    )
}