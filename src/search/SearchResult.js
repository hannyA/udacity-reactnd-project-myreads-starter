import React, {Component} from 'react'


class SearchResult extends Component {
  
  constructor(props) {
  	super(props)
    this.state = {
      book: this.props.book
    }
  }
  
  render() {
    
  	const shelves = ['currentlyReading', 'wantToRead', 'read', 'none']
   
  	const shelvesDict = {currentlyReading: 'Currently Reading',
                       wantToRead: 'Want to Read', 
                       read: 'Read',
                       none: 'None'}
    
    console.log(this.state.book)
    
	return (
     <li key={this.state.book.id}>
        <div className="book">
          <div className="book-top">

            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.state.book['imageLinks']['thumbnail']}")` }}></div>

            <div className="book-shelf-changer">

{    console.log('Book name:', this.state.book.title, ' Book shelf: ', this.state.book.shelf)

}
            <select value={this.state.book.shelf} >

              <option value="move" disabled>Move to...</option>
              {shelves.map((shelf) => (
                <option key={shelf} value={shelf}>{shelvesDict[shelf]}</option>
              ))}
            </select>

            </div>
          </div>
          <div className="book-title">{this.state.book.title}</div>
          <div className="book-authors">{this.state.book.authors}</div>
        </div>
      </li>     
    )
  }
}




export default SearchResult
