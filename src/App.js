import React, { Component } from 'react';
import './App.css';

// Defining a couple of constants for API query
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
// const list = [
//   {
//     title: "React",
//     url: "https://reactjs.org/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 8,
//     points: 5,
//     objectID: 1,
//   },
// ]

// Higher order helper function
// const isSearched = (seacrhItem) => (item) => {
//   return item.title.toLowerCase().includes(seacrhItem.toLowerCase());
// }

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,

    };

    // Binding 'this' to functions
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);


  }

  // sets result state to the term being searched
  setSearchTopStories(result) {
    this.setState({ result }); // result:result
  }

  fetchSearchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  // fetches results from the api after the components  have mounted
  componentDidMount() {
    const { searchTerm } = this.state;
    // Using the fetch native API to get results from hacker-news api
    this.fetchSearchTopStories(searchTerm);
  }

  // updating searchTerm state whenever input form gets  a keyword
  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onSearchSubmit(event){
    this.fetchSearchTopStories(this.state.searchTerm);
    //prevents  refreshing the page after each search
    event.preventDefault();
  }

  // updates the list state by filtering out the objectID of dismissed object
  onDismiss(id) {
    const isNotId = (item) => item.objectID !== id;
    const updatedList = this.state.result.hits.filter(isNotId);
    this.setState({
      //list: updatedList, this wont update the results fetched from hackernews api 
      result: { ...this.state, hits: updatedList }
    })
  }


  //Renders the app
  render() {
    const { searchTerm, result } = this.state; //deconstructing the state
    const heading = "Hacker News clone"

    if (!result) { return null; }

    return (

      <div className="page">
        <div className="interactions">
          <h1>{heading}</h1>
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit} >
            Search
          </Search>
        </div>
        {/* pattern={searchTerm}  */}
        <Table heading={heading} list={result.hits} onDismiss={this.onDismiss} />
      </div>
    )
  }
}

// Search component
//same as const Search = () => { return ()}
const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit = {onSubmit}>
    {children} < input type="text" value={value} onChange={onChange} />
    <button type= "submit">{children}</button>
  </form>
  
)

// Table component
// pattern
const Table = ({ list, onDismiss }) => {

  const largeColumn = { width: '40%', };
  const midColumn = { width: '30%', };
  const smallColumn = { width: '10%', };

  return (
    <div className="table">
      {/* filter(isSearched(pattern)) */}
      {list.map((item) =>
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span style={smallColumn}>
            {item.num_points}
          </span>
          <span style={smallColumn}>
            {item.objectID}
          </span>
          <span style={smallColumn}>
            <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>
              Dismiss
        </Button>
          </span>
        </div>
      )}

    </div>
  )

}

// Button component
const Button = ({ onClick, className, children }) => (

  <button onClick={onClick} className={className} type="button" >
    {children}
  </button>

)

export default App;