import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'

class BookCase extends Component {
  
  render() {
    const {searchResults, query, updateQuery} = this.props
    
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
              value={query}
              onChange={(e)=> updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
              <BookItem key={book.id} book={book} onMovedShelf={this.updateShelf}/>
            ))}
          </ol>
        </div>
      </div>
	)}
}

export default BookCase