// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import BookService from '../services/BookService';
// import './ViewTheatreComponent.css';

// const ShowAllBook = () => {
//   const headerStyle = {
//     color: 'white', // Set the text color to white
//     marginLeft: '20px' // Add left margin to move the text to the right
// };
//   const [books, setBooks] = useState([]);

// //   useEffect(() => {
// //     getAllBookings();
// //   }, []);

//   useEffect(() => {
//     BookService.getAllBookings()
//       .then((response) => {
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   },[]);

// //   const deleteTheatre = (theatreID) => {
// //     TheatreService.deleteTheatre(theatreID)
// //       .then((response) => {
// //         getAllTheatres();
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };

//   return (
//     <div className="container">
//       <div>
//         <header>
//             {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//                 <div>
//                     <h3 style={headerStyle}>OCTBS</h3>
//                 </div>
//                 <Link to="/" className="btn btn-primary mb-3">
//        Home
//       </Link>
//       <Link to="/theatres" className="btn btn-primary mb-3">
//        Theatre Details
//       </Link>
//       <Link to="/movies" className="btn btn-primary mb-3">
//        Movie Details
//       </Link>
//       <Link to="/shows" className="btn btn-primary mb-3">
//        Show Details
//       </Link>
//             </nav> */}
//         </header>
//     </div>
//       <h2 className="text-center mb-4">Tickets</h2>
//       {/* <Link to="/add-theatre" className="btn btn-primary mb-3">
//         Add Theatre
//       </Link> */}
//       <table className="table table-bordered">
//         <thead className="thead-dark align-top">
//           <tr>
//             <th>Book Id</th>
//             <th>Theatre Name</th>
//             <th>Metro Location</th>
//             <th>Movie Name</th>
//             <th>Number Of Tickets</th>
//             <th>Total Cost</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((book) => (
//             <tr key={book.bookID}>
//               <td>{book.bookID}</td>
//               <td>{book.theatreName}</td>
//               <td>{book.theatreLocation}</td>
//               <td>{book.movieName}</td>
//               <td>{book.noOfTickets}</td>
//               <td>{book.totalCost}</td>
//               <td>{book.reservationCapacityRegular}</td>
//               {/* <td>
//                 <div className="btn-group">
//                   <Link to={`/edit-theatre/${theatre.theatreID}`} className="btn btn-info btn-sm mr-3">
//                     Update
//                   </Link>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteTheatre(theatre.theatreID)}
//                     style={{ marginLeft: '4px' }}>Delete
//                   </button>
//                 </div>
//               </td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShowAllBook;

import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import BookService from '../services/BookService';
import { Link,useNavigate } from 'react-router-dom';

 

const TicketPDF = ({ book }) => (
<Document>
<Page size="A4">
<View>
<Text>Book ID: {book.bookID}</Text>
<Text>Theatre Name: {book.theatreName}</Text>
<Text>Metro Location: {book.theatreLocation}</Text>
<Text>Movie Name: {book.movieName}</Text>
<Text>Number Of Tickets: {book.noOfTickets}</Text>
<Text>Total Cost: {book.totalCost}</Text>
</View>
</Page>
</Document>
);

 

const ShowAllBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const headerStyle = {
    color: 'white', // Set the text color to white
    marginLeft: '20px' // Add left margin to move the text to the right
};

  useEffect(() => {
    BookService.getAllBookings()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 

  const downloadPDF = (book) => {
    setSelectedBook(book);
  };
  const deleteTicket=(bookID) =>{
    BookService.deleteTicket(bookID).then((response) =>{
      if (response.data === "Successfull") {
        alert("Do you want to really delete");
      console.log("Success");
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.bookID !== bookID)
      );

    }
    else{
      alert("delete failed");
    }
      

    }).catch(error => {
        console.log(error);
      })
  }
 

  return (
<div className="container">
<div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <h3 style={headerStyle}>OCTBS</h3>
                </div>&nbsp
                <Link to="/" className="btn btn-primary mb-3">
       Home
      </Link>&nbsp
       <Link to="/userTheatres" className="btn btn-primary mb-3">
       Theatre Details
      </Link>
      {/* <Link to="/shows" className="btn btn-primary mb-3">
       Show Details
      </Link>  */}
            </nav>
        </header>
    </div>
<h2 className="text-center mb-4">Tickets</h2>
<table className="table table-bordered">
<thead className="thead-dark align-top">
<tr>
<th>Book Id</th>
<th>Theatre Name</th>
<th>Metro Location</th>
<th>Movie Name</th>
<th>Number Of Tickets</th>
<th>Total Cost</th>
<th>Download ticket</th>
<th>Cancel ticket</th>
</tr>
</thead>
<tbody>
          {books.map((book) => (
<tr key={book.bookID}>
<td>{book.bookID}</td>
<td>{book.theatreName}</td>
<td>{book.theatreLocation}</td>
<td>{book.movieName}</td>
<td>{book.noOfTickets}</td>
<td>{book.totalCost}</td>
<td>
<button className="btn btn-primary" onClick={() => downloadPDF(book)}>
                  Download
</button>

        </td>
        <td>
           <button className="btn btn-danger btn-sm" onClick={() => deleteTicket(book.bookID)}> Cancel Ticket </button>
                            </td>
        </tr>
                  ))}
</tbody>
</table>
      {selectedBook && (
<PDFViewer width={400} height={600}>
<TicketPDF book={selectedBook} />
</PDFViewer>
      )}
</div>
  );
};

 

export default ShowAllBook;