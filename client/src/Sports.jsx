import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { set } from 'mongoose';

function Sports({user}) {
  const [sportsList, setSportsList] = useState([])
  const [favorites, setFavorites] = useState([])
  const [sportId, setSportId] = useState(1)
  const [singleEvent, setSingleEvent] = useState([])
  const [details, setDetails] = useState('')

  const getSportsList = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/sportsall').then(res => {
      // console.log('get result from backend', res.data)
      setSportsList(res.data._embedded.events)
      // setSingleEvent(res.data)
      setSportId(res.data._embedded.events.id)
      // this.setState({
      //   sportsList: res.data._embedded.events,
      //   display
      //   })
    } )
  }

  const addToFavorites = (event) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    const newFavs = [...favorites, sportsList]
    axios.post(`users/${user._id}/events/`, {name: event.name, date: event.date}).then((response) => {
      axios.get(`users/${user._id}/events`).then((res) => {
        setFavorites(res.data)
      })
    })
  }

  const deleteAFavorite = (sportsId) => {
    axios.delete(`/users/${user._id}/events/${sportsId}`).then((response) => {
      axios.get(`users/${user._id}/events`).then((response) => {
        let fav = response.data.map(event => (
          event
        ))
        setFavorites(fav)
      })
    })
  }

  const getEventDetails = (favorites) => {
      favorites =  (
        <div>
          <a href={setSingleEvent.url}>{setSingleEvent.name}</a>
          {/* <p>{event._embedded.venues[0].name}</p> */}
        </div>
      )
  }

  var details1;
  // let display;
  // if (details === 'show') {
  //   details1 = (
  //     <div>
  //       <a href={event.url} target='_blank'>{event.name}</a>
  //       <p>{event._embedded}</p>
  //     </div>
  //   )
  // }



  useEffect(() => {
    getSportsList();
    axios.get(`users/${user._id}/events`).then((res) => {
      setFavorites(res.data)
    })
  },[])

  let content = sportsList.map(event => {
    // if (details === 'show') {
    //   details1 = (
    //     <div>
    //       <a href={event.url} target='_blank'>{event.name}</a>
    //       <p>{event._embedded}</p>
    //     </div>
    //   )
    // }
      return (
        <div>
          <a href={event.url} target='_blank'>{event.name}</a>
          <p>Loacation: {event._embedded.venues[0].name}, Date: {event.dates.start.localDate}</p>
          {/* <img src={event.seatmap.staticUrl} alt=""/> */}
          <button onClick={()=>addToFavorites(event)} type="submit">Going to this Event?</button>
          <button onClick={()=>setDetails(details === "show" ? '' : 'show')} type="submit">Get Event Details</button>
        </div>
      )
    })

    let favoritesList;
    favoritesList = favorites.map((favorite,id)=>{
      return (
        <>
          <p key={id}>{favorite.name}</p>
          {/* <button onClick={()=>getEventDetails(favorite._id)} type="submit">Get Event Details</button> */}
          <button onClick={()=> deleteAFavorite(favorite._id)}>Remove Event</button>
            <label for="attending">Completed this game?:</label>
            { favorite.attending ? 
              <input type='checkbox' name='attending' checked onClick={()=> } />
              : <input type='checkbox' name='attending' onClick={}/>}
            <input type="submit" class='button' />
        </>
      )  
    })

  return (
    <>
      <div className='eventsList'>
          <h2>Sports Events:</h2>
          {content}
      </div>
      <div className="eventFavs">
        <h2>My Events:</h2>
        {favoritesList}
      </div>
      <div className="eventFavs">
        {/* {details1} */}
      </div>
    </>
  )
}


export default Sports;