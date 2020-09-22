import React, {Component } from 'react'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

// Main webpage that shows user all books that they selected
class BookCase extends Component {
 
  render() {

    const { books, updateShelf } = this.props

    const currentBooks = books.filter((book) => (
      book.shelf === 'currentlyReading'
    ))

    const wantBooks = books.filter((book) => (
      book.shelf === 'wantToRead'
    ))

    const readBooks = books.filter((book) => (
      book.shelf === 'read'
    ))

  	return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>         
            <BookShelf books={currentBooks} shelfName='Currently Reading' onMovedShelf={updateShelf}/>
            <BookShelf books={wantBooks} shelfName='Want to Read' onMovedShelf={updateShelf}/>
            <BookShelf books={readBooks} shelfName='Read' onMovedShelf={updateShelf}/>
          </div>
        </div>
        <div className="open-search">
            <Link
                to='/search'>Add a book
            </Link>
        </div>
      </div>
    )}
}

BookCase.propTypes = {
  books: PropTypes.array.isRequired ,
  updateShelf: PropTypes.func.isRequired
}

export default BookCase