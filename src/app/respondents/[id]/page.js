'use client'

import PersonalityFactorsChart from "@/app/respondents/components/personalityFactorsChart";
import {useParams} from "next/navigation";
import {CategoryScale} from "chart.js";
import CategorizationChart from "@/app/respondents/components/CategorizationChart";
import PersonalityScatterRespondentChart from "@/app/respondents/components/PersonalyScatterCharRespondet";
import CategorizationScatterChart from "@/app/reports/components/CategorizationScatterChart";
import CategorizationScatterRespondentChart from "@/app/respondents/components/CategorizationScatterChartRespondent";
import RespondentProfile from "@/app/respondents/components/RespondentProfile";
import Divider from "@/app/components/divider";
import {Col, Row} from "react-bootstrap";

export default function RespondentsPage() {
    const {id} = useParams();
    return (
        <>
            <RespondentProfile id={id}/>
            <Divider/>
            <h2 className='text-center'>
                Rasgos de personalidad
            </h2>
            <Divider/>
            <Row>
                <Col>
                    <PersonalityFactorsChart respondent_id={id}/>
                </Col>
                <Col>
                    <CategorizationChart respondent_id={id}/>
                </Col>
            </Row>
            <Divider/>
            <h2 className='text-center'>
                Ubicacion del estudiante en los graficos de dispercion
            </h2>
            <Divider/>
            <Row>
                <Col>
                    <h4 className='text-center'></h4>
                    <PersonalityScatterRespondentChart highlightedId={id}/>
                </Col>
                <Col>
                    <CategorizationScatterRespondentChart highlightedId={id}/>
                </Col>
            </Row>

        </>
    )
}