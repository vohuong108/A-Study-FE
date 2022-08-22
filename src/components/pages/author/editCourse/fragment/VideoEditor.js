import React, { useState, useEffect } from 'react';
import { useForm, Controller  } from "react-hook-form";
import { createLectureContent, updateLectureContent } from '../../../../../features/course/currentCourse/courseAction';
import { selectWeekByID, } from '../../../../../features/course/currentCourse/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './VideoEditor.scss';

import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import ReactPlayer from 'react-player';
import courseApi from '../../../../../api/courseApi';




const VideoEditor = ({ action, setVisible, weekId }) => {
    console.log('re-render in video editor: ', action);
    
    let { id } = useParams();
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [videoFile, setVideoFile] = useState(null);
    const dispatch = useDispatch();
    const weekRedux = useSelector(state => selectWeekByID(state,  weekId));
    
    const onSubmit = async (data) => {
        console.log('form: ', data);

        if(action && action.type === 'EDIT') {
            let requestData = {
                courseId: id,
                weekId: action.data.weekId,
                contentId: action.data.id,
                contentOrder: action.data.contentOrder,
                name: data.video_name,
                contentType: 'VIDEO',
                content: data.video,
                contentStatus: data.status
            }

            console.log(requestData);

            let result_update = await dispatch(updateLectureContent(requestData));
            setValue('video', null);
            setVisible(false);

        } else {
            let requestData = {
                courseId: id,
                weekId: weekId,
                contentOrder: weekRedux?.contents?.length || 0,
                name: data.video_name,
                contentType: 'VIDEO',
                content: data.video,
                contentStatus: data.status
            }

            let result_add = await dispatch(createLectureContent(requestData));
            setVisible(false);
        }
    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            const fetchVideoUrl = async () => {
                let response = await courseApi.getLectureContentUrl({ 
                    courseId: id, 
                    weekId: action.data.weekId, 
                    contentId: action.data.id 
                })
                console.log(response);
    
                setValue('video_name', action.data.name);
                setValue('status', action.data.contentStatus);
                setVideoFile(response.data.url);
            }

            fetchVideoUrl();
            
        }
    }, [action.type])
    
    return (
        <form id="form-video" className="video-editor" onSubmit={handleSubmit(onSubmit)}>
            <div className="video-title">
                <p>Lecture Title: </p>
                <input type="text" {...register("video_name")} required></input>
            </div>
            <ReactPlayer 
                className="react-player" 
                controls={true} 
                url={videoFile} 
                width='100%'
                height='100%'
            />
            <Controller
                name="video"
                control={control}
                rules={{ required: action.type === "EDIT" ? false : true }}
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
                        onChange={(info) => {
                            console.log("call in change: ", info)
                            
                            if (info.file?.status !== 'removed') {
                                setVideoFile(URL.createObjectURL(info.file))
                                field.onChange(info.file)
                            } else {
                                setVideoFile(null)
                                field.onChange(null)
                            }
                        }}
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
            {errors.video?.type === 'required' && <p className="err-msg">Video is required</p>}
            <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                defaultValue="PRIVATE"
                render={({ field }) => 
                    <Switch 
                        className="status-switch"
                        checkedChildren="PUBLIC" 
                        unCheckedChildren="PRIVATE" 
                        checked={field.value === "PUBLIC"}
                        onChange={(checked) => checked ? field.onChange('PUBLIC') : field.onChange('PRIVATE')}
                    />
                }
            />
            <Button htmlType="submit" type="primary" shape="round" className="v-editor-save">Save</Button>
        </form>
    )
}

export default VideoEditor
