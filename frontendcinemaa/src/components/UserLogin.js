import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './UserLoginStyle.css'; 
import UserLoginImage from './UserLoginImage.png';

function UserLogin() {
  const [loginID, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 

  const changeHandler1 = (e) => {
    setUser(e.target.value);
  }

  const changeHandler2 = (e) => {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8080/userLogin'; 

  const validateForm = () => { 
    const errors = {};

    if (!loginID) {
      errors.loginID = "UserId is required";
      
    }
   

    if (!password) {
      errors.password = "Password is required";
     
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(apiUrl, null, {
          params: {
            loginID:loginID,
            password: password,
          },
        });

        console.log('Response:', response.data);

        if (response.data === 'Successfull') {
          navigate("/userTheatres");
        } else {
          alert('Login Unsuccessfull');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Login failed');
      }
    }
  }

  return (
    <div className="userloginimage">
    <div className="user-login-container">
      
      <form onSubmit={submitHandler} className="login-form">
     
      <img src={UserLoginImage} alt="Sign In" className="usersign-in-image" /> 
      <p>User Login</p>
        <div className="forms">
          <label>User Id:</label>
          <input type="text" name="loginID" onChange={changeHandler1} value={loginID} />
          {errors.loginID && <span className="error">{errors.loginID}</span>}
        </div>
        <div className="forms">
          <label>Password:</label>
          <input type="password" name="password" onChange={changeHandler2} value={password} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="button-group">
        <h1>First Time User:</h1>
        <button onClick={() => navigate("/user")}>Sign Up</button>
      </div>
    </div>
    </div>
  );
}

export default UserLogin;
