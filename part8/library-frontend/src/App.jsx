import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login"
import Recommended from "./components/Recommended";
import Notification from "./components/Notification";
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import { useQuery , useSubscription, useApolloClient } from '@apollo/client'
import { LOGGED_USER, BOOK_ADDED, ALL_BOOKS } from './queries'


export const updateCache = (cache, query, addedBook) => {
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.title;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, (data) => {
		const allBooks = data?.allBooks || [];
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		};
	});
};


const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState({ errorMessage: null, isError: false })
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = window.localStorage.getItem('user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])
  const notify = (message, isError) => {
    setErrorMessage({errorMessage:message, isError: isError})
    setTimeout(() => {
      setErrorMessage({ errorMessage: null, isError: false })
    }, 5000)
  }
  const { data } = useQuery(LOGGED_USER, { skip: !token })
  const loggedUser = data?.loggedUser

  const padding = {
    padding: 5
  }

  const logout = ()=>{
    setToken('')
    window.localStorage.removeItem('user-token')
    client.resetStore();
		navigate('/');

  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)

      updateCache(
				client.cache,
				{ query: ALL_BOOKS},
				addedBook
			)
    }
  })

  return (
    <div>
      <div>
        <Link style={padding} to="/">authors</Link>
        <Link style={padding} to="/books">books</Link>
        {token ? (
          <span>
            <Link style={padding} to="/newbook">add book</Link>
            <Link style={padding} to="/recomandation">recomandation</Link>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <Link style={padding} to="/login">login</Link>
        )}

        <Notification errorMessage={errorMessage?.errorMessage} isError={errorMessage?.isError}/>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook loggedUser={loggedUser} setError={notify} />} />
        <Route path="/recomandation" element={<Recommended loggedUser={loggedUser} />} />
        <Route path="/login" element={<Login setToken={setToken} setError={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
