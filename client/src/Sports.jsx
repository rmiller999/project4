import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Sports({user}) {
  const [sportsList, setSportsList] = useState([])
  const [favorites, setFavorites] = useState([])
  const [sportId, setSportId] = useState(1)

  const getSportsList = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/sportsall').then(res => {
      // console.log('get result from backend', res.data)
      setSportsList(res.data._embedded.events)
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


  useEffect(() => {
    getSportsList();
    axios.get(`users/${user._id}/events`).then((res) => {
      setFavorites(res.data)
    })
  },[])

  let content = sportsList.map(event => {
      return (
        <div className='sportsList'>
          <a href={event.url} target='_blank'>{event.name}</a>
          <p>{event._embedded.venues[0].name}</p>
          <button onClick={()=>addToFavorites(event)} type="submit">Add to Favorites</button>
        </div>
      )
    })

    let favoritesList;
    favoritesList = favorites.map((favorite,id)=>{
      return (
        <div>
          <p key={id}>{favorite.name}</p>
          <button onClick={()=> deleteAFavorite(favorite._id)}>Remove Favorite</button>
        </div>
      )  
    })

  return (
    <div>
      {/* <button onClick={()=> this.getSportsList()}>Sports</button> */}
      <div className=''>
        {content}
        {favoritesList}
      </div>
    </div>
  )
}


export default Sports;