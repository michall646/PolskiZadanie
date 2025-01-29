import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsItems, categoryNames } from '../data/newsItems'

function AllArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main className="article-page">
      <h1 className="page-title">Wszystkie Artykuły</h1>
      
      <div className="filter-buttons">
        {Object.keys(categoryNames).map(category => (
          <button
            key={category}
            className={`nav-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {categoryNames[category]}
          </button>
        ))}
      </div>

      <div className="articles-list">
        {newsItems
          .filter(item => activeCategory === 'all' || item.category === activeCategory)
          .map(article => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`} 
              className="article-list-item glass"
            >
              <span className="category">{article.category}</span>
              <h2>{article.title}</h2>
              <p className="article-preview">{article.content}</p>
              <p className="article-author">By {article.author}</p>
            </Link>
          ))}
      </div>
    </main>
  );
}

export default AllArticlesPage;
