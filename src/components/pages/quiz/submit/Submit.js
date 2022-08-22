import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getOverviewQuizSubmit } from '../../../../features/submit/submitAction';

import './Submit.scss';

import { Layout, Table, Card, message, Col, Tag } from 'antd';
import { Link, Switch, useParams, useRouteMatch, Route } from 'react-router-dom';
import Review from '../review/Review';


const Submit = ({ history }) => {
    const { quizId } = useParams();
    let { url, path } = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const overviewSubmit = useSelector(state => state.submit.overviewSubmit);
    const dispatch = useDispatch();

    useEffect(() => {

        const getOverview = async () => {
            let response = await dispatch(getOverviewQuizSubmit({ quizId }));

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
            getOverview();
        }
    }, [user, quizId]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        {
            title: 'Time',
            className: 'submit-table-time',
            dataIndex: 'finishTime',
            align: 'center',
            width: 180,

            render: (time) => {
                return moment.utc(time).local().format("HH:mm:ss, DD-MM-yyyy");
            }
        },
        {
            title: 'Score',
            className: 'submit-table-score',
            dataIndex: 'grade',
            align: 'center',
        },
        {
            title: 'State',
            className: 'submit-table-state',
            dataIndex: 'state',
            align: 'center',
        },
        {
            title: 'Review',
            className: 'submit-table-review',
            align: 'center',
            render: (_, record) => <Link to={`${url}/review/${record.id}`}>Review</Link>
        }
    ];

    return (
        <Switch>
            <Route path={`${path}/review/:submitId`}>
                <Review name={overviewSubmit?.quizName} history={history}/>
            </Route>
            <Route path={path}>
                <Layout className="submit-layout">
                    <Layout.Content className="submit-layout-content">
                        <h1>{overviewSubmit?.quizName}</h1>
                        <Layout className="submit-layout-list-degree">
                                <Col xs={24} sm={24} xl={18} style={{ padding: '1rem'}}>
                                    <Table 
                                        className="quiz-table"
                                        columns={columns}
                                        dataSource={overviewSubmit?.submits}
                                        title={() => 'List Submitted'}
                                        pagination={false}
                                        rowKey={(record) => record.id}
                                        scroll={{ x: 1000}}
                                    />
                                </Col>
                                <Col xs={24} sm={24} xl={6} style={{ padding: '1rem'}}>
                                    <Card 
                                        className="quiz-card" 
                                        title="State Quiz" 
                                        bordered={false}

                                    >
                                        <p>Difficulty:&nbsp;
                                            {overviewSubmit?.degree === "EASY" && <Tag color="#4dbd74">Easy</Tag>}
                                            {overviewSubmit?.degree === "MEDIUM" && <Tag color="#e9e31c">Medium</Tag>}
                                            {overviewSubmit?.degree === "HARD" && <Tag color="#f86c6b">Hard</Tag>}
                                        </p>
                                        <p>Max Score: {overviewSubmit?.maxScore}</p>
                                        <p>Number of submissions: {overviewSubmit?.numOfSub}</p>
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
