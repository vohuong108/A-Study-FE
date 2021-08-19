import React, { useEffect } from 'react'
import './Review.scss'
import QuizItem from '../quizItem/QuizItem'
import QuizNav from '../quizNav/QuizNav'
import { Layout, Divider, Row, Col, Button, Descriptions } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectSub } from '../../../../features/submit/submitSlice'
import { buildSubmitNav } from '../../../../features/submit/submitSlice'

const Review = ({ name, history }) => {
    const { idSub } = useParams();
    const submission = useSelector(state => selectSub(state, idSub))
    const submitNav = useSelector(state => state.submit.submitNav);
    const dispatch = useDispatch();

    const convertTime = (str) => {
        let date = new Date(str);
        let convertedDate = date.toGMTString();
        return convertedDate;
    }

    useEffect(() => {
        dispatch(buildSubmitNav({ idSub: idSub }));
    }, [submission])

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
                            <Descriptions.Item label="Started on">{convertTime(submission?.startTime)}</Descriptions.Item>
                            <Descriptions.Item label="State" style={{textTransform: 'capitalize'}}>{submission?.state}</Descriptions.Item>
                            <Descriptions.Item label="Completed On">{convertTime(submission?.finishTime)}</Descriptions.Item>
                            <Descriptions.Item label="Grade">{submission?.score}</Descriptions.Item>
                        </Descriptions>
                        {submission?.content.map(question => (
                            <QuizItem key={question.idQuestion} review data={question}/>
                        ))}
                            
                        </Col>
                        <Col className="review-nav" xs={24} sm={24} xl={6} style={{ padding: '1rem'}}>
                            <QuizNav review navData={submitNav}/>                            
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
