import React, { useState,useEffect} from 'react';
import { useNavigate,Link,useParams} from 'react-router-dom';
import './AddMovieComponent.css'; // Import the CSS file for styling
import BookService from '../services/BookService';
import axios from 'axios'
const BookMovieComponent = () => {
  const {showID}=useParams();
  const [noOfTickets, setNoOfTickets] = useState('');


  const BookTicket = (showID) => {
    axios.post(`http://localhost:8080/Book/${showID}`, null, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            noOfTickets: noOfTickets
        }
    })
        .then((response) => {
            
        })
        .catch((error) => {
            console.error('Error fetching food details:', error);
        });

};
  const title = ()=>{
   
      return <h2 className="text-center">Book Ticket</h2>
   
  }
  return (
    <div>
        <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {
                title()
            }
            
            <div className="card-body">
              <form onSubmit={BookTicket}>
                <div className="form-group mb-2">
                  <label className="form-label left-label">Enter no of tickets:</label>
                  <input
                    type="text"
                    placeholder="Enter No of tickets"
                    name="noOfTickets"
                    className="form-control"
                    value={noOfTickets}
                    onChange={(e) => setNoOfTickets(e.target.value)}
                  />
                </div>

                <button type="submit">Book </button>
                {/* <Link to="/movies"className="btn btn-danger" >Cancel</Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        };

export default BookMovieComponent;
