import React from 'react'
import "./user.scss"
import {PermIdentity,CalendarToday,LocalPhone, AttachEmail,LocationOn} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getToken } from '../../../../utils/localStorageHandler'
import { changeInformation } from '../../../../features/authentication/userAction';
import { message } from 'antd'
//import { changeInformation } from '../../../../features/authentication/userAction';
//import { changeInformation} from '../../../../features/authentication/userAction'
export default function User() {

    const user = useSelector(state => state.user.userObj);
    const {handleSubmit: handleSubmitInfo, register: registerInfo} = useForm();
    const dispatch = useDispatch();
    
    const onSubmitInfo = async (data) => {
        let token = getToken();

        

        if(token && user) {
            let requestData = {access_token: token, data: {username: user.username, ...data}};
            console.log("change data: ", requestData);
            message.loading({ content: 'Change Info Loading...', key: "change-info-msg" });
            try {
                const result = await dispatch(changeInformation(requestData));

                console.log("result in change: ", result);
                message.success({
                    content: "Change information successfully",
                    style: {marginTop: '72px'},
                    key: "change-info-msg"
                })
            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "change-info-msg"
                })
            }
        }

    }

    return (
        <div className="User">
            {/* <div className="userTitleContainer">
               
                <span></span>
                
            </div> */}
            <div className="userContainer">
                <div className="userShow">
                    <div className="userTop">
                        <img className="userShowImg" src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_517194189_373099.jpg" alt="" />
                        <div className="userShowTitle">
                        <span className="userShowUserName">nguyen van a</span>
                        <span className="userShowUserTitle">sinh vien</span>
                        </div>                    
                    </div>
                   
                    <div className="userBottom">
                        <span className="userShowTitle"> Account Detail</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userIcon"/>
                            <span className="userShowInfoTitle">abc234234</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userIcon"/>
                            <span className="userShowInfoTitle">31-10-2001</span>
                        </div>
                        <span className="userShowTitle"> Contact Detail</span>
                        <div className="userShowInfo">
                            <LocalPhone className="userIcon"/>
                            <span className="userShowInfoTitle">0245234523</span>
                        </div>
                        <div className="userShowInfo">
                            < AttachEmail className="userIcon"/>
                            <span className="userShowInfoTitle">emaasdasdl@gamil,com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationOn className="userIcon"/>
                            <span className="userShowInfoTitle">address</span>
                        </div>
                    </div>
                </div>

                //update profile
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit Profile</span>
                    <form className="userUpdateForm" onSubmit={handleSubmitInfo(onSubmitInfo)}>
                        <div className="userUpdateLeft">
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">UserName</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name"  disabled value={user?.username}/>
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">First Name</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" defaultValue={user?.firstName} {...registerInfo("firstName")}/>
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">Last Name</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" defaultValue={user?.lastName} {...registerInfo("lastName")}/>
                             </div>
                             <div className="userUpdateItem">
                                <label className="lable" htmlFor="level-select">Level</label>
                                <select id="level-select">
                                    <option value="">--Please choose an option--</option>
                                    <option value="admin">Amin</option>
                                    <option value="author">Author</option>
                                    <option value="student">Student</option>
                                </select>
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable">Email</label>
                                 <input type="text" className="userUpdateInput" placeholder="New  Email" disabled value={user?.email}/>
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">Phone</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Phone Number" defaultValue={user?.phone} {...registerInfo("phone")} />
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">Address</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Address" defaultValue={user?.address} {...registerInfo("address")}/>
                             </div>
                        </div>

                        <div className="userUpdateRight">
                        <input type="submit" className="userUpdateButton" value="Save" />
                            {/* <button className="userUpdateButton">Upload</button> */}
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
