import React, { useEffect } from 'react'
import './Submit.scss'
import { Layout, Table, Card, Row, Col, Tag } from 'antd'
import { Link, Switch, useParams, useRouteMatch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { getSubmitByID } from '../../../../features/submit/submitAction'
import { getToken } from '../../../../utils/localStorageHandler'
import Review from '../review/Review'


const Submit = ({ history }) => {
    const { idQuiz } = useParams();
    let { url, path } = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const quiz = useSelector(state => state.submit.quiz);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = getToken();

        const getSubmit = async (requestData) => {
            let submit = await dispatch(getSubmitByID(requestData));
        }

        if(user && token) {
            let requestData = {
                access_token: token,
                idQuiz: idQuiz
            }
            getSubmit(requestData);
        }
    }, [user, idQuiz]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'idSub',
        },
        {
            title: 'Time',
            className: 'submit-table-time',
            dataIndex: 'finishTime',
            align: 'left',
            render: (time) => {
                let date = new Date(time);
                let convertedDate = date.toGMTString();
                return convertedDate;
            }
        },
        {
            title: 'Score',
            className: 'submit-table-score',
            dataIndex: 'score',
        },
        {
            title: 'State',
            className: 'submit-table-state',
            dataIndex: 'state',
        },
        {
            title: 'Review',
            className: 'submit-table-review',
            render: (_, record) => <Link to={`${url}/review/${record.idSub}`}>Review</Link>
        }
    ];

    return (
        <Switch>
            <Route path={`${path}/review/:idSub`}>
                <Review name={quiz?.name} history={history}/>
            </Route>
            <Route path={path}>
                <Layout className="submit-layout">
                    <Layout.Content style={{ padding: '0 50px' }}>
                        <h1>{quiz?.name}</h1>
                        <Layout className="submit-layout-list-degree">
                                <Col xs={24} sm={24} xl={18} style={{ padding: '15px'}}>
                                    <Table 
                                        className="quiz-table"
                                        columns={columns}
                                        dataSource={quiz?.submissions}
                                        title={() => 'List Submitted'}
                                        pagination={false}
                                        rowKey={(record) => record.idSub}
                                    />
                                </Col>
                                <Col xs={24} sm={24} xl={6} style={{ padding: '15px'}}>
                                    <Card 
                                        className="quiz-card" 
                                        title="State Quiz" 
                                        bordered={false}

                                    >
                                        <p>Difficulty:&nbsp;
                                            {quiz?.difficulty === "easy" && <Tag color="#4dbd74">Easy</Tag>}
                                            {quiz?.difficulty === "medium" && <Tag color="#e9e31c">Medium</Tag>}
                                            {quiz?.difficulty === "hard" && <Tag color="#f86c6b">Hard</Tag>}
                                        </p>
                                        <p>Max Score: {quiz?.maxScore}</p>
                                        <p>Number of submissions: {quiz?.numOfSub}</p>
                                    </Card>

                                </Col>
                            

                        </Layout>
                    </Layout.Content>
                </Layout>
            </Route>
        </Switch>
    )
}

export default Submit
