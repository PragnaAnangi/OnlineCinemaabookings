// import React, { useState } from 'react';
// import {  Link } from 'react-router-dom';
// import './MovieBooking.css';

// const MovieBooking = () => {
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [selectedSeats, setSelectedSeats] = useState(0);

//   const handleSeatChange = (event) => {
//     let amount = totalAmount;
//     let count = selectedSeats;

//     if (event.target.checked) {
//       count += 1;
//       amount += 200;
//     } else {
//       count -= 1;
//       amount -= 200;
//     }

//     setTotalAmount(amount);
//     setSelectedSeats(count);
//   };

//   const renderSeats = () => {
//     const seatArray = [];

//     for (let i = 0; i < 59; i++) {
//       const randint = Math.floor(Math.random() * 2);
//       const booked = randint === 1 ? 'booked' : '';

//       seatArray.push(
//         <React.Fragment key={i + 2}>
//           <input
//             type="checkbox"
//             name="tickets"
//             id={`s${i + 2}`}
//             onChange={handleSeatChange}
//           />
//           <label htmlFor={`s${i + 2}`} className={`seat ${booked}`} />
//         </React.Fragment>
//       );
//     }

//     return seatArray;
//   };

  
  
//   return (
//     <div>
//      <link
//       href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone"
//       rel="stylesheet"/>
//     <link rel="preconnect" href="https://fonts.googleapis.com" />
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
//     <link
//       href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
//       rel="stylesheet"/>


    
//     <div className="center">
//       <div className="tickets">
//         <div className="ticket-selector">
//             <div className="head">
//                <div className="title">Movie Name</div>
//             </div>
//           <div className="seats">
//             <div className="status">
//               <div className="item">Available</div>
//               <div className="item">Booked</div>
//               <div className="item" >Selected</div>
//             </div>
//             <div className="all-seats">
//                 <input type="checkbox" name="tickets" id="s1" />
//                 <label htmlFor="s1" className="seat booked"></label>
//                 {renderSeats()}
//             </div>
//           </div>
//           {/* code  */}


//           <div class="timings">
//             <div class="dates" >
//               <input type="radio" name="date" id="d1" checked />
//               <label for="d1" class="dates-item" >
//                 <div class="day">Sun</div>
//                 <div class="date">11</div>
//               </label>
//               <input type="radio" id="d2" name="date" />
//               <label class="dates-item" for="d2" >
//                 <div class="day" >Mon</div>
//                 <div class="date">12</div>
//               </label>
//               <input type="radio" id="d3" name="date" />
//               <label class="dates-item" for="d3">
//                 <div class="day" >Tue</div>
//                 <div class="date">13</div>
//               </label>
//               <input type="radio" id="d4" name="date" />
//               <label class="dates-item" for="d4">
//                 <div class="day">Wed</div>
//                 <div class="date">14</div>
//               </label>
//               <input type="radio" id="d5" name="date" />
//               <label class="dates-item" for="d5">
//                 <div class="day">Thu</div>
//                 <div class="date">15</div>
//               </label>
//               <input type="radio" id="d6" name="date" />
//               <label class="dates-item" for="d6">
//                 <div class="day" >Fri</div>
//                 <div class="date">16</div>
//               </label>
//               <input type="radio" id="d7" name="date" />
//               <label class="dates-item" for="d7" >
//                 <div class="day">Sat</div>
//                 <div class="date">17</div>
//               </label>
//             </div>
//             <div class="times">
//               <input type="radio" name="time" id="t1" checked />
//               <label for="t1" class="time">11:00</label>
//               <input type="radio" id="t2" name="time" />
//               <label for="t2" class="time" > 14:30 </label>
//               <input type="radio" id="t3" name="time" />
//               <label for="t3" class="time" > 18:00 </label>
//               <input type="radio" id="t4" name="time" />
//               <label for="t4" class="time" > 21:30 </label>
//             </div>
//           </div>

//         </div>
//         <div className="price" >
//           <div className="total" >
//             <span >
//               <span className="count">{selectedSeats}</span> Tickets
//             </span>
//             <div className="amount">{totalAmount}</div>
//           </div>
//           <Link to="/booking" className="btn btn-danger">
//                   Book
//                 </Link>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default MovieBooking;
