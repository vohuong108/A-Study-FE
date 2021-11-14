import React, { useState, useEffect } from 'react'
import './EditWeekName.scss'
import { Input, Button, Row, Col, message } from 'antd'
import { renameWeek } from '../../../../../features/course/currentCourse/courseAction'
import { getToken } from '../../../../../utils/localStorageHandler'
import { useDispatch } from 'react-redux'

const EditWeekName = ({ title, weekId, }) => {
    const [focused, setFocused] = useState(false);
    const [content, setContent] = useState('');
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();

    const handleSave = async () => {
        let access_token = getToken();
        let requestData = {
            access_token: access_token,
            data: { weekId: weekId, name: content }
        }
    
        try {
            const resultRename = await dispatch(renameWeek(requestData));
            setChange(false);

        } catch (err) {
            console.error("error in login: ", err);
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "enroll-msg"
            })
        }
    }

    useEffect(() => {
        setContent(title);
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
