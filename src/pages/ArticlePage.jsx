import { useParams, Link } from 'react-router-dom'
import { newsItems } from '../data/newsItems'

function ArticlePage() {
  const { id } = useParams()
  const article = newsItems.find(item => item.id === parseInt(id))
  console.log(article);

  if (!article) {
    return <div>Article not found</div>
  }

  const getContent = () => {
    console.log(article.images.length)
    return article.paragraphs.map((item, index) => <><p>{item}</p>{index % 2 == 0 && <img style={{width: '80%'}} src={article.images[index / 2 % article.images.length ]}/>}</>)
  }

  return (
    <main className="article-page">
      <Link to="/" className="back-button glass">
        ← Back to News
      </Link>
      
      <article className="glass article-content">
        <span className="category">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="author">Napisane przez: {article.author}</p>
        <div className="content">
          {getContent()}
        </div>
      </article>
    </main>
  )
}

export default ArticlePage
