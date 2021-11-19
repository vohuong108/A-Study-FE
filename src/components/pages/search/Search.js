import React, { useState, useEffect } from 'react'
import './Search.scss'
import 'antd/dist/antd.css';
import { Layout, Row, Divider, Col, Button, Rate, Statistic, Drawer, Skeleton } from 'antd'
import { FilterFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Filter from './filter/Filter'
import { useSelector, useDispatch } from 'react-redux'
import { searchCourse } from '../../../features/search/searchAction'
import qs from 'query-string'
import CourseLogo from '../../../assets/course-logo.jpg'

const Search = ({ location}) => {
    const [slideVisible, setSlideVisible] = useState(false);
    const searchData = useSelector(state => state.search.data);
    const loading = useSelector(state => state.search.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        const search = async (requestData) => {
            let result = await dispatch(searchCourse(requestData));
        }

        if(location.search) {
            search({
                params: qs.parse(location.search)
            });
        }

    }, [location.search])

    return (
        <Layout className="search-layout">
            <section className="search-header">
                <Layout.Content className="search-content s-header">
                    <h1 className="num-result">{`Showing ${searchData?.length} total results`}</h1>
                    <div className="filter">
                        <Button 
                            className="btn-filter"
                            onClick={() => setSlideVisible(!slideVisible)}
                            icon={<FilterFilled/>}
                        >
                            Filter By
                        </Button>
                    </div>
                </Layout.Content>
            </section>
            <section className="search-body">
                <Layout className="search-content s-body">
                    <Layout.Sider 
                        className="filter-slide" 
                        collapsible 
                        collapsed={slideVisible} 
                        collapsedWidth={0} 
                        zeroWidthTriggerStyle={{width: '0'}}
                    >
                        <Filter />
                    </Layout.Sider>
                    <Layout.Content className="s-body-content">
                    {loading ? <Skeleton active loading={loading} /> : (
                        <>
                        {searchData?.map((course, index) => <SearchedCourse key={index} data={course} />)}
                        </>
                    )}

                    </Layout.Content>
                </Layout>
            </section>
            <Drawer
                className="filter-drawer"
                title={`${searchData?.totalResult} Results`}
                placement="right"
                width={280}
                onClose={() => setSlideVisible(false)}
                visible={slideVisible}
            >
               <Filter />
            </Drawer>
        </Layout>
    )
}

const SearchedCourse = ({ data }) => {
    return (
    <div className="search-course">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={6} className="col-img">
                <Link to={`/search/course/${data?.courseId}`}>
                    <img src={CourseLogo} alt=""/>
                </Link>
            </Col>
            <Col span={18} className="col-info">
                <div className="info-wrap">
                    <Link to={`/search/course/${data?.courseId}`}>
                        {/* <h3 className="s-course-name">Web Design for Everybody: Basics of Web Developer & Coding</h3> */}
                        <h3 className="s-course-name">{data?.name}</h3>
                    </Link>
                    {/* <span className="s-course-author">University of Michigan</span> */}
                    <span className="s-course-author">{data?.author}</span>
                    {/* <div className="s-course-quality">
                        <div className="quality-left">
                            <Rate disabled allowHalf defaultValue={data?.rate} className="course-rate"/>
                            <span className="rate-ratio">{data?.rate}</span>
                            <span className="num-rate">({data?.numRate})</span>
                        </div>
                        <Statistic className="numStudent" value={data?.numStudent} prefix={<i className="fas fa-user-graduate"/>} />
                    </div> */}
                </div>
            </Col>
        </Row>
        <Divider />

    </div>
    )
}


export default Search;

