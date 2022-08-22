import React, { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { doQuiz, scoringQuiz } from '../../../features/quiz/quizAction';
import { useParams } from 'react-router-dom';

import './Quiz.scss';

import { Layout, Divider, Row, Col, Button, message, Modal } from 'antd';
import QuizItem from './quizItem/QuizItem';
import QuizNav from './quizNav/QuizNav';




const Quiz = ({ history }) => {
    const { quizId } = useParams();
    const user = useSelector(state => state.user.userObj);
    const quiz = useSelector(state => state.quiz.quiz);

    const dispatch = useDispatch();
    const { control, handleSubmit, setValue } = useForm();
    const { fields } = useFieldArray({ control, name: "content" });
    

    const onSubmit = async (data) => {
        let submitData = data.content.map((content) => {
            let selectedIds = content.options.filter(opt => opt.answer === true).map(opt => opt.id);

            console.log(`question ${content.id} - ${selectedIds}`);
            return {questionId: content.id, selectedIds};
            
        });

        console.log("SUBMIT DATA: ", submitData);

        let response =  await(dispatch(scoringQuiz({
            quizId: quiz.id,
            data: {
                sessionId: quiz.sessionId,
                data: submitData
            }
        })));

        if(response?.error) {
            message.error({
                content: response.payload.message,
                style: {marginTop: '72px'},
                key: "enroll-msg"
            });

            history.goBack();
        } else {
            

            Modal.confirm({
                title: "Submit examine successfully",
                content: response.payload.message,
                onOk: () => { history.goBack(); },
                onCancel: () => { history.goBack(); }
            })

        }
    }
    

    useEffect(() => {

        const getQuiz = async () => {
            let response = await dispatch(doQuiz({ quizId }));
            console.log(response);

            if(response?.error) {
                message.error({
                    content: response.payload.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });

                history.goBack();
            }
            else {
                setValue("content", response.payload.questions);

            }
        }

        if(user) {
            getQuiz();
        }
    }, [user, quizId]);

    return (
        <Layout className="quiz">
            <Layout.Content className="quiz-layout-content">
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
                            <QuizNav handleSubmit={handleSubmit(onSubmit)} dueTime={quiz?.time} />
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