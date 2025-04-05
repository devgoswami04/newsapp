import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import './news.css' // Import the custom CSS

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: "general"
  };
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    await this.fetchNewsData();
  }

  async fetchNewsData() {
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=fb5c69c601754b2abbc697ac218221c3&page=${page}&pageSize=${pageSize}`;
    
    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  handleNextClick = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    await this.fetchNewsData();
    window.scrollTo(0, 0);
  }

  handlePreviousClick = async () => {
    await this.setState(prevState => ({ page: prevState.page - 1 }));
    await this.fetchNewsData();
    window.scrollTo(0, 0);
  }

  render() {
    const { articles, loading, page, totalResults } = this.state;
    const { pageSize, category } = this.props;

    return (
      <div className="container">
        <h1 className="section-title">Chronicle - Top Headlines</h1>
        
        {loading && <Spinner />}
        
        <div className="news-container">
          {!loading && articles.map((article) => (
            <div className="news-card" key={article.url}>
              <div className="news-img-container">
                <img 
                  src={article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  className="news-img" 
                  alt={article.title} 
                />
              </div>
              <div className="news-body">
                <h3 className="news-title">{article.title?.slice(0, 60)}{article.title?.length > 60 ? "..." : ""}</h3>
                <p className="news-description">
                  {article.description?.slice(0, 100)}{article.description?.length > 100 ? "..." : ""}
                </p>
                <div className="news-meta">
                  <span className="news-source">{article.source?.name}</span>
                  <span className="news-date">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="news-category">{category}</span>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more-btn"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button 
            disabled={page <= 1} 
            className={`page-link ${page <= 1 ? 'disabled' : ''}`}
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          
          <span className="page-link active">{page}</span>
          
          <button 
            disabled={page + 1 > Math.ceil(totalResults / pageSize)} 
            className={`page-link ${page + 1 > Math.ceil(totalResults / pageSize) ? 'disabled' : ''}`}
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News