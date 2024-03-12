import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './AdminLoginStyle.css'
import AdminLoginImage from './AdminLoginImage.jpg';

function AdminLogin() {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 

  const changeHandler1 = (e) => {
    setEmail(e.target.value);
  }

  const changeHandler2 = (e) => {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8080/adminLogin'; 

  const validateForm = () => {
    const errors = {};

    if (!emailId) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    }


     setErrors(errors);

       
    return Object.keys(errors).length === 0;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (validateForm()) {
      try {
        const response = await axios.post(apiUrl, null, {
          params: {
            emailId: emailId,
            password: password,
          },
        });

        console.log('Response:', response.data);

        if (response.data === 'Successfull') {
          navigate("/movies");
        } else {
          console.log(response);
          alert('Please Check Your Credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Login failed');
      }
    }
  }

  return (
    <div className="admin-login-container">
     <form onSubmit={submitHandler} className="login-form">
      <img src={AdminLoginImage} alt="Sign In" className="sign-in-image" /> 
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="emailId" onChange={changeHandler1} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" onChange={changeHandler2} />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
}

export default AdminLogin;
