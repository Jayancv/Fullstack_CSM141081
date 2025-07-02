import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const [page, setPage] = useState("authors");

  const padding = {
    padding: 5
  }

  return (
    <div>
      
      {/* <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} /> */}
      <Router>
        <div>
        <Link style={padding} to='/'>authors</Link> 
        <Link style={padding} to='/books'>books</Link> 
        <Link style={padding} to='/newbook'>add book</Link> 
      </div>
        <Routes>
          <Route path="/" element={<Authors/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/newbook" element={<NewBook/>} />

        </Routes>

      </Router>

    </div>
  );
};

export default App;
