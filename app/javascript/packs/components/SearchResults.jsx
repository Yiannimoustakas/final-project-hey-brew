import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchForm from './SearchForm'


class SearchResults extends Component{
  constructor(){
    super();
    this.state = {
      pubs: [],
      query: ''
    }
  };

  componentDidMount(){
    this.performSearch(this.props.match.params.query);
    setInterval(() => this.performSearch(), 5000)
  }

  performSearch( query ) {
    // console.log("performSearch", this, query);
    const pubresults_URL = `http://localhost:3000/pubs/search/${this.props.match.params.query}.json`;

    axios.get( pubresults_URL )
    .then(response => {
      // console.log("response", response.data);
      this.setState({pubs: response.data})
      this.setState({query: this.props.match.params.query})
    })
    .catch(console.warn)
  };

  handleBackClick(event){
    event.preventDefault();
    this.props.history.goBack()
  }

  render(){
    return(
      <div>
        <h1>Search Results for: "{this.props.match.params.query}"</h1>
        <Link to='/' className="back__button">Back To Search</Link>
        {this.state.pubs.length === 0 ? <div>Loading...</div> :
          <ul>
            {this.state.pubs.map(p => (
              <li className="pub__list"  key={p.id}>
                <Link to={`/pub/${p.id}`} query={this.state.query}>
                  {p.name} ({p.location})
                </Link>
              </li>
            ))}
          </ul>
        }
        <h2>Map</h2>
      </div>
    )
  }
}

export default SearchResults;