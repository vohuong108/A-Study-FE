import React, { useState, useReducer } from 'react'
import initQuiz from './util/initQuiz'
import quizReducer from './util/quizReducer'
import './Quiz.scss'
import { Layout, Divider, Row, Col, Button } from 'antd'
import { useForm } from "react-hook-form"
import QuizItem from './quizItem/QuizItem'
import QuizNav from './quizNav/QuizNav'
const { Content } = Layout;

const data = {
    name: 'Recomendation Systems Quiz',
    time: 60,
    questions: [
        { 
            id: 1, 
            type: 'one',
            title: "Click Capture/Forward six times. All clients should have received a reply. Note that only one PDU can cross a wire in each direction at any given time. What is this called?",
            point: 5,
            choices: [
                {
                    idChoice: 'A', 
                    value: "They are stored in the switch."
                }, {
                    idChoice: 'B', 
                    value: "They are lost."
                }, {
                    idChoice: 'C', 
                    value: "They are discarded."
                }, {
                    idChoice: 'D', 
                    value: "They represent different devices."
                }
            ]
        }, {
            id: 2, 
            type: 'many',
            title: "All clients should have received a reply. Note that only one PDU can cross a wire in each direction at any given time. What is this called?",
            point: 3,
            choices: [
                {
                    idChoice: 'A', 
                    value: "They are stored in the switch."
                }, {
                    idChoice: 'B', 
                    value: "They are lost."
                }, {
                    idChoice: 'C', 
                    value: "They are discarded."
                }, {
                    idChoice: 'D', 
                    value: "They represent different devices."
                }
            ]
        }
    ]

}

const Quiz = () => {
    const { control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const [marks, dispatch] = useReducer(quizReducer, data.questions, initQuiz)

    console.log("re in quiz")
    return (
        <Layout className="quiz">
            <Content style={{ padding: '50px 50px' }}>
                <h2>{data.name}</h2>
                <Divider />
                <Layout className="quiz-wrap">
                    <Row>
                        <Col 
                            className="quiz-content" 
                            xs={24} sm={24} xl={18}
                            style={{padding: '15px'}}
                        >
                            <form 
                                id="quiz-form"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                
                                {data.questions.map(obj => (
                                    <QuizItem review={false} data={obj} control={control} setMarks={dispatch}/>
                                ))}
                                
                            </form>
                        </Col>
                        <Col className="quiz-nav-col" xs={24} sm={24} xl={6} style={{ padding: '15px'}}>
                            <QuizNav handleSubmit={handleSubmit(onSubmit)} marks={marks} dueTime={data.time} />
                        </Col>
                        <Button 
                            className="quiz-btn" 
                            type="primary" 
                            shape="round" 
                            htmlType="submit" 
                            form="quiz-form"
                            size="large"
                        >
                            Submit
                        </Button>
                    </Row>
                </Layout>
            </Content>
        </Layout>
    )
}

export default Quiz
