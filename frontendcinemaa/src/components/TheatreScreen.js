// import React, { useContext, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { IoArrowBack } from 'react-icons/io5';
// import { FaShareAlt, FaSquare } from 'react-icons/fa';
// import { MoviesCards } from '../Context';
// import { useStripe } from '@stripe/react-stripe-js';

// const TheatreScreen = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const stripe = useStripe();
//     const moviesContext = useContext(MoviesCards);
//     const { seats: contextSeats = [], setSeats, occupied = [] } = moviesContext || {};
//     const [total, setTotal] = useState(0);
  
//     const onSeatSelect = (item) => {
//       const seatSelected = contextSeats.find((seat) => seat === item);
  
//       console.log(seatSelected, "you pressed on");
//       if (seatSelected) {
//         setSeats(contextSeats.filter((seat) => seat !== item));
//       } else {
//         setSeats([...contextSeats, item]);
//       }
//     };
  
//     const displaySeats = [...contextSeats];
  
//     const subscribe = async () => {
//       if (!stripe) {
//         console.error("Stripe.js has not loaded yet."); // Handle error, Stripe.js has not loaded yet
//         return;
//       }
  
//       const response = await fetch("http://localhost:8000/payment", {
//         method: "POST",
//         body: JSON.stringify({
//           amount: Math.floor(total * 100),
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       const data = await response.json();
//       console.log(data);
  
//       if (!response.ok) {
//         window.alert(data.message);
//       } else {
//         const clientSecret = data.clientSecret;
  
//         const { error } = await stripe.confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: stripe.elements.getElement('card'), // Replace 'card' with the ID of your card element
//           },
//         });
  
//         if (error) {
//           console.error(error.message);
//           window.alert(error.message);
//         } else {
//           occupied.push(...contextSeats);
  
//           navigate('/ticket', {
//             state: {
//               name: location.state.name,
//               mall: location.state.mall,
//               timeSelected: location.state.timeSelected,
//               total: total,
//               image: location.state.image,
//               date: location.state.date,
//               selectedSeats: displaySeats,
//               priceValue: total,
//             },
//           });
  
//           setSeats([]);
//         }
//       }
//     };
  
//   return (
//     <div>
//       <div style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <IoArrowBack onClick={() => navigate(-1)} style={{ marginLeft: 5 }} size={24} color="black" />
//           <div style={{ marginLeft: 6 }}>
//             <span style={{ fontSize: 16, fontWeight: "600" }}>{location.state.name}</span>
//             <span style={{ marginTop: 2, color: "gray", fontSize: 15, fontWeight: "500" }}>{location.state.mall}</span>
//           </div>
//         </div>

//         <FaShareAlt style={{ marginRight: 12 }} size={24} color="black" />
//       </div>

//       <span style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", marginTop: 10 }}>{location.state.timeSelected}</span>

//       <span style={{ textAlign: "center", fontSize: 13, marginTop: 10, color: "gray" }}>CLASSIC (240)</span>

//       <div style={{ marginTop: 20 }} />

//       <div>
//         {location.state.tableSeats.map((item, index) => (
//           <div
//             onClick={() => onSeatSelect(item)}
//             style={{ margin: 10, borderColor: "gray", borderWidth: 0.5, borderRadius: 5, cursor: 'pointer' }}
//             key={index}
//           >
//             {seats.includes(item) ? (
//               <span style={{ backgroundColor: "#ffc40c", padding: 8 }}>{item}</span>
//             ) : occupied.includes(item) ? (
//               <span style={{ backgroundColor: "#989898", padding: 8 }}>{item}</span>
//             ) : (
//               <span style={{ padding: 8 }}>{item}</span>
//             )}
//           </div>
//         ))}
//       </div>

//       <div style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 100, marginTop: 20, backgroundColor: "#D8D8D8", padding: 10 }}>
//         <div>
//           <FaSquare style={{ textAlign: "center", marginBottom: 4 }} size={24} color="#ffc40c" />
//           <span>selected</span>
//         </div>

//         <div style={{ marginHorizontal: 20 }}>
//           <FaSquare style={{ textAlign: "center", marginBottom: 4 }} size={24} color="white" />
//           <span>Vacant</span>
//         </div>

//         <div>
//           <FaSquare style={{ textAlign: "center", marginBottom: 4 }} size={24} color="#989898" />
//           <span>Occupied</span>
//         </div>
//       </div>

//       <div style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
//         <div style={{ padding: 10 }}>
//           <span style={{ marginBottom: 4, fontSize: 15, fontWeight: "500" }}>show end time approx 6:51Pm</span>

//           {seats.length > 0 ? (
//             <div>
//               {seats.map((seat, index) => (
//                 <span key={index} style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4 }}>{seat}</span>
//               ))}
//             </div>
//           ) : (
//             <span style={{ fontSize: 18 }}>No seats selected</span>
//           )}
//         </div>

//         <div style={{ backgroundColor: "#E0E0E0", padding: 10, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, marginTop: 10 }}>
//           <span style={{ width: 100 }}>Now with ticket cancellation</span>
//         </div>
//       </div>

//       <div
//         style={{
//           backgroundColor: "#ffc40c",
//           padding: 20,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginVertical: 20,
//         }}
//       >
//         {seats.length > 0 ? (
//           <span style={{ fontSize: 17, fontWeight: "500" }}>{seats.length} seat's selected</span>
//         ) : (
//           <span></span>
//         )}

//         <span onClick={subscribe} style={{ fontSize: 17, fontWeight: "600" }}>PAY {total}</span>
//       </div>
//     </div>
//   );
// };

// export default TheatreScreen;
