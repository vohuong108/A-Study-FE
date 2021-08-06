import React, { useState } from 'react'
import { Input, Button, Row, Col } from 'antd'
import './EditWeekName.scss'

const EditWeekName = ({ title }) => {
    const [focused, setFocused] = useState(false);
    const [content, setContent] = useState(title);
    const [change, setChange] = useState(false);
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
                        type="primary" shape="round" 
                        className={`ewn-btn ${change && 'ewn-btn-act'}`}
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default EditWeekName
