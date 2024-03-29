import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { EditFilled } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import TextEditor from './TextEditor'
import VideoEditor from './VideoEditor'
import QuizEditor from './QuizEditor'

const EditLecture = ({ data }) => {
    const [visible, setVisible] = useState(false);
    
    return (
        <div className="edit-lecture">
            <Button className="tb-btn edit-btn" onClick={() => setVisible(true)} ><EditFilled />Edit</Button>
            <Drawer
                placement='top'
                height="90vh"
                title={
                <div className="title-draw">
                    <p>Edit lecture {data?.contentType}</p>
                </div>}
                visible={visible}
                onClose={() => setVisible(false)}
            >
            {data?.contentType === 'TEXT' && <TextEditor action={{type: 'EDIT', data: data}} setVisible={setVisible} />}
            {data?.contentType === 'VIDEO' && <VideoEditor action={{type: 'EDIT', data: data}} setVisible={setVisible} />}
            {data?.contentType === 'QUIZ' && <QuizEditor action={{type: 'EDIT', data: data}} setVisible={setVisible} />}
            </Drawer>
        </div>
    )
}

export default EditLecture
