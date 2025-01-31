import { BrowserRouter, Routes, Route, Link, HashRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import FloatingOrbs from './components/FloatingOrbs'
import AllArticlesPage from './pages/AllArticlesPage'
import ThemeToggle from './components/ThemeToggle'
import CopyrightPage from './pages/CopyrightPage'
import icon from './assets/Vector.png'

const App = () => {
  return (
    <HashRouter>
      <div className="app-container">
        <div className="background-gradient"></div>
        <FloatingOrbs />
        <nav className="nav-bar">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <img src={icon} style={{width: 30, height: 30, marginRight: 10}}/>
            <h1>POLACY W SPORCIE</h1>
            </div>
          </Link>
          <div className="nav-menu">
            <Link to="/articles" className="nav-link">Wszystkie artykuły</Link>
            <Link to="/about" className="nav-link">Prawa autorskie</Link>
            <Link to="https://github.com/michall646/PolskiZadanie" className="nav-link">Github</Link>
            <ThemeToggle />
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticlesPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/about" element={<CopyrightPage/>} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App;
