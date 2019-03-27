import React from "react";
import Search from "./search";
import Results from "../results";
import { BASE_API_URL } from "../../const";

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: null,
      results: null
    };

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.search = this.search.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  setSearchQuery(e) {
    this.setState({ searchQuery: e.target.value });
  }

  search() {
    if (!this.state.searchQuery)
      return;
    const options = {
      crossDomain: true,
      method: 'GET'
    };
    const url = `${BASE_API_URL}/search?q=${this.state.searchQuery}`;

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

  render() {
    return (
      <div>
        <Search 
          setSearchQuery={this.setSearchQuery} 
          search={this.search}
          onEnterPress={this.onEnterPress} 
        />
        <Results results={this.state.results} />
      </div>
    );
  }
}
