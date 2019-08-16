import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Sports() {
  const [sportsList, setSportsList] = useState([])

  const getSportsList = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/sportsall').then(res => {
      // console.log('get result from backend', res.data)
      setSportsList(res.data._embedded.events)
      // this.setState({
      //   sportsList: res.data._embedded.events,
      //   display
      //   })
    } )
  }

  useEffect(() => {
    getSportsList();
  },[])

  let content = sportsList.map(event => {
      return (
        <div className='sportsList'>
          <a href={event.url} target='_blank'>{event.name}</a>
          <p>{event._embedded.venues[0].name}</p>
        </div>
      )
    })

  return (
    <div>
      {/* <button onClick={()=> this.getSportsList()}>Sports</button> */}
      <div className=''>
        {content}
      </div>
    </div>
  )
}


export default Sports;