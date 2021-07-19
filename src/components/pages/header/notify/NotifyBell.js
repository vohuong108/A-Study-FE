import React from 'react'
import 'antd/dist/antd.css';
import { BellOutlined } from '@ant-design/icons';

const NotifyBell = () => {
    return (
        <div className="notify-bell" style={{ marginLeft: '1.2rem', display: 'flex', alignItems: 'center'}}>
            <BellOutlined style={{fontSize: '1.6em'}}/>
        </div>
    )
}

export default NotifyBell
