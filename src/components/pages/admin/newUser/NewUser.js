import React from 'react'
import './newuser.scss'
export default function NewUser() {
        


    return (
        <div className="NewUser">
            <h1 className="newUserTitle">Welcom to our Course! </h1>
                <form className="newUserForm">
                    
                    <div className="newUserItem">
                        <lable className="Lable">FullName</lable>
                        <input className="newUserInput" type="text" ></input>
                    </div>
                    <div className="newUserItem">
                        <lable className="Lable">UserName</lable>
                        <input className="newUserInput" type="text" ></input>
                    </div>
                    
                    <div className="newUserItem">
                    <lable className="Lable">Date of birth</lable>
                        <input className="newUserInput" type="date" ></input>
                    </div>
                    <div className="newUserItem">
                    <lable className="Lable">Password</lable>
                        <input className="newUserInput" type="password" ></input>
                    </div>
                    <div className="newUserItem">
                        <lable className="Lable">Phone Number</lable>
                        <input className="newUserInput" type="text" ></input>
                    </div>
                    
                    
                    <div className="newUserItem">
                        <lable className="Lable">Email</lable>
                        <input className="newUserInput" type="email" ></input>
                    </div>
                    <div className="newUserGender newUserItem" >
                    <lable className="Lable">Gender</lable>
                        <input className="male" type="radio" name="gender" id="male" value="male"/>
                        <lable className="Lable GenderLable" for="male"> Male</lable>
                        <input type="radio" name="gender" id="female" value="female"/>
                        <lable className="Lable GenderLable" for="male"> Female</lable>
                    </div>
                    <div className="newUserItem">
                        <lable className="Lable">Address</lable>
                        <input className="newUserInput" type="text" ></input>
                    </div>
                    <button className="newUserButton"> Create</button>
                </form>
        </div>
    )
}
