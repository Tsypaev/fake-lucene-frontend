import React from "react";
import Search from "./search";
import Results from "../results";
import { BASE_API_URL } from "../../const";
import Controls from "../controls";

const scrappingResponse = {

};

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: null,
      results: null,
      type: 'all',
      isLucene: false,
      scrapping: false
    };

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.search = this.search.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleIsLucene = this.toggleIsLucene.bind(this);
    this.toggleScrapping = this.toggleScrapping.bind(this);
  }

  setSearchQuery(e) {
    this.setState({ searchQuery: e.target.value });
  }

  search() {
    const { searchQuery, type, isLucene, scrapping } = this.state;
    if (!searchQuery)
      return;
    
    const options = {
      crossDomain: true,
      method: 'GET'
    };

    const route = scrapping ? 'getMovie' : isLucene ? 'lucene/search' : 'search';

    const url = `${BASE_API_URL}/${route}?q=${searchQuery}&type=${type}&id=${searchQuery}`;

    fetch(url, options)
      .then(responce => responce.json())
      .then(results => this.setState({ results }))
      .catch(e => console.log(e));
  }

  onEnterPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.search();
    }
  }

  toggleIsLucene() {
    this.setState({
      isLucene: !this.state.isLucene
    })
  }

  onChange(e) {
    this.setState({type: e.target.value });
  }

  toggleScrapping() {
    this.setState({
      scrapping: !this.state.scrapping
    });
  }

  render() {
    return this.state.scrapping ? 
    <div>
      <button onClick={this.toggleScrapping}>
        Search
      </button>
      <Search
        setSearchQuery={this.setSearchQuery}
        search={this.search}
        onEnterPress={this.onEnterPress}
      />
      {this.state.results ? (
        <div className='scrapping-results'>
          {this.state.results.title ?
          <p>{this.state.results.title}</p> : null}
          {this.state.results.year ? 
            <p>{this.state.results.year}</p> : null}
          {this.state.results.premierData ? 
            <p>{this.state.results.premierData}</p> : null}
          {this.state.results.genresList ?  
            <p>{this.state.results.genresList}</p> : null}
          {this.state.results.director ? 
            <p>{this.state.results.director}</p> : null}
          {this.state.results.filmStars ?
            <p>{this.state.results.filmStars}</p> : null}
          {this.state.results.annotation ? 
            <p>{this.state.results.annotation}</p> : null}
          {this.state.results.synopsis ? 
            <p>{this.state.results.synopsis}</p> : null}
        </div>
      ) : null}
    </div> : (
      <div>
        <button onClick={this.toggleScrapping}>
          Scrapping
        </button>
        <Search 
          setSearchQuery={this.setSearchQuery} 
          search={this.search}
          onEnterPress={this.onEnterPress} 
        />
        <Controls 
          type={this.state.type}
          onChange={this.onChange}
          isLucene={this.state.isLucene}
          toggleIsLucene={this.toggleIsLucene}
        />
        <Results results={this.state.results} />
      </div>
    );
  }
}
