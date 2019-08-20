import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Music({user}) {
  const [musicList, setMusicList] = useState([])
  const [favorites, setFavorites] = useState([])
  const [musicId, setMusicId] = useState(1)

  const getMusicList = () => {
  
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/musicall').then(res => {
      // console.log('get result from backend', res.data)
      setMusicList(res.data._embedded.events)
      setMusicId(res.data._embedded.events.id)
      // this.setState(
      //   {attractionsList: res.data._embedded.events})
    } )
  }

  const addToFavorites = (event) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    const newFavs = [...favorites, musicList]
    axios.post(`users/${user._id}/events/`, {name: event.name, date: event.date}).then((response) => {
      axios.get(`users/${user._id}/events`).then((res) => {
        setFavorites(res.data)
      })
    })
  }

  const deleteAFavorite = (musicId) => {
    axios.delete(`/users/${user._id}/events/${musicId}`).then((response) => {
      axios.get(`users/${user._id}/events`).then((response) => {
        let fav = response.data.map(event => (
          event
        ))
        setFavorites(fav)
      })
    })
  }

  useEffect(() => {
    getMusicList();
    axios.get(`users/${user._id}/events`).then((res) => {
      setFavorites(res.data)
    })
  },[])

  let content = musicList.map(event => {
    return (
      <div>
        <a href={event.url} target='_blank'>{event.name}</a>
        <p>{event._embedded.venues[0].name}, Date: {event.dates.start.localDate}</p>
        <button onClick={()=>addToFavorites(event)} type="submit">Add to Favorites</button>
      </div>
    )
  })

  let favoritesList;
  favoritesList = favorites.map((favorite,id)=>{
    return (
      <>
        <p key={id}>{favorite.name}</p>
        <button onClick={()=> deleteAFavorite(favorite._id)}>Remove Favorite</button>
      </>
    )  
  })

  return (
    <>
      <div className='eventsList'>
        {content}
      </div>
      <div className="eventFavs">
        {favoritesList}

      </div>
    </>
  )
}


export default Music;