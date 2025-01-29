import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsItems, categoryNames } from '../data/newsItems'

const NewsCard = ({ id, title, content, category }) => (
  <Link to={`/article/${id}`} className="news-card-link">
    <div className="glass news-card">
      <span className="category">{category}</span>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  </Link>
);

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main>
      <div className="nav-links">
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

      <div className="news-grid">
        {newsItems
          .filter(item => activeCategory === 'all' || item.category === activeCategory)
          .map((item) => (
            <NewsCard 
              key={item.id}
              {...item}
            />
          ))}
      </div>
    </main>
  )
}

export default HomePage
