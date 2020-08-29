import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchResult from './search/SearchResult'

class BooksApp extends React.Component {
  
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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

    console.log("current correct query: ", query )
 	
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
    
    const currentBooks = this.state.books.filter((book) => (
      book.shelf === 'currentlyReading'
    ))

    const wantBooks = this.state.books.filter((book) => (
      book.shelf === 'wantToRead'
    ))

    const readBooks = this.state.books.filter((book) => (
      book.shelf === 'read'
    ))

    console.log('this.state.books: ', this.state.books)


    return (
      <div className="app">
       <Route exact path='/search' render={() => (
          
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
				  <SearchResult key={book.id} book={book}/>
                ))}
			  </ol>
            </div>
          </div>
        )} />





       <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>         
         		<BookShelf books={currentBooks} shelfName='Currently Reading' onMovedShelf={this.updateShelf}/>
         		<BookShelf books={wantBooks} shelfName='Want to Read' onMovedShelf={this.updateShelf}/>
         		<BookShelf books={readBooks} shelfName='Read' onMovedShelf={this.updateShelf}/>
              </div>
            </div>
            <div className="open-search">
				<Link
					to='/search'>Add a book
				</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
