import React, { useState,useEffect } from "react";
import axios from 'axios';
import './Payment.css';

import { useNavigate, useParams} from "react-router-dom";



function Payment() {
    const { bookID } = useParams();
    const [totalCost, setTotalCost]  = useState('');



    const [payment, setPayment] = useState({
        cardHolderName: '',
        creditCardNumber: '',
        cvvNumber: '',
        validFrom: '',
        validTo: '',
        balance: '',
        password: '',
        totalCharges: '',
        remainingBalance: ''
    });

    const [errors, setErrors] = useState({}); 

    const { cardHolderName, creditCardNumber, cvvNumber, validFrom, validTo, balance, password, totalCharges } = payment;

    const changeHandler = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const errors = {};

        if (!cardHolderName.trim()) {
            errors.cardHolderName = "Card holder name is required";
        }

        if (!creditCardNumber.trim() || !/^\d{16}$/.test(creditCardNumber)) {
            errors.creditCardNumber = "Valid 16-digit credit card number is required";
        }

        if (!cvvNumber.trim() || !/^\d{3}$/.test(cvvNumber)) {
            errors.cvvNumber = "Valid 3-digit CVV number is required";
        }

        if (!validFrom || !validTo) {
            errors.validFrom = "Both valid from and valid to dates are required";
        }

        if (!balance.trim() || isNaN(balance)) {
            errors.balance = "Valid balance is required";
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        }
         
        if(balance<=totalCost){
            errors.balance = "Balance is not Sufficient";
           
        }

        setErrors(errors);

        return Object.keys(errors).length === 0; 
    }
    useEffect(()=>{
        axios.post(`http://localhost:8080/getCost/${bookID}`).then((response)=>{
                setTotalCost(response.data);
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios.post('http://localhost:8080/payment', payment, {
                headers: {
                    'Content-type': 'application/json',
                },
                params: {
                    totalCharges: totalCost
                }
            }).then((response) => {
                if (response.data != null) {
                    alert("Payment Successful!! Your Remaining balance is " + response.data);
                    navigate("/ShowAllBook");
                }
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div>
             <nav className="navbar3">
                   {/* <Link to="/">Home</Link>    */}
                   {/* <Link to="/back/">back</Link>   */}
               </nav>
               <h1>Payment</h1>
        <div className="payment-form">
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Card Holder Name</label>
                    <input type="text" name="cardHolderName" value={cardHolderName} onChange={changeHandler} />
                    {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
                </div>
                <div className="form-group">
                    <label>Credit Card Number</label>
                    <input type="text" name="creditCardNumber" value={creditCardNumber} onChange={changeHandler} />
                    {errors.creditCardNumber && <p className="error">{errors.creditCardNumber}</p>}
                </div>
                <div className="form-group">
                    <label>CVV Number</label>
                    <input type="text" name="cvvNumber" value={cvvNumber} onChange={changeHandler} />
                    {errors.cvvNumber && <p className="error">{errors.cvvNumber}</p>}
                </div>
                <div className="form-group">
                    <label>Valid From</label>
                    <input type="month" name="validFrom" value={validFrom} onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label>Valid To</label>
                    <input type="month" name="validTo" value={validTo} onChange={changeHandler} />
                    {errors.validFrom && errors.validTo && <p className="error">{errors.validFrom}</p>}
                </div>
                <div className="form-group">
                    <label>Balance</label>
                    <input type="text" name="balance" value={balance} onChange={changeHandler} />
                    {errors.balance && <p className="error">{errors.balance}</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={changeHandler} />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label>Total Charges</label>
                    <input type="text" name="totalCharges" value={totalCost} readOnly />
                </div>
                <button type="submit">Pay</button>
            </form>
        </div>
        </div>
    )
}

export default Payment;
