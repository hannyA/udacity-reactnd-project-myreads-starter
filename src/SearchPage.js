import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import * as BooksAPI from './BooksAPI'



class SearchPage extends Component {
  
  
  state = {
    query: '',
    searchResults: []
  }

 	//Updatequery updates the query and search results 
  updateQuery = (query) => {
 	
    if (query.length === 1) {
	  query = query.trim()
    }
    
  	this.setState(() => ({
      query: query
    }))
    
    if (query.length === 0) {
	  this.setState(() => ({
        searchResults: []
      }))
    } else {

      BooksAPI.search(query)
      .then((searchResults) => {

        if (this.state.query === query) {
          if (Array.isArray(searchResults)) {			
            const filteredBooks = searchResults.filter((book) => (
                	book.hasOwnProperty('imageLinks') && book['imageLinks'].hasOwnProperty('thumbnail')
            	)).map((resultBook) => {
	              
          		  const ownedBook = this.props.books.filter((book) => book.id === resultBook.id)
            
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
    const { updateShelf} = this.props
    
	return (  
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"> Close
          </Link>

          <div className="search-books-input-wrapper"> 
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e)=> this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <BookItem key={book.id} book={book} onMovedShelf={updateShelf}/>
            ))}
          </ol>
        </div>
      </div>
	)}
}

export default SearchPage
