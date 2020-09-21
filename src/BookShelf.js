import React from 'react'
import BookItem from './BookItem'
import PropTypes from 'prop-types';


const BookShelf = (props) => {
	  
  const {books, shelfName, onMovedShelf } = props  
    
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <BookItem book={book} key={book.id} onMovedShelf={onMovedShelf}/>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  onMovedShelf: PropTypes.func.isRequired
}


export default BookShelf
