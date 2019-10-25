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

// Helper function to match the searched item with items in state
const isSearched = (searchTerm) => (item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list,   //same as list : list
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
    const heading = "Hacker News clone"
    const {searchTerm, list} = this.state; //deconstructing the state
    return (
      <div className="App">
        <h1>{heading}</h1>
        <form>
          <input type="text" onChange={this.onSearchChange} value = {searchTerm}></input>
        </form>

        {this.state.list.filter(isSearched( searchTerm)).map((item) => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.points}</span>
            <span>{item.num_comments}</span>
            <span>{item.objectID}</span>
            <span>
              <button onClick={() => this.onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        ))}

      </div>
    )
  }
}

export default App;
