// import React, { useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import { IoArrowBack, IoSearch, IoFilter, IoShareSocial, IoSafety } from 'react-icons/io5';
// import { AntDesign } from 'react-icons/ai';
// import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
// import malls from "../data/malls";

// const MovieScreen = () => {
//   const history = useHistory();
//   const location = useLocation();
//   const [selectedDate, setSelectedDate] = useState("");
//   const [mall, setMall] = useState([]);
//   const [seatsData, setSeatsData] = useState([]);
//   const mallsData = malls;
//   console.log(mall, "selected");

//   return (
//     <div>
//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//           <IoArrowBack onClick={() => history.goBack()} style={{ marginLeft: 5 }} size={24} color="black" />
//           <span style={{ fontSize: 17, fontWeight: "600", marginLeft: 5 }}>
//             {location.state.name}
//           </span>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
//           <IoSearch size={24} color="black" />
//           <IoFilter style={{ marginHorizontal: 10 }} size={24} color="black" />
//           <IoShareSocial size={24} color="black" />
//         </div>
//       </div>
//       <div style={{ flexDirection: 'row', alignContent: 'center', marginTop: 10, marginLeft: 5 }}>
//         <AntDesign name="Safety" size={24} color="orange" />
//         <span style={{ paddingTop: 4, paddingLeft: 4 }}>Your safety is our priority</span>
//       </div>
//       <HorizontalDatepicker
//         mode="gregorian"
//         startDate={new Date("2022-08-24")}
//         endDate={new Date("2022-08-30")}
//         initialSelectedDate={new Date("2020-08-22")}
//         onSelectedDateChange={(date) => setSelectedDate(date)}
//         selectedItemWidth={170}
//         unselectedItemWidth={38}
//         itemHeight={38}
//         itemRadius={10}
//         selectedItemTextStyle={{ fontSize: 16, color: '#fff' }}
//         unselectedItemTextStyle={{ fontSize: 16, color: '#000' }}
//         selectedItemBackgroundColor="#222831"
//         unselectedItemBackgroundColor="#ececec"
//         flatListContainerStyle={{}} // Add your custom styles here
//       />
//       {mallsData.map((item, index) => (
//         <div
//           onClick={() => {
//             setMall(item.name);
//             setSeatsData(item.tableData);
//           }}
//           style={{ margin: 10 }}
//           key={index}
//         >
//           <span style={{ fontSize: 16, fontWeight: "500" }}>{item.name}</span>
//           {mall.includes(item.name) ? (
//             <div>
//               {item.showtimes.map((time, idx) => (
//                 <div
//                   onClick={() => history.push({
//                     pathname: "/theatre",
//                     state: {
//                       mall: mall,
//                       name: location.state.name,
//                       timeSelected: time,
//                       tableSeats: seatsData,
//                       date: selectedDate,
//                       image: location.state.image
//                     }
//                   })}
//                   style={{
//                     borderColor: "green",
//                     borderWidth: 0.5,
//                     width: 80,
//                     borderRadius: 3,
//                     margin: 10,
//                     padding: 5,
//                     cursor: 'pointer'
//                   }}
//                   key={idx}
//                 >
//                   <span style={{
//                     fontSize: 15,
//                     color: "green",
//                     fontWeight: "500",
//                     textAlign: "center",
//                   }}>
//                     {time}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           ) : null}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieScreen;
