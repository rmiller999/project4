import React from 'react';
import axios from 'axios';

class Attractions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      attractionsList: []
    }
  }

  getAttractionsList() {
    var x = document.getElementsByClassName("attractionsList");
    for (let i =0; i < x.length; i++) {
      if (x[i].style.display === "none") {
        x[i].style.display = "block";
      } else {
        x[i].style.display = "none";
      }
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/attractionssall').then(res => {
      // console.log('get result from backend', res.data)

      this.setState(
        {attractionsList: res.data._embedded.events})
    } )
      
  } 



  render () {

    let content = this.state.attractionsList.map(event => {
      return (
        <div className='attractionsList'>
          <a href={event.url} target='_blank'>{event.name}</a>
          {/* <img src={event.} alt=""/> */}
        </div>
      )
    })

    

    return (
      <div>
        <button onClick={()=> this.getAttractionsList()}>Music</button>
        {content}
      </div>
    )
  }
}

export default Attractions;