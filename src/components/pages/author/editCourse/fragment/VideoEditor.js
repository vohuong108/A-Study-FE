import React, { useState, useContext, useEffect } from 'react'
import { Upload, Tag } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { useForm, Controller  } from "react-hook-form"
import './VideoEditor.scss'
import { EditWeekContext } from '../editWeek/EditWeek'
import ReactPlayer from 'react-player'

const VideoEditor = ({ action, setVisible }) => {
    console.log('re-render in video editor')
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();
    const weekContext = useContext(EditWeekContext);
    const [videoFile, setVideoFile] = useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    

    const onSubmit = async (data) => {
        console.log('form: ', data.video)

        let video64 = await toBase64(data.video);

        let videoLecture = {
            idLecture: action?.type === 'EDIT' ? action.data.idLecture : weekContext.weekData.lectures.length,
            content: data.video,
            type: 'video',
            name: data.video_name,
            status: data.status,
            
        }

        if(action && action.type === 'EDIT') {
            let deepCloneWeekData = JSON.parse(JSON.stringify(weekContext.weekData));

            const index = deepCloneWeekData.lectures.findIndex((item) => action.data.idLecture === item.idLecture)

            if(index > -1) deepCloneWeekData.lectures[index] = videoLecture;

            weekContext.setWeekData({...deepCloneWeekData});

        } else {
            weekContext.setWeekData({
                ...weekContext.weekData, 
                lectures: [...weekContext.weekData.lectures, videoLecture]
        
            })
            setVisible(false);
        }
    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            setValue('video_name', action.data.name);
            setValue('status', action.data.status);
            setValue('video', action.data.content);
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
                defaultValue="private"
                render={({ field }) => 
                    <Switch 
                        className="status-switch"
                        checkedChildren="publish" 
                        unCheckedChildren="private" 
                        checked={field.value === "publish"}
                        onChange={(checked) => checked ? field.onChange('publish') : field.onChange('private')}
                    />
                }
            />
            <Button htmlType="submit" type="primary" shape="round" className="v-editor-save">Save</Button>
        </form>
    )
}

export default VideoEditor
