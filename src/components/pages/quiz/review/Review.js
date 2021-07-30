import React from 'react'
import './Review.scss'
import QuizItem from '../quizItem/QuizItem'
import QuizNav from '../quizNav/QuizNav'
import markClassify from '../util/markClassify'
import { Layout, Divider, Row, Col, Button, Descriptions } from 'antd'
const { Content } = Layout;

const data = {
    name: 'Recomendation Systems Quiz',
    timeStart: "Wednesday, 12 May 2021, 10:21 AM",
    timeFinish: "Wednesday, 12 May 2021, 10:44 AM",
    state: 'Finished',
    grade: 100,
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
            ],
            userChoice: 'A',
            isCorrect: true
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
            ],
            userChoices: ['A', 'C'],
            isCorrect: false
        }
    ]

}

const Review = () => {
    const marks = markClassify(data.questions);
    return (
        <Layout className="review">
            <Content style={{ padding: '50px 50px' }}>
                <h2>{data.name}</h2>
                <Divider />
                <Layout className="review-wrap">
                    <Row>
                        <Col 
                            className="review-content" 
                            xs={24} sm={24} xl={18}
                            style={{padding: '15px'}}
                        >
                        <Descriptions 
                            className="review-desc" 
                            column={1} 
                            size={'small'}
                        >
                            <Descriptions.Item label="Started on">{data.timeStart}</Descriptions.Item>
                            <Descriptions.Item label="State">{data.state}</Descriptions.Item>
                            <Descriptions.Item label="Completed On">{data.timeFinish}</Descriptions.Item>
                            <Descriptions.Item label="Grade">{data.grade}</Descriptions.Item>
                        </Descriptions>
                        {data.questions.map(obj => (
                            <QuizItem review data={obj}/>
                        ))}
                            
                        </Col>
                        <Col className="review-nav" xs={24} sm={24} xl={6} style={{ padding: '15px'}}>
                            <QuizNav review marks={marks}/>
                        </Col>
                        <Button 
                            className="review-btn" 
                            type="primary" 
                            shape="round" 
                            htmlType="submit" 
                            form="review-form"
                            size={'large'}
                        >
                            Finish Review
                        </Button>
                    </Row>
                </Layout>
            </Content>
        </Layout>
    )
}

export default Review
