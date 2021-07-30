import React, { useState } from 'react'
import './QuizItem.scss'
import { Controller } from "react-hook-form";
import { Radio, Space, Tag, Card, Row, Col } from 'antd';

const QuizItem = ({ data, control, setMarks, review }) => {

    return (
        <>
        {data && 
            <div className="quiz-item">
                <Row>
                    <Col xs={24} sm={24} xl={4}>
                        <Card className="card-frag">
                            <h4>{`Question ${data.id}`}</h4>
                            <Tag color="cyan" style={{marginBottom: '0.5rem'}}>{`${data.point} Point`}</Tag>
                            {(review && data.isCorrect) ? <Tag color="#87d068">Correct</Tag> : ''}
                            {(review && !data.isCorrect) ? <Tag color="#f50">Uncorrect</Tag> : ''}
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} xl={20}>
                        <Card
                            className="card-question"
                            title={data.title} 
                            bordered={false}
                        >
                        {(data.type === 'one')
                            ? <OneAnswer review={review} userChoice={data.userChoice} idQuestion={data.id} control={control} choices={data.choices} setMarks={setMarks}/> 
                            : <ManyAnswer review={review} userChoices={data.userChoices} idQuestion={data.id} control={control} choices={data.choices} setMarks={setMarks}/>
                        }

                        </Card>
                    </Col>

                </Row>
            </div>
        }
        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    if (prevProps.data != nextProps.data || prevProps.control != nextProps.control) return false;
    else return true;
}

export default React.memo(QuizItem, areEqual);


const ManyAnswer = ({ control, choices, idQuestion, setMarks, review, userChoices }) => {
    let obj = choices.reduce((acc, choice) => {
        acc[choice.idChoice] = undefined;
        return acc;
    }, {});

    const [listAns, setListAns] = useState(obj);
    
    const handleChoose = (ans, onChange) => {
        let newObj = {...listAns};

        if (listAns[ans] === undefined) newObj[ans] = ans;
        else newObj[ans] = undefined;
        
        onChange({...newObj});
        setListAns({...newObj});
        setMarks({
            type: 'MARK',
            idQuestion: idQuestion
        })
        
    }

    return (
        <>
            <p>Select many:</p>
            {!review ? (
                <Controller
                    control={control}
                    name={`${idQuestion}`}
                    render={({ field: { onChange, value } }) => (
                        <Space direction="vertical">
                        {choices.map((choice, index) => (
                            <Radio.Group
                                key={index} 
                                value={value ? value[choice.idChoice] : undefined}
                            >
                                <Radio onClick={(e) => handleChoose(e.target.value, onChange)} value={choice.idChoice}>{choice.value}</Radio>
                            </Radio.Group>
                        ))}
                        </Space>
                        
                    )}
                />
            ) : (
                <Space direction="vertical">
                {choices.map((choice, index) => (
                    <Radio.Group
                        key={index} 
                        disabled
                        defaultValue={userChoices.includes(choice.idChoice) ? choice.idChoice : null}
                    >
                        <Radio value={choice.idChoice}>{choice.value}</Radio>
                    </Radio.Group>
                ))}
                </Space>
            )}

            
        </>
    )
}

const OneAnswer = ({ control, choices, idQuestion, setMarks, review, userChoice }) => {

    const handleChoose = (ans, onChange) => {
        onChange(ans);
        setMarks({
            type: 'MARK',
            idQuestion: idQuestion
        })
    }

    return (
        <>
            <p>Select one:</p>
            {!review ? (
                <Controller
                    control={control}
                    name={`${idQuestion}`}
                    render={({ field: { onChange, value } }) => (
                        <Radio.Group value={value} onChange={(e) => handleChoose(e.target.value, onChange)}>
                            <Space direction="vertical">
                                {choices.map(choice => (
                                    <Radio key={choice.idChoice} value={choice.idChoice}>{choice.value}</Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                />
            ) : (
            <Radio.Group disabled defaultValue={userChoice} >
                <Space direction="vertical">
                    {choices.map(choice => (
                        <Radio key={choice.idChoice} value={choice.idChoice}>{choice.value}</Radio>
                    ))}
                </Space>
            </Radio.Group>)
        
        }
        </>
    )
}