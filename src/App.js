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

      <div className="page">
        <div className="interactions">
          <h1>{heading}</h1>
          <Search value={searchTerm} onChange={this.onSearchChange} >
            Search
          </Search>
        </div>
        <Table heading={heading} list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    )
  }
}

//same as const Search = () => { return ()}
const Search = ({ value, onChange, children }) => (
  <form>
    {children} < input type="text" value={value} onChange={onChange} />
  </form>
)

const Table = ({ list, pattern, onDismiss }) => {

  const largeColumn = { width: '40%', };
  const midColumn = { width: '30%', };
  const smallColumn = { width: '10%', };

  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map((item) =>
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
            <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>
              Dismiss
        </Button>
          </span>
        </div>
      )}

    </div>
  )

}


const Button = ({ onClick, className, children }) => (

  <button onClick={onClick} className={className} type="button" >
    {children}
  </button>

)

export default App;
