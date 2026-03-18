import './App.css'
import BookList from './components/BookList'

function App() {
  return (
    <section id="center">
      <h1>Marginalia Bookstore</h1>
      <p>"Marginalia" is the word that describes the notes readers put in the magins of their books</p>
      <p>We know you'll love these books enough to make your own marginalia!</p>
      <BookList />
    </section>
  )
}

export default App
