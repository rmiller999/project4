import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup'
import Sports from './Sports';
import Music from './Music';
import Comedy from './Comedy';

function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [apiData, setApiData] = useState(null)
  const [display, setDisplay] = useState('')


  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      setToken('')
      setUser(null)
      // this.setState({
      //   token: '',
      //   user: null
      // })
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setToken('')
            setUser(null)
            setErrorMessage(res.data.message)
            // this.setState({
            //   token: '',
            //   user: null,
            //   errorMessage: res.data.message
            // })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            setToken(res.data.token)
            setUser(res.data.user)
            setErrorMessage('')
            // this.setState({
            //   token: res.data.token,
            //   user: res.data.user,
            //   errorMessage: ''
            // })
          }
        })
    }
  }, [])

  const liftToken = ({token, user}) => {
    console.log('setting user: ', user);
    console.log('setting token: ', token)
    setToken(token)
    setUser(user)
    // this.setState({
    //   token,
    //   user
    // })
  }

  const logout = () => {
    // remove token from localStorage
    localStorage.removeItem('mernToken');
    // remove user and token from state
    setToken('')
    setUser(null)
    // this.setState({
    //   token: '',
    //   user: null
    // })
  }

  // useEffect(() => {
  //   checkForLocalToken()
  // }, [])

  var contents;
  var list = <h1>Seattle Events!</h1>;
  if (display === 'sports') {
    list = <Sports user={user}/>
  } else if (display === 'music') {
    list = <Music user={user} />
  } else if (display === 'comedy') {
    list = <Comedy user={user} />
  }
  if (user) {
    contents = (
      < >
        <nav>
          <button className="navButton" onClick={logout}>Logout</button>
          <button className="navButton" onClick={() => setDisplay(display === "sports" ? '' : 'sports')}>Sports</button>
          <button className="navButton" onClick={() => setDisplay(display === "music" ? '' : 'music')}>Music</button>
          <button className="navButton" onClick={() => setDisplay(display === "comedy" ? '' : 'comedy')}>Comedy</button>
        </nav>
        <h3>Hello, {user.name}</h3>
        {list}
      </>
    );
  } else {
    contents = (
      <>
        <h1>Please signup or login for Seattle Events!</h1>
        <Login liftToken={liftToken} />
        <Signup liftToken={liftToken}/>
      </>
    )
  }

  return (
    <>
      {contents}
    </>
  );
}



export default App;
