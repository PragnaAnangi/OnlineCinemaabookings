import React, { useState, useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import ShowService from '../services/ShowService';
import BookService from '../services/BookService';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const UserShowList = () => {
    const {theatreID}=useParams();
    const headerStyle = {
        color: 'white', // Set the text color to white
        marginLeft: '20px' // Add left margin to move the text to the right
    };
    const [shows, setShows] = useState([]);
    const [noOfTickets, setNoOfTickets] = useState('');
    const navigate = useNavigate('');
    
    // useEffect(() => {
    //     getAllShows();

    // }, [])

    // const getAllShows = () => {
    //     ShowService.getAllShows().then((response) => {
    //         setShows(response.data)
    //         console.log(response.data)
    //     }).catch(error => {
    //         console.log(error);
    //     })

    // }
    useEffect(() => {
        axios.get("http://localhost:8080/getShows",{
        params:{
          theatreID:theatreID
        }
        })
    
          .then((response) => {
            setShows(response.data);
    
          });
    
      }, []);

    // const BookTicket = (showID) => {
    //     window.location.href=`/Book/${showID}`;
    // }
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
                alert("Proceed to payment");
                navigate('/payment/'+response.data)
            })
            .catch((error) => {
                console.error('Error fetching details:', error);
            });
            // if(BookTicket){
            //     alert("Ticket Booked");
            //     navigate('')
            // }
    };

    return (
        <div className="container">
            <div>
                <header>
                    {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <h3 style={headerStyle}>OCTBS</h3>
                        </div>
                        <Link to="/" className="btn btn-primary mb-3">
                            Home
                        </Link>
                        <Link to="/userTheatres" className="btn btn-primary mb-3">
                            Theatre Details
                        </Link>
                        <Link to="/userShow" className="btn btn-primary mb-3">
                            Show Details and Book Ticket
                        </Link>
                        <Link to="/shows" className="btn btn-primary mb-3">
                            Show Details
                        </Link>
                    </nav> */}
                </header>
            </div>
            <h2 className="text-center">Show Details</h2>
            {/* <Link to="/add-show" className="btn btn-primary mb-2">Add Show</Link> */}
            <table className="table table-bordered table-striped">
                <thead>
                    <th>Show Id</th>
                    <th>Movie Name</th>
                    <th>Theatre Name</th>
                    <th>Theatre nearest Metro Location</th>
                    <th>Time Slot</th>
                    <th>Price Per Seat</th>
                    <th>Seats Available</th>
                    <th>Enter No of Tickets</th>
                     <th>Book Ticket</th>
                    {/* <th>Delete Show</th>  */}
                </thead>
                <tbody>
                    {shows.map((show) => (
                        <tr key={show.showID}>
                            <td>{show.showID}</td>
                            <td>{show.movie.movieName}</td>
                            <td>{show.theatre.theatreName}</td>
                            <td>{show.theatre.locationName}</td>
                            <td>{show.timeSlot}</td>
                            <td>{show.pricePerSeat}</td>
                            <td>{show.regularSeats_available}</td>
                            {/* <td><input type='number' name='noOfShows'></input></td> */}
                            <td>
                                <input
                                    type="number"
                                    name="noOfTickets"
                                    // value={noOfTickets}
                                    min={1}
                                    onChange={(e) => setNoOfTickets(e.target.value)}
                                    required
                                />
                            </td>
                            {/* <td>
                                <Link to={`/Book/${show.showID}`} className="btn btn-info btn-sm mr-3">Book</Link></td> */}
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => BookTicket(show.showID)}> Book </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <Link to="/userTheatres" className="btn btn-primary mb-3">
       Back
      </Link>

        </div>

    )
}

export default UserShowList


