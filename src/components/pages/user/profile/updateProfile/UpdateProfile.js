import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { changeInformation, changePassword} from '../../../../../features/user/userAction';
import { getToken } from '../../../../../utils/localStorageHandler';

import './UpdateProfile.scss';
import { message } from 'antd';

const UpdateProfile = () => {
    
    return (
        <div className="u-profile">
            <ChangeInfo />
            <ChangePass />
        </div>
    )
}

const ChangePass = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);
    const {
        handleSubmit: handleSubmitPass, 
        register : registerPass, 
        setError,
        formState: { errors }
    } = useForm();
    

    const onSubmitPass = async (data) => {
        let token = getToken("access_token");

        if(data.confirmPass !== data.newPass) {
            console.log("Confirm pass don't match new pass !!!!");

            setError("confirmPass", {
                type: "manual",
                message: "Confirm password don't match"
            }, { shouldFocus: true });

        } else if(token && user) {
            message.loading({ content: 'Change Password Loading...', key: "change-pass-msg" });

            const result = await dispatch(changePassword({
                password: data.oldPass,
                newPass: data.newPass
            }));

            console.log(result)

            if(result?.error) {
                message.error({
                    content: result.payload.message,
                    style: {marginTop: '72px'},
                    key: "change-pass-msg"
                })
            } else {
                message.success({
                    content: "Change password successfully",
                    style: {marginTop: '72px'},
                    key: "change-pass-msg"
                })
            }
        }
    }

    return (
        <div className="u-section change-password">
            <div className="u-header">
                <p>Change Password</p>
            </div>
            <div className="u-change-wrap">
                <form id="form-change" onSubmit={handleSubmitPass(onSubmitPass)}>
                    <div className="form-item">
                        <label>Old Password</label>
                        <input type="password" {...registerPass("oldPass", { required: "Please enter your old password." })}/>
                    </div>
                    {errors.oldPass && <p className="err-msg">{errors.oldPass.message}</p>}
                    <div className="form-item">
                        <label>New Password</label>
                        <input type="password" {...registerPass("newPass", { required: "Please enter your new password." })}/>
                    </div>
                    {errors.newPass && <p className="err-msg">{errors.newPass.message}</p>}
                    <div className="form-item">
                        <label>Confirm Password</label>
                        <input name="confirmPass" type="password" {...registerPass("confirmPass", { required: "Please enter your confirm password." })}/>
                    </div>
                    {errors.confirmPass && <p className="err-msg">{errors.confirmPass.message}</p>}
                    <input type="submit" value="Save" />
                </form>
            </div>

        </div>
    )
}

const ChangeInfo = () => {
    const user = useSelector(state => state.user.userObj);

    const {handleSubmit: handleSubmitInfo, register: registerInfo, setValue} = useForm();
    const dispatch = useDispatch();

    console.log("[ChangeInfo] Re-render");

    useEffect(() => {
        if(user) {
            setValue("firstName", user?.profile?.firstName || "");
            setValue("lastName", user?.profile?.lastName || "");
            setValue("phone", user?.profile?.phone || "");
            setValue("address", user?.profile?.address || "");
        }
    }, [user])

    const onSubmitInfo = async (data) => {

        if(user) {
            console.log("change data: ", {...user.profile, ...data});
            message.loading({ content: 'Change Info Loading...', key: "change-info-msg" });
            
            const result = await dispatch(changeInformation({...user.profile, ...data}));

            if(result?.error) {
                message.error({
                    content: result.error.message,
                    style: {marginTop: '72px'},
                    key: "change-info-msg"
                })
            } else {
                message.success({
                    content: "Change information successfully",
                    style: {marginTop: '72px'},
                    key: "change-info-msg"
                })
            }
        }

    }
    return (
        <div className="u-section u-personal">
            <div className="u-header">
                <p>Personal Information</p>
            </div>
            <div className="u-personal-wrap">
                <form id="form-personal" onSubmit={handleSubmitInfo(onSubmitInfo)}>
                    <div className="form-item">
                        <label>User Name</label>
                        <input type="text" disabled value={user?.username || ""} />
                    </div>
                    <div className="form-item">
                        <label>Email</label>
                        <input type="email" disabled value={user?.email || ""} />
                    </div>
                    <div className="form-item">
                        <label>First Name</label>
                        <input type="text" {...registerInfo("firstName")}/>
                    </div>
                    <div className="form-item">
                        <label>Last Name</label>
                        <input type="text" {...registerInfo("lastName")}/>
                    </div>
                    <div className="form-item">
                        <label>Phone Number</label>
                        <input type="text" {...registerInfo("phone")} />
                    </div>
                    <div className="form-item">
                        <label>Address</label>
                        <input type="text" {...registerInfo("address")}/>
                    </div> 
                                           
                    <input type="submit" value="Save" />
                </form>
                </div>
            </div>
    
    )
}

export default UpdateProfile
