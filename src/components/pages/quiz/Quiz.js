import React, { useEffect } from 'react'
import './Quiz.scss'
import { Layout, Divider, Row, Col, Button, message } from 'antd'
import { useForm, useFieldArray } from "react-hook-form"
import QuizItem from './quizItem/QuizItem'
import QuizNav from './quizNav/QuizNav'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizByID, submitExamineResults } from '../../../features/quiz/quizAction'
import { buildNav, buildStartTime } from '../../../features/quiz/quizSlice'
import { useParams } from 'react-router-dom'
import { getToken } from '../../../utils/localStorageHandler'
import { unwrapResult } from '@reduxjs/toolkit'


const Quiz = () => {
    const { idQuiz } = useParams();
    const user = useSelector(state => state.user.userObj);
    const quiz = useSelector(state => state.quiz.quiz);
    const quizNav = useSelector(state => state.quiz.quizNav); 
    let startTime = useSelector(state => state.quiz.startTime);
    const { control, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch();
    const { fields } = useFieldArray({ control, name: "content" });
    
    const onSubmit = async (data) => {
        let finishTime = (new Date()).toISOString();
        let token = getToken();
        let examineData = {
            idQuiz: idQuiz,
            startTime: startTime,
            finishTime: finishTime,
            content: data.content,
        }
        
        if(user && token) {
            try {
                let result = await dispatch(submitExamineResults(examineData));
                
                message.success({
                    content: "Submit examine successfully",
                    style: {marginTop: '72px'}
                })
            } catch (error) {
                message.error({
                    content: error?.message,
                    style: {marginTop: '72px'}
                })
            }

        }
    }
    

    useEffect(() => {
        let token = getToken();

        const getQuiz = async (requestData) => {
            let quizResult = await dispatch(getQuizByID(requestData));
            let un_quiz = unwrapResult(quizResult);
            setValue("content", un_quiz.content);
            // dispatch(buildStartTime());
            // dispatch(buildNav());
        }

        if(user && token) {
            let requestData = {
                access_token: token,
                idQuiz: idQuiz
            }
            getQuiz(requestData);
        }
    }, [user, idQuiz]);
    console.log("re-render in quiz")
    return (
        <Layout className="quiz">
            <Layout.Content style={{ padding: '50px 50px' }}>
                <h2>{quiz?.name}</h2>
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
                                
                                {fields.map((field, index) => (
                                    <QuizItem key={field.id} review={false} data={field} control={control} indexQ={index} setValue={setValue}/>
                                ))}
                                
                            </form>
                        </Col>
                        <Col className="quiz-nav-col" xs={24} sm={24} xl={6} style={{ padding: '15px'}}>
                            <QuizNav handleSubmit={handleSubmit(onSubmit)} dueTime={quiz?.time} navData={quizNav}/>
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
            </Layout.Content>
        </Layout>
    )
}

export default Quiz