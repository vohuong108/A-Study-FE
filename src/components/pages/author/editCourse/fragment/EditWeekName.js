import React, { useState, useEffect, useContext } from 'react'
import './EditWeekName.scss'
import { Input, Button, Row, Col } from 'antd'
import { EditWeekContext } from '../editWeek/EditWeek'

const EditWeekName = ({ title }) => {
    const [focused, setFocused] = useState(false);
    const [content, setContent] = useState('');
    const [change, setChange] = useState(false);
    const weekContext = useContext(EditWeekContext);
    useEffect(() => {
        setContent(title);
    }, [title])

    const handleSave = () => {
        weekContext.setWeekData({
            ...weekContext.weekData,
            weekTitle: content,
        })
        setChange(false);
    }
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
