import axios from 'axios'


class BookService{

    getAllBookings(){
        return axios.get('http://localhost:8080/print')
    }

    deleteTicket(bookID){
        return axios.delete('http://localhost:8080/deleteBook'+'/'+bookID)
    }
}

export default new BookService();