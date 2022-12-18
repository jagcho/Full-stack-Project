import React from "react";
import "../index.css"

const Register = () => {
    return (

        <div className="form">
            <div className="form-body">
                <h1>Sign Up</h1>
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" type="text" id="firstName" placeholder="First Name" />
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input type="text" name="" id="lastName" className="form__input" placeholder="LastName" />
                </div>
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
                <button type="submit" class="btn">Register</button> <br/>
                <button type="submit" class="btn"><a href="Login" > Login </a></button>
            </div>
        </div>
    )
}



export default Register;