import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import FloatingOrbs from './components/FloatingOrbs'
import AllArticlesPage from './pages/AllArticlesPage'
import ThemeToggle from './components/ThemeToggle'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="background-gradient"></div>
        <FloatingOrbs />
        <nav className="nav-bar">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>POLACY W SPORCIE</h1>
          </Link>
          <div className="nav-menu">
            <Link to="/articles" className="nav-link">Wszystkie artykuły</Link>
            <Link to="/about" className="nav-link">O nas</Link>
            <ThemeToggle />
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticlesPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/about" element={<div className="glass article-content">O nas</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
