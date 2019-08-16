import React, {useState, useEffect} from 'react';
import axios from 'axios';

class Sports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sportsList: [],
      display: ''
    }

    this.getSportsList = this.getSportsList.bind(this);
  }

  getSportsList() {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/sportsall').then(res => {
      // console.log('get result from backend', res.data)
      let display = 'sports'; 
      if (this.state.display === 'sports') {
        display = ''
      }
      this.setState({
        sportsList: res.data._embedded.events,
        display
        })
    } )
    
  } 



  render () {
    let content;
    if (this.state.display === 'sports') {
      content = this.state.sportsList.map(event => {
        return (
          <div className='sportsList'>
            <a href={event.url} target='_blank'>{event.name}</a>
            <p>{event._embedded.venues[0].name}</p>
          </div>
        )
      })
    }

    

    return (
      <div>
        <button onClick={()=> this.getSportsList()}>Sports</button>
        <div className=''>
          {content}
        </div>
      </div>
    )
  }
}

export default Sports;