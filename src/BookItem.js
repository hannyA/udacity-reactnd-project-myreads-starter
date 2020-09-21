import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookItem extends Component {
  

  constructor(props) {
    console.log('Book item constructor protops:', props)
  	super(props)
  }

  /*
  state = {
    book: {}
  }

  componentDidMount() {
    console.log('componentDidMount this.props.book:')
    console.log('componentDidMount this.props.book:', this.props.book)

    this.setState({
  	  book: this.props.book
  })}
*/
  //TODO: Replace this in App.js
  
  updateShelf = (shelf, book) => {
    console.log('Book item:', shelf)
    console.log('Book item protops:', this.props)
    this.props.onMovedShelf(book, shelf)
  }

  
   shelvesDict = {currentlyReading: 'Currently Reading',
                     wantToRead: 'Want to Read', 
                     read: 'Read',
                     none: 'None'}

  render() {
        
    const { book } = this.props
       
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, 
                                               height: 193, 
                                               backgroundImage: `url("${book['imageLinks']['thumbnail']}")` }}>

			</div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => this.updateShelf(e.target.value, book)}>
              	<option value="move" disabled>Move to...</option>
              	{Object.keys(this.shelvesDict).map((shelf) => (
                  <option key={shelf} value={shelf}>{this.shelvesDict[shelf]}</option>
              	))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>   
    )
  }
}

BookItem.propTypes = {
 book: PropTypes.object.isRequired
}

export default BookItem
