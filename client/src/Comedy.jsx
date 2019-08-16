import React from 'react';
import axios from 'axios';

class Comedy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      comedyList: []
    }
  }

  getComedyList() {
    var x = document.getElementsByClassName("comedyList");
    for (let i =0; i < x.length; i++) {
      if (x[i].style.display === "none") {
        x[i].style.display = "block";
      } else {
        x[i].style.display = "none";
      }
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get('/api/comedysall').then(res => {
      // console.log('get result from backend', res.data)

      this.setState(
        {comedyList: res.data._embedded.events})
    } )
      
  } 



  render () {

    let content = this.state.comedyList.map(event => {
      return (
        <div className='comedyList'>
          <a href={event.url} target='_blank'>{event.name}</a>
          {/* <img src={event.} alt=""/> */}
        </div>
      )
    })

    

    return (
      <div>
        <button onClick={()=> this.getComedyList()}>Comedy</button>
        {content}
      </div>
    )
  }
}

export default Comedy;