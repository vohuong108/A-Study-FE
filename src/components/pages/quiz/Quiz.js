import React, { useEffect } from 'react'
import './Quiz.scss'
import { Layout, Divider, Row, Col, Button, message, Modal } from 'antd'
import { useForm, useFieldArray } from "react-hook-form"
import QuizItem from './quizItem/QuizItem'
import QuizNav from './quizNav/QuizNav'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizById, submitExamineResults } from '../../../features/quiz/quizAction'
import { buildNav, buildStartTime } from '../../../features/quiz/quizSlice'
import { useParams } from 'react-router-dom'
import { getToken } from '../../../utils/localStorageHandler'
import { unwrapResult } from '@reduxjs/toolkit'


const Quiz = ({ history }) => {
    const { quizId } = useParams();
    const user = useSelector(state => state.user.userObj);
    const quiz = useSelector(state => state.quiz.quiz);
    const quizNav = useSelector(state => state.quiz.quizNav); 
    const dispatch = useDispatch();
    let startTime = useSelector(state => state.quiz.startTime);
    const { control, handleSubmit, setValue } = useForm();
    const { fields } = useFieldArray({ control, name: "content" });
    
    console.log("fields: ", fields );

    const onSubmit = async (data) => {
        let finishTime = (new Date()).toISOString();
        let token = getToken();
        let arr = data.content.map((content) => {
            let temp = content.choices.find((choice) => choice.answer === true);
            if(temp) {
                console.log(`question ${content.questionId} - ${temp.choiceId}`);
                return {questionId: content.questionId, choiceId: temp.choiceId}
            } else {
                console.log(`question ${content.questionId} - null`);
                return {questionId: content.questionId, choiceId: -1}
            }
            
        })

        console.log("date submit: ", data.content);
        console.log("convert: ", arr);
        
        let examineData = {
            quizId: quizId,
            quizTitle: quiz?.title,
            startTime: startTime,
            finishTime: finishTime,
            answers: arr
        }
        
        if(user && token) {
            try {
                let result = await dispatch(submitExamineResults({data: examineData, access_token: token}));
                let un_result = unwrapResult(result);

                console.log("un_result: ", un_result);
                message.success({
                    content: "Submit examine successfully",
                    style: {marginTop: '72px'}
                })

                Modal.confirm({
                    title: un_result?.title,
                    content: `Grade: ${un_result?.score}`,
                    onOk: () => { history.goBack(); },
                    onCancel: () => { history.goBack(); }
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
            try {
                let quizResult = await dispatch(getQuizById(requestData));
                let un_quiz = unwrapResult(quizResult);
    
                if(un_quiz?.isEnroll === false) history.push('/dashbroad');
                else {
                    setValue("content", un_quiz.questions);
                    dispatch(buildStartTime());
                    dispatch(buildNav());
    
                }

            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            }
        }

        if(user && token) {
            let requestData = {
                access_token: token,
                quizId: quizId,
            }
            getQuiz(requestData);
        }
    }, [user, quizId]);

    return (
        <Layout className="quiz">
            <Layout.Content className="quiz-layout-content">
                <h2>{quiz?.title}</h2>
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