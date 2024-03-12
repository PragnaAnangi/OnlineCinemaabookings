import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './UserRegistrationStyle.css'; 
// import cinema from './cinema.jpeg';

function User() {
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        mobileNumber: '',
        password: '',
        cpassword:''
    });

    const [errors, setErrors] = useState({}); 

    const { firstName, lastName, emailId, mobileNumber, password ,cpassword} = register;

    const changeHandler = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};

        if (!firstName) {
            errors.firstName = 'First Name is required';
        }else if(/\d/.test(firstName)){
            errors.firstName = 'First Name is Invalid';
        } 

        if (!lastName) {
            errors.lastName = 'Last Name is required';
        }else if(/\d/.test(firstName)){
            errors.lastName = 'Last Name is Invalid';
        } 

        if (!emailId) {
            errors.emailId = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(emailId)) {
            errors.emailId = 'Invalid email format';
        }

        if (!mobileNumber) {
            errors.mobileNumber = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            errors.mobileNumber = 'Mobile Number must be 10 digits';
        }

        if (!password) {
            errors.password = 'Password is required';
        }else if(password.length<8 || password.length>16){
            errors.password = 'Password must be between  8 to 16 characters';
        }

        if (!cpassword) {
            errors.cpassword = 'Password is required';
        }else if(cpassword!==password){
            errors.cpassword='Incorrect Password';
        }

        setErrors(errors);

       
        return Object.keys(errors).length === 0;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8080/reg', register, {
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                if (response.data != null) {
                    alert("Your User Id is"+response.data)
                    navigate("/login");
                } else {
                    console.log(response);
                    alert('Registration failed');
                }
            } catch (error) {
                console.error(error);
                alert('Error occurred. Please try again later.');
            }
        }
    }

    


    return (
        <div className="regis">
            <p>User Registration</p>
        <div className="registration-container">
            
            {/* <div className="image-container">
                <img src={cinema} alt="Sign up" className="userregsign-in-image" />
            </div> */}
            <div className="form-container">
               
                <form onSubmit={submitHandler} className="registration-form">
                <div className="reg-form">
                    <label>Email:</label>
                    <input type="email" name="emailId" onChange={changeHandler} value={emailId} />
                    {errors.emailId && <div className="error">{errors.emailId}</div>}
                </div>
                <div className="reg-form">
                    <label>First Name:</label>
                    <input type="text" name="firstName" onChange={changeHandler} value={firstName} />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                </div>
                <div className="reg-form">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" onChange={changeHandler} value={lastName} />
                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                </div>
                <div className="reg-form">
                    <label>Mobile Number:</label>
                    <input type="text" name="mobileNumber" onChange={changeHandler} value={mobileNumber} />
                    {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
                </div>
                <div className="reg-form">
                    <label>Password:</label>
                    <input type="password" name="password" onChange={changeHandler} value={password} />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div className="reg-form">
                    <label>Confirm Password:</label>
                    <input type="password" name="cpassword" onChange={changeHandler} value={cpassword} />
                    {errors.cpassword && <div className="error">{errors.cpassword}</div>}
                </div>
                <br></br>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default User;
