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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list,   //same as list : list
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id){
    this.setState({
      list: this.state.list.filter( (item) => item.objectID!==id)
    })
  }

  render() {
    const heading = "Hacker News clone"
    return (
      <div className="App">
        <h1>{heading}</h1>
        {this.state.list.map((item) => (
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
