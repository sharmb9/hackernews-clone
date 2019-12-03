import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 8,
    points: 5,
    objectID: 1,
  },
]

// Higher order helper function
const isSearched = (seacrhItem) => (item) => {
  return item.title.toLowerCase().includes(seacrhItem.toLowerCase());
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //same as list : list
      list,
      searchTerm: ""
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter((item) => item.objectID !== id)
    this.setState({
      list: updatedList
    }
    )
  }

  render() {
    const { searchTerm, list } = this.state; //deconstructing the state
    const heading = "Hacker News clone"
    return (
      <div className="App">
        <h1>{heading}</h1>
        <Search value = {searchTerm} onChange = {this.onSearchChange} >
          Search
        </Search>
        <Table heading = {heading} list ={list} pattern = {searchTerm} onDismiss = {this.onDismiss}/>
      </div>
    )
  }
}

class Search extends Component {
  render() {
    const { value, onChange, children} = this.props;
    return (
      <form>
        {children} < input type="text" value={value} onChange={onChange} />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss} = this.props;
    return (
      
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.points}</span>
            <span>{item.num_comments}</span>
            <span>{item.objectID}</span>
            <span>
              <button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
