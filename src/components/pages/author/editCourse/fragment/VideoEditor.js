import React, { useState, useContext } from 'react'
import { Upload, Tag } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { useForm, Controller  } from "react-hook-form"
import './VideoEditor.scss'
import { EditWeekContext } from '../editWeek/EditWeek'

const VideoEditor = () => {
    console.log('re-render in video editor')
    const { register, control, handleSubmit } = useForm();
    const weekContext = useContext(EditWeekContext)

    const onSubmit = data => {

        let videoLecture = {
            idLecture: weekContext.weekData.lectures.length,
            content: data.video,
            type: 'video',
            name: data.video_name,
            status: data.status,
        }
        
        weekContext.setWeekData({
            ...weekContext.weekData,
            lectures: [...weekContext.weekData.lectures, videoLecture]
        })
    }
    
    return (
        <form id="form-video" className="video-editor" onSubmit={handleSubmit(onSubmit)}>
            <div className="video-title">
                <p>Lecture Title: </p>
                <input type="text" {...register("video_name")} required></input>
            </div>
            <Controller
                name="video"
                control={control}
                rules={{ required: true }}
                render={({ field }) => 
                    <Upload.Dragger 
                        name='file'
                        multiple={false}
                        maxCount={1}
                        accept=".mp4"
                        beforeUpload={video => {
                            console.log("call in before")
                            field.onChange(video);
                            return false;
                        }}
                        onChange={(info) => field.onChange(info.file)}
                        onRemove={() => {
                            console.log("call in remove")
                            field.onChange(null);
                            return true;
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag video to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single upload.</p>
                    </Upload.Dragger>

                }
            />
            <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                defaultValue="private"
                render={({ field }) => 
                    <Switch 
                        className="status-switch"
                        checkedChildren="publish" 
                        unCheckedChildren="private" 
                        onChange={(checked) => checked ? field.onChange('publish') : field.onChange('private')}
                    />
                }
            />
            <Button htmlType="submit" type="primary" shape="round" className="v-editor-save">Save</Button>
        </form>
    )
}

export default VideoEditor
