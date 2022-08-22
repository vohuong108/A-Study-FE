import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { renameWeek } from '../../../../../features/course/currentCourse/courseAction';

import './EditWeekName.scss';

import { Input, Button, Row, Col, message } from 'antd';


const EditWeekName = ({ title, weekId, courseId}) => {
    const [focused, setFocused] = useState(false);
    const [content, setContent] = useState('');
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();

    const handleSave = async () => {
        const result = await dispatch(renameWeek({ weekId: weekId, courseId: courseId, name: content }));
        setChange(false);

        if(result?.error) {
            message.error({
                content: result.payload.data,
                style: {marginTop: '72px'},
                key: "enroll-msg"
            })
        }
            
    }

    useEffect(() => {
        if(title) {
            setContent(title);
        }
    }, [title])

    return (
        <div className="edit-week-name">
            <Row className="e-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24}  sm={20}>
                    <Input 
                        bordered={focused}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setChange(true);
                        }}
                    />
                </Col>
                <Col xs={24}  sm={4}>
                    <Button
                        shape="round" 
                        className={`ewn-btn ${change && 'ewn-btn-act'}`}
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default EditWeekName
