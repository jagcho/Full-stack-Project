import React from "react";
import "../index.css"

const Login = ()=>{
 
    return (

        <div className="form">
            <div className="form-body">
                <h1>Log In</h1>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input type="email" id="email" className="form__input" placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password" id="password" placeholder="Password" />
                </div>

            </div>
            <div class="footer">
                <button type="submit" class="btn"> Login</button>
                <button type="submit" class="btn"><a href="Register" > Register </a></button>
            </div>
        </div>
    )
    
}

export default Login