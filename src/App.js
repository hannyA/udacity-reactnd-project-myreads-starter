import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
//import SearchResult from './search/SearchResult'
//import BookItem from './BookItem'
import SearchPage from './SearchPage'
import BookCase from './BookCase'

class BooksApp extends Component {
  
  state = {
    books: []
  }

	// Get all books from server after components loads.
  componentDidMount() {
    console.log("Component Did mount")
    BooksAPI.getAll()
	  .then((books) => {
    	this.setState(() => ({
          	books
        }))
      })
  }
  
  // Move book to new shelf and update it on server
  updateShelf = (movedBook, shelf) => {
  	movedBook.shelf = shelf
    
    this.setState((currentState) => ({      
      books: [...currentState.books.filter((book) => book.id !== movedBook.id), movedBook]      
    }))
    
    BooksAPI.update(movedBook, shelf) 
  }
 

  render() {
    return (
      <div className="app">
       <Route exact path='/search' render={() => ( 
         <SearchPage books={this.state.books}
					 updateShelf={this.updateShelf}/>
        )} />

       <Route exact path='/' render={() => (
         <BookCase books={this.state.books} 
				   updateShelf={this.updateShelf} />
		)} />
      </div>
    )
  }
}

export default BooksApp