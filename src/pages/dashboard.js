import { useEffect, useState } from "react";
import LeftNav from "../components/leftNav";
import '../styles/dashboard.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useContext} from "react";
import { AuthContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    
    const [bookList, setBookList] = useState();
    const [sortAvailabe, setSortAvailable] = useState(true);
    const [refetch, setRefetch] = useState();

    const navigate = useNavigate();

    const AuthContexts = useContext(AuthContext);
    const { user } = AuthContexts;

    const updateBook = (id) => {
        const updateBody = {rentBy: user}
        console.log(updateBody)
        axios.put(`http://localhost:8800/book/${id}`, updateBody)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(user === null) {
            navigate("/");
        }
    }, [user])

    useEffect(()=>{
        axios.get('http://localhost:8800/book')
        .then((res)=>{
            setBookList(res.data)
        })
    }, [refetch])

    const toggleAvailable = () => {
        setSortAvailable(!sortAvailabe);

        if(sortAvailabe === true){
            axios.get('http://localhost:8800/book/available')
            .then((res)=>{
                setBookList(res.data)
            })
        }
        else{
            axios.get('http://localhost:8800/book')
        .then((res)=>{
            setBookList(res.data)
        })
        }
        
    }

    const priceFilter = (e) => {
        e.preventDefault();

        const priceRange = {
            min: e.target[0].value,
            max: e.target[1].value
        }

        console.log(priceRange)

        axios.put('http://localhost:8800/book/priceFilter', priceRange)
        .then((res) => {
            setBookList(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return ( 
        <div className="dashboardContents">
            <LeftNav />
            <div className="books">
            <span className="sortBy"> 
            
            <span>
                <form action="#" className="filterForm" onSubmit={(e) => priceFilter(e)} onReset={() => setRefetch(!refetch)}>
                <span style={{fontSize: '0.8em'}}>Filter Price: </span>
                    <input type="number" name="min" id="min" placeholder="min" className="filterInput"/> 
                    <input type="number" name="max" id="max" placeholder="max" className="filterInput" />
                    <button type="submit" className="filterBtn">Filter</button>
                    <button type="reset" className="filterBtn">Clear filter</button>
                </form>
                
            </span>  <span onClick={toggleAvailable} style={{cursor: 'pointer'}}>Sort by: <span className="filterBtn">{!sortAvailabe ? 'All' : 'Available' }</span> </span> </span>
            <div className="booksContainer">
            {bookList?.length > 0 ? bookList?.map((book)=>{
                return(
            <div className="indvBook">
            <Card style={{ width: '24rem'}}>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                This book is written by {book.author}. Rent and enjoy this classic book. 
                </Card.Text>
                <Card.Text style = {{color: book.rentBy ? 'red' : 'green'}}>
                {book.rentBy ? `This book is rented by ${book.rentBy}` : 'You can rent this book.'} 
                </Card.Text>
                <Card.Text>
                Price: {book.price} 
                </Card.Text>
                <Button variant={book.rentBy ? 'disabled' : 'danger'} onClick={() => {updateBook(book._id); setRefetch(!refetch)}}>{book.rentBy ? 'Remind when available' : 'Rent'}</Button>
            </Card.Body>
            </Card>
            </div>
                )
            }) : 
            <div>
                <h2>Sorry, no books available with such filter.</h2>
            </div>
            }
                
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard
