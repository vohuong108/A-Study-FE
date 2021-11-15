import React, { useState, useEffect } from 'react';
import './VideoEditor.scss';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { useForm, Controller  } from "react-hook-form";
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../../../utils/localStorageHandler';
import { addLecture, updateLecture } from '../../../../../features/course/currentCourse/courseAction';
import { selectWeekByID, } from '../../../../../features/course/currentCourse/courseSlice';

const VideoEditor = ({ action, setVisible, weekId }) => {
    console.log('re-render in video editor: ', action);
    
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [videoFile, setVideoFile] = useState(null);
    const dispatch = useDispatch();
    const weekRedux = useSelector(state => selectWeekByID(state,  weekId));
    
    const onSubmit = async (data) => {
        console.log('form: ', data.video)

        let token = getToken();


        if(action && action.type === 'EDIT') {
            let requestData = {
                access_token: token,
                data: {
                    lectureId: action?.data?.lectureId,
                    weekId: action?.data?.weekId,
                    title: data.video_name,
                    lectureType: 'VIDEO',
                    content: data.video,
                    lectureStatus: data.status
                }
            }

            let result_update = await dispatch(updateLecture(requestData));
            setVisible(false);

        } else {
            let requestData = {
                access_token: token,
                data: {
                    weekId: weekRedux.weekId,
                    indexLecture: weekRedux?.lectures?.length,
                    title: data.video_name,
                    lectureType: 'VIDEO',
                    content: data.video,
                    lectureStatus: data.status
                }
            }

            let result_add = await dispatch(addLecture(requestData));
            setVisible(false);
        }
    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            setValue('video_name', action.data.title);
            setValue('status', action.data.lectureStatus);
            setValue('video', `http://localhost:8888/api${action.data.url}`);
            setVideoFile(`http://localhost:8888/api${action.data.url}`)
        }
    }, [action])
    
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
