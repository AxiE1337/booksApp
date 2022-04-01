import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuth from './hooks/useAuth'
import { MainPage } from './pages/MainPage'
import NavBar from './components/NavBar'
import BookPage from './pages/BookPage'
import SearchForBooks from './pages/SearchForBooks'
import LikedBooksPage from './pages/LikedBooksPage'
import Settings from './pages/Settings'

function App() {
  const { isLoggedIn } = useAuth()
  const settings = useSelector((state: any) => state.settings.theme)

  return (
    <div className='App' data-theme={settings}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/page/:page' element={<MainPage />}>
            <Route path=':filter' element={<MainPage />} />
          </Route>
          <Route path='/book/:id' element={<BookPage />} />
          <Route path='/findBook/:word' element={<SearchForBooks />} />
          {isLoggedIn && (
            <Route path='/likedBooks' element={<LikedBooksPage />} />
          )}
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='/page/1' />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
