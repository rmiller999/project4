import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Music() {
  const [musicList, setMusicList] = useState([])

  const getMusicList = () => {
  
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/musicall').then(res => {
      // console.log('get result from backend', res.data)
      setMusicList(res.data._embedded.events)
      // this.setState(
      //   {attractionsList: res.data._embedded.events})
    } )
  }

  useEffect(() => {
    getMusicList();
  },[])

  let content = musicList.map(event => {
    return (
      <div className='attractionsList'>
        <a href={event.url} target='_blank'>{event.name}</a>
        {/* <img src={event.} alt=""/> */}
      </div>
    )
  })

  

  return (
    <div>
      {/* <button onClick={()=> this.getAttractionsList()}>Music</button> */}
      {content}
    </div>
  )
}


export default Music;