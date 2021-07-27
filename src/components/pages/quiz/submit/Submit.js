import React from 'react'
import './Submit.scss'
import { Layout, Table, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
const { Content } = Layout;


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Time',
        className: 'submit-table-time',
        dataIndex: 'time',
        align: 'left',
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
        render: () => <Link to="/">Review</Link>
    }
  ];
  
  const data = [
    {
      key: '1',
      id: 1,
      time: 'Wed, 12 May 2021, 10:44 AM',
      score: 100,
      state: 'Finished'
    },
    {
      key: '2',
      id: 2,
      time: 'Wed, 12 May 2021, 10:44 AM',
      score: 90,
      state: 'Finished'
    },
    {
      key: '3',
      id: 3,
      time: 'Wed, 12 May 2021, 10:44 AM',
      score: 80,
      state: 'Finished'
    },
  ];


const Submit = () => {
    return (
        <Layout className="submit-layout">
            <Content style={{ padding: '0 50px' }}>
                <h1>Recomendation system quiz</h1>
                <Layout className="submit-layout-list-degree">
                        <Col xs={24} sm={24} xl={18} style={{ padding: '15px'}}>
                            <Table 
                                className="quiz-table"
                                columns={columns}
                                dataSource={data}
                                title={() => 'List Submitted'}
                                pagination={false}
                            />
                        </Col>
                        <Col xs={24} sm={24} xl={6} style={{ padding: '15px'}}>
                            <Card 
                                className="quiz-card" 
                                title="State Quiz" 
                                bordered={false}

                            >
                                <p>Difficulty: </p>
                                <p>Max Score: </p>
                                <p>Number of submissions: </p>
                            </Card>

                        </Col>
                    

                </Layout>
            </Content>
        </Layout>
    )
}

export default Submit
