import './App.css'
import BookList from './components/BookList'

function App() {
  return (
    <div className="container py-5">
      <header className="text-center mb-4">
        <h1 className="mb-2">Marginalia Bookstore</h1>
        <p className="book-subtitle mb-1">
          “Marginalia” describes the notes readers write in the margins of their books.
        </p>
        <p className="book-subtitle mb-0">
          We know you’ll love these books enough to make your own marginalia.
        </p>
      </header>

      <BookList />
    </div>
  )
}

export default App
