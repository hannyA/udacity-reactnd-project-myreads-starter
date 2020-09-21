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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false,
    books: [],
    query: '',
    searchResults: []
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
//    .then(() => ({}))
 
  }
  

  updateQuery = (query) => {

    console.log("current correct query: '" + query + "'" )
 	
    if (query.length === 1) {
	  query = query.trim()
    }
    
  	this.setState(() => ({
      query: query
    }))
    
    if (query.length === 0) {
      console.log("No search results")

	  this.setState(() => ({
        searchResults: []
      }))
    } else {
      console.log("BooksAPI Query")

      BooksAPI.search(query)
      .then((searchResults) => {

        if (this.state.query === query) {
          if (Array.isArray(searchResults)) {
            console.log("searchResults is array " )
			
            const filteredBooks = searchResults.filter((book) => (
                	book.hasOwnProperty('imageLinks') && book['imageLinks'].hasOwnProperty('thumbnail')
            	)).map((resultBook) => {
	              const ownedBook = this.state.books.filter((book) => book.id === resultBook.id)
            	  if (ownedBook.length > 0) {
                  	resultBook.shelf = ownedBook[0].shelf
                  } else {
                  	resultBook.shelf = 'none'
                  }
                  return resultBook
            	})
            this.setState(() => ({
                searchResults: filteredBooks
            }))  

          } else { // Results is object with error message
              console.log("searchResults is not array " )

              this.setState(() => ({
                searchResults: []
              }))   
          }   
        }                  
      })
    }
  }


  render() {
    
    console.log('this.state.books: ', this.state.books)

    return (
      <div className="app">
       <Route exact path='/search' render={() => ( 
          <BookCase query={this.state.query} searchResults={this.state.searchResults} updateQuery={this.updateQuery} />
        )} />

       <Route exact path='/' render={() => (
         <SearchPage books={this.state.books} updateShelf={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
