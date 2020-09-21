import React from 'react'
import BookItem from './BookItem'


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

export default BookShelf
