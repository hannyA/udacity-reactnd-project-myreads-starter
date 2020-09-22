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


  componentDidMount() {
    console.log("Component Did mount")
    BooksAPI.getAll()
	  .then((books) => {
    	this.setState(() => ({
          	books
        }))
      })
  }
  
//TODO: Add this as prop to BookShelf to get new shelf from BookItem 
  // and then we can update the shelves and rerender them

  updateShelf = (movedBook, shelf) => {
    console.log('Update shelf called')
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
    				 //query={this.state.query} 
					 //searchResults={this.state.searchResults} 
					 //updateQuery={this.updateQuery}
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
