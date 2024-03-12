import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ViewMovieComponent from './components/ViewMovieComponent';
import HeaderComponent from './components/HeaderComponent';
import AddMovieComponent from './components/AddMovieComponent';
import ViewTheatreComponent from './components/ViewTheatreComponent';
import AddTheatreComponent from './components/AddTheatreComponent';
import AddShowComponent from './components/AddShowComponent';
import ViewShowComponent from './components/ViewShowComponent';
import UserTheatrelist from './components/UserTheatrelist';
import User from './components/User';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Home from './components/HomePage';
import UserShowList from './components/UserShowList';
import BookMovieComponent from './components/BookMovieComponent';
import Payment from './components/Payment';
import ShowAllBook from './components/ShowAllBook';
import MovieBooking from './components/MovieBooking';
import TheaterList from './components/TheaterList';
import MovieScreen from './components/MovieScreen';
import TheatreScreen from './components/TheatreScreen';
import ViewMoviesComponent from './components/ViewMoviesComponents';


function App() {
  return (
    <div className="App">
      <Router>
        {/* <HeaderComponent/> */}
        <div>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/login' element={<UserLogin/>}></Route>
          <Route path='/view' element={<User/>}></Route>
          <Route path='/admin' element={<AdminLogin/>}></Route>
          <Route path='/gotohome' element={<Home/>}></Route>
            <Route path='/shows' element={<ViewShowComponent/>}/>
            <Route path='/movies' element={<ViewMovieComponent/>}/>
            <Route path='/add-movie' element={<AddMovieComponent/>}/>
            <Route path='/add-show' element={<AddShowComponent/>}/>
            <Route path='/edit-movie/:movieID' element={<AddMovieComponent/>} />
            <Route path='/edit-show/:showID' element={<AddShowComponent/>} />
            <Route path='/userTheatres' element={<UserTheatrelist/>}/>
            <Route path='/userShow' element={<UserShowList/>}/>
            <Route path='/theatres' element={<ViewTheatreComponent/>}/>
            <Route path='/Book' element={<BookMovieComponent/>}/>
            <Route path='/payment/:bookID' element={<Payment/>}/>
            <Route path='/moviesii' element={<ViewMoviesComponent/>}/>


            {/* <Route path='/payment/:bookID' element={<MovieBooking/>}/> */}
            <Route path='/ShowAllBook' element={<ShowAllBook/>}/>
            <Route path='/add-theatre' element={<AddTheatreComponent/>} />
            <Route path='/edit-theatre/:theatreID' element={<AddTheatreComponent/>} />
            <Route path='/viewshow/:theatreID' element={<UserShowList/>}/>
            {/* <Route path='/booking' element={<Payment/>}/> */}

            {/* <Route path='/theater' element={<TheaterList/>}/>
            <Route path='/moviee' element={<MovieScreen/>}/>
            <Route path='/abcd' element={<TheatreScreen/>}/> */}

          
           
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
