import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login"
import Recommended from "./components/Recommended";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { LOGGED_USER } from './queries'

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = window.localStorage.getItem('user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const { data } = useQuery(LOGGED_USER, { skip: !token })
  const loggedUser = data?.loggedUser

  const padding = {
    padding: 5
  }

  const logout = ()=>{
    setToken('')
    window.localStorage.removeItem('user-token')
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
        {token ? (
          <span>
            <Link style={padding} to='/newbook'>add book</Link> 
            <Link style={padding} to='/recomandation'>recomandation</Link> 
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <Link style={padding} to='/login'>login</Link> 
        )}
        

      </div>
        <Routes>
          <Route path="/" element={<Authors/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/newbook" element={<NewBook loggedUser={loggedUser}/>} />
          <Route path="/recomandation" element={<Recommended loggedUser={loggedUser}/>} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
        </Routes>

      </Router>

    </div>
  );
};

export default App;
