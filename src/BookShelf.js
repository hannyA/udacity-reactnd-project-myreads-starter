import React, {Component} from 'react'
import BookItem from './BookItem'


class BookShelf extends Component {
	
  
  
  render() {

    const {books, shelfName} = this.props
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {books.map((book) => (
              <BookItem book={book} key={book.id}/>
            ))}

          </ol>
        </div>
      </div>

    
    )
  }
}


export default BookShelf
