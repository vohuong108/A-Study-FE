import React, { useEffect, useState } from 'react'
import './UserDash.scss'
import ProgressCourse from '../../course/progressCourse/ProgressCourse'
import { getToken } from '../../../../utils/localStorageHandler'
import { getCourses,addCourse } from '../../../../features/course/coursesAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, Select, message, Skeleton, Input } from 'antd'
import { useForm, Controller } from "react-hook-form"
import { unwrapResult } from '@reduxjs/toolkit'

const UserDash = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.userCourses.courses);
    const loading = useSelector(state => state.userCourses.loading);
    const user = useSelector(state => state.user.userObj);
    
    useEffect(() => {
        let access_token = getToken();

        const getUserCourses = async () => {
            try {
                const courses = await dispatch(getCourses(access_token));
                
            } catch (err) {
                console.error("error in login: ", err);
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            }

        }

        getUserCourses();

    }, [])

    return (
        <div className="userDash">
            <div className="container dash-container">
                <div className="row userDash-row">
                    <div className="title">My Courses</div>
                    <Skeleton 
                        className="skt-progress" 
                        active 
                        loading={loading}
                        avatar={{shape: "square" }}
                    />
                    {courses?.map(course => 
                        <ProgressCourse key={course.courseId} data={course} permission={user?.permission}/>
                    )}
                    

                    {/*get permision from store so don't need author dash*/}
                    {/* <ProgressCourse /> */}
                    <AddNewCourse />
                </div>
            </div>            
        </div>
    )
}


const AddNewCourse = () => {
    const [visible, setVisible] = useState(false);
    const { control, handleSubmit, register, formState: { errors }} = useForm();
    const category = useSelector(state => state.user.category);
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();

    const onSubmit = async (formData) => {
        console.log(formData);
        let token = getToken();

        let requestData = {
            access_token: token, 
            data: {
                name: formData.course_name,
                author: user?.username,
                learnInfo: formData.whatLearn,
                skillInfo: formData.skills,
                category: formData.category,
                description: formData.description,
            }
        }

        console.log("request create course: ", requestData);
        try {
            message.loading({ content: 'Loading...', key: "add-msg" });
            let result = await dispatch(addCourse(requestData));
            console.log("response create course: ", unwrapResult(result));

            message.success({
                content: "Add new course successfully",
                style: {marginTop: '72px'},
                key: "add-msg"
            })
        } catch (err) {
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "add-msg"
            })
        }
    }

    return(
        <div className="add-course">
            <Button shape="round" className="btn-new-course" onClick={() => setVisible(true)}>New Course</Button>
            <Drawer
                className="add-course-drawer"
                placement='top'
                height="70%"
                title={<p className="title-add-course">Create a new course</p>}
                visible={visible}
                onClose={() => setVisible(false)}
                forceRender={true}
                destroyOnClose={true}
            >
                <form className="add-course-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="a-c-form-item">
                        <label>Course Name</label>
                        <input 
                            className="course-name" 
                            {...register("course_name")} 
                            required type="text" 
                            placeholder="Please type course name"
                        />
                    </div>
                    <div className="a-c-form-item">
                        <label>Select Category</label>
                        <Controller 
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <Select className="category-select" onChange={(value) => field.onChange(value)} >
                                    {category && category.map((ctg, index) => 
                                        <Select.Option key={index} value={ctg.name}>{ctg.name}</Select.Option>
                                    )}
                                </Select>
                            }
                        />
                    </div>
                    <div className="a-c-form-item">
                        <label>What will the student learn</label>
                        <WhatLearn control={control} errors={errors} />
                    </div>
                    <div className="a-c-form-item">
                        <label>What skills will you teach</label>
                        <Skills control={control} errors={errors} />
                    </div>
                    <div className="a-c-form-item">
                        <label>Description</label>
                        <Descrition control={control} errors={errors} />
                    </div>
                    
                    <Button htmlType="submit" className="a-c-btn-save"> Save </Button>
                </form>
            </Drawer>
        </div>
    )
}

const Descrition = ({ control, errors }) => {
    console.log("re-render in description: ", errors)
    return (
        <React.Fragment>
            <Controller 
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                    <Input.TextArea 
                        className="s-item description"
                        showCount 
                        style={{ width: '100%' }}
                        rows={4}  
                        allowClear
                        onChange={(value) => field.onChange(value)}
                    >
                        {field.value}
                    </Input.TextArea>
                }
            />
            {errors.whatLearn && <p className="err-msg">Please type this field</p>}
        </React.Fragment>
    )
}

const WhatLearn = ({ control, errors }) => {
    console.log("re-render in whatLearn: ", errors)
    return (
        <React.Fragment>
            <Controller 
                name="whatLearn"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                    <Select 
                        className="s-item what-learn-select"
                        mode="tags" 
                        style={{ width: '100%' }} 
                        placeholder="What will the student learn?" 
                        onChange={(value) => field.onChange(value)}
                    >
                        {field.value}
                    </Select>
                }
            />
            {errors.whatLearn && <p className="err-msg">Please type this field</p>}
        </React.Fragment>
    )
}

const Skills = ({ control, errors }) => {
    console.log("re-render in skills: ", errors)

    return (
        <React.Fragment>
            <Controller 
                name="skills"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                    <Select 
                        className="s-item skills-select"
                        mode="tags" 
                        style={{ width: '100%' }} 
                        placeholder="What skills will you teach?" 
                        onChange={(value) => field.onChange(value)}
                    >
                        {field.value}
                    </Select>
                }
            />
            {errors.skills && <p className="err-msg">Please type this field</p>}
        </React.Fragment>
    )
}



export default UserDash
