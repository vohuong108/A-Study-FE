import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuizSubmit } from '../../../../features/submit/submitAction';
import moment from 'moment';

import './Review.scss';

import QuizItem from '../quizItem/QuizItem';
import QuizNav from '../quizNav/QuizNav';
import { Layout, Divider, Row, Col, Button, Descriptions, message } from 'antd';


const Review = ({ name, history }) => {
    const { quizId, submitId } = useParams();
    const quizSubmit = useSelector(state => state.submit.quizSubmit);
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();

    const convertTime = (str) => moment.utc(str).local().format("HH:mm:ss, DD-MM-yyyy");

    console.log(quizId, submitId)

    useEffect(() => {
        const getSubmit = async () => {
            let response = await dispatch(getQuizSubmit({ quizId, submitId }));

            if(response?.error) {
                message.error({
                    content: response.payload.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });

                history.goBack();
            }
        }

        if(user) {
            getSubmit();
        }
    }, [user, quizId, submitId])

    return (
        <Layout className="review">
            <Layout.Content className="review-layout-content">
                <h2>{name}</h2>
                <Divider />
                <Layout className="review-wrap">
                    <Row>
                        <Col 
                            className="review-content" 
                            xs={24} sm={24} xl={18}
                            style={{padding: '1rem'}}
                        >
                        <Descriptions 
                            className="review-desc" 
                            column={1} 
                            size={'small'}
                        >
                            <Descriptions.Item label="Started on">{convertTime(quizSubmit?.startTime)}</Descriptions.Item>
                            <Descriptions.Item label="State" style={{textTransform: 'capitalize'}}>{quizSubmit?.state}</Descriptions.Item>
                            <Descriptions.Item label="Completed On">{convertTime(quizSubmit?.finishTime)}</Descriptions.Item>
                            <Descriptions.Item label="Grade">{` ${quizSubmit?.grade} `}</Descriptions.Item>
                        </Descriptions>

                        {quizSubmit?.questions?.map(question => (
                            <QuizItem key={question.id} review indexQ={question.questionOrder} data={question}/>
                        ))}
                        </Col>
                        <Col className="review-nav" xs={24} sm={24} xl={6} style={{ padding: '1rem'}}>
                            <QuizNav review/>                            
                        </Col>
                        <Button 
                            className="review-btn" 
                            type="primary" 
                            shape="round" 
                            htmlType="submit" 
                            form="review-form"
                            size={'large'}
                            onClick={() => history.goBack()}
                        >
                            Finish Review
                        </Button>
                    </Row>
                </Layout>
            </Layout.Content>
        </Layout>
    )
}

export default Review
