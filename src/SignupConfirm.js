import React, { useEffect, useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useParams } from 'react-router-dom';
// import auth from '../../services/apis/auth';

const SignupConfirm = (props) => {
    const { id } = useParams();
    console.log(id);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const data = {
            token: id,
        };
    }, []);

    if (isLoading) return null;
    return (
        <React.Fragment>
            <div className='signup-success'>
                <CheckSquareOutlined className='icon' />
                <div>
                    <Typography.Title level={3}>
                        Tài khoản của bạn đã được xác thực thành công.
                    </Typography.Title>
                    <Typography.Text>
                        Đăng nhập ngay để có thể sử dụng những dịch vụ tuyệt vời
                        nhất của chúng tôi.
                    </Typography.Text>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignupConfirm;