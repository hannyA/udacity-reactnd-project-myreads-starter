import React, {Component} from 'react'



class OptionSelected extends Component {
  
  render() {
    const shelves = ['currentlyReading', 'wantToRead', 'read', 'none']
   
    const optionsDict = {currentlyReading: 'Currently Reading',
                       wantToRead: 'Want to Read', 
                       read: 'Read',
                       none: 'None'}

    const { shelfTitle} = this.props
  
    return (
      
      <select value={shelfTitle}>
  
      	<option value="move" disabled>Move to...</option>
      	{shelves.map((shelf) => (
	      <option value={shelf}>{optionsDict[shelf]}</option>
       
		))}
      </select>

    )
  }
}
  

class BookItem extends Component {
      
  constructor(props) {
  	super(props)
    this.state = {
      book: this.props.book
    }   
  }
 
  render() {
    
    return (
      <li key={this.state.book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.state.book['imageLinks']['thumbnail']}")` }}></div>
            <div className="book-shelf-changer">

              <OptionSelected key={this.state.book.shelf} shelfTitle={this.state.book.shelf} />

            </div>
          </div>
          <div className="book-title">{this.state.book.title}</div>
          <div className="book-authors">{this.state.book.authors}</div>
        </div>
      </li>   
    )
  }
}


export default BookItem
