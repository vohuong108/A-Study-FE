import React from 'react'
import "./user.scss"
import {PermIdentity,CalendarToday,LocalPhone, AttachEmail,LocationOn} from '@mui/icons-material';
export default function User() {
    return (
        <div className="User">
            <div className="userTitleContainer">
                {/* <h1 className="userTitle"> Edit user</h1> */}
                <span></span>
                {/* <Link to="/admin/newUser"><button className="userAddButton">create</button></Link> */}
            </div>
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
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit Profile</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">UserName</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" />
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">Full Name</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" />
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable">Email</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" />
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">Phone</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" />
                             </div>
                             <div className="userUpdateItem">
                                 <label className="lable" htmlFor="">Address</label>
                                 <input type="text" className="userUpdateInput" placeholder="New Account Name" />
                             </div>
                        </div>

                        <div className="userUpdateRight">
                            <button className="userUpdateButton">Upload</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
