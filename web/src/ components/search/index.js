import React from "react";
import Search from "./search";
import Results from "../results";
import { BASE_API_URL } from "../../const";
import Controls from "../controls";

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: null,
      results: null,
      type: 'all',
      isLucene: false
    };

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.search = this.search.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleIsLucene = this.toggleIsLucene.bind(this);
  }

  setSearchQuery(e) {
    this.setState({ searchQuery: e.target.value });
  }

  search() {
    const { searchQuery, type, isLucene } = this.state;
    if (!searchQuery)
      return;
    
    const options = {
      crossDomain: true,
      method: 'GET'
    };

    const route = isLucene ? 'lucene/search' : 'search';

    const url = `${BASE_API_URL}/${route}?q=${searchQuery}&type=${type}`;

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

  render() {
    return (
      <div>
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
