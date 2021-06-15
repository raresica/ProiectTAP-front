import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/book")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setBooks(response.data);
            })
    }, [])

    return (
        <div className="App">
            {
                books.map(book => <li key={book.name}>
                    <p>{JSON.stringify(book)}</p>
                </li>)
            }
        </div>
    );
}

export default App;
