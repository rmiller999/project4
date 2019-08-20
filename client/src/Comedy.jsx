import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Comedy({user}) {
  const [comedyList, setcomedyList] = useState([])
  const [favorites, setFavorites] = useState([])
  const [comedyId, setComedyId] = useState(1)

  const getComedyList = () => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/comedysall').then(res => {

      setcomedyList(res.data._embedded.events)
      setComedyId(res.data._embedded.events.id)
      // this.setState(
      //   {comedyList: res.data._embedded.events})
    })
  }

  const addToFavorites = (event) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    const newFavs = [...favorites, comedyList]
    axios.post(`users/${user._id}/events/`, {name: event.name, date: event.date}).then((response) => {
      axios.get(`users/${user._id}/events`).then((res) => {
        setFavorites(res.data)
      })
    })
  }

  const deleteAFavorite = (comedyId) => {
    axios.delete(`/users/${user._id}/events/${comedyId}`).then((response) => {
      axios.get('/events').then((response) => {
        let fav = response.data.map(event => (
          event.name
        ))
        setFavorites(fav)
      })
    })
  }
  
  useEffect(() => {
    getComedyList();
    axios.get(`users/${user._id}/events`).then((res) => {
      setFavorites(res.data)
    })
  },[])

  let content = comedyList.map(event => {
    return (
      <div className='comedyList'>
        <a href={event.url} target='_blank'>{event.name}</a>
        {/* <img src={event.} alt=""/> */}
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
      {/* <button onClick={()=> this.getComedyList()}>Comedy</button> */}
      {content}
      {favoritesList}
    </div>
  )
}


export default Comedy;