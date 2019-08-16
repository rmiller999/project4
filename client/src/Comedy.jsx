import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Comedy() {
  const [comedyList, setcomedyList] = useState([])

  const getComedyList = () => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/comedysall').then(res => {

      setcomedyList(res.data._embedded.events)
      // this.setState(
      //   {comedyList: res.data._embedded.events})
    })
  }
  
  useEffect(() => {
    getComedyList();
  },[])

  let content = comedyList.map(event => {
    return (
      <div className='comedyList'>
        <a href={event.url} target='_blank'>{event.name}</a>
        {/* <img src={event.} alt=""/> */}
      </div>
    )
  })

  

  return (
    <div>
      {/* <button onClick={()=> this.getComedyList()}>Comedy</button> */}
      {content}
    </div>
  )
}


export default Comedy;