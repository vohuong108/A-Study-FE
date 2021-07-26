import React from 'react'
import { Typography, Divider } from 'antd'
import 'antd/dist/antd.css'
import './LectureReading.scss'

const LectureReading = () => {
    return (
        <Typography className="lecture-reading">
            <Typography.Title>
                Getting started with Python, Jupyter Notebook & Turi Create
            </Typography.Title>

            <Typography.Paragraph>
                It's important to emphasize that this specialization is not about providing training for a specific software package. The goal of the specialization is for your effort to be spent on learning the fundamental concepts and algorithms behind machine learning in a hands-on fashion. These concepts transcend any single package. What you learn here you can use whether you write code from scratch, use any existing ML packages out there, or any that may be developed in the future.
            </Typography.Paragraph>
            <Typography.Paragraph>
                The learning approach in this specialization is to start from use cases and then dig into algorithms and methods, what we call a case-studies approach. We are very excited about this approach, since it has worked well in several other courses.  The first course is focused on understanding how ML can be used in various cases studies, and the follow on courses will dig into the details of algorithms and methods for each of the main ML areas.  In the first course, you will not be implementing algorithms from scratch, but rather building intelligent applications that use ML. In the subsequent course, we will be implementing and comparing a wide range of algorithms.  To make it easy to implement the use cases we will be covering, we are recommending a particular set of software tools, but you can successfully complete the course with other tools out there.
            </Typography.Paragraph>

            <Divider />
            
            <Typography.Title level={2}>Why Python</Typography.Title>
            <Typography.Paragraph>
                In this course, we are going to use the Python programming language to build several intelligent applications that use machine learning.  Python is a simple scripting language that makes it easy to interact with data.  Furthermore, Python has a wide range of packages that make it easy to get started and build applications, from the simplest ones to the most complex.  Python is widely used in industry, and is becoming the de facto language for data science in industry.  (R is another alternative language. However, R tends to be significantly less scalable and has very few deployment tools, thus it is seldom used for production code in industry.  It is possible, but highly discouraged to use R in this specialization.) 
            </Typography.Paragraph>
            <Typography.Paragraph>
                We will also use the Jupyter Notebook in our videos.  The Jupyter Notebook is a simple interactive environment for programming with Python, which makes it really easy to share your results.  Think about it as a combination of a Python terminal and a wiki page.  Thus, you can combine code, plots and text to explain what you did.  (You are not required to use Jupyter Notebook in the assignments, and should have no problem using straight up Python if you prefer.)
            </Typography.Paragraph>

        </Typography>
    )
}

export default LectureReading
