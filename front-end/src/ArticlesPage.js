import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import './ArticlesPage.css'; // Create and import a separate CSS file for styling

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Display 9 articles per page
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from your local WordPress REST API
    axios
      .get('http://localhost/wp-headless/server/wp-json/wp/v2/posts?_embed')
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Get current articles for the page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleArticleClick = (id) => {
    // Navigate to the details page of the article
    navigate(`/article/${id}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {/* Add Header component */}
      <Header />

      {/* Main content of the page */}
      <div className="articles-container">
        <h1>Latest Articles</h1>
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p>{error}</p>
        ) : currentArticles.length > 0 ? (
          <>
            {/* Display articles in a responsive grid */}
            <div className="articles-grid">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="article"
                  onClick={() => handleArticleClick(article.id)}
                >
                  {/* Check if the article has a featured image */}
                  {article._embedded && article._embedded['wp:featuredmedia'] ? (
                    <img
                      src={article._embedded['wp:featuredmedia'][0].source_url}
                      alt={article.title.rendered}
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                  {/* Place the title below the image */}
                  <h2>{article.title.rendered}</h2>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="pagination">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No articles found.</p>
        )}
      </div>

      {/* Add Footer component */}
      <Footer />
    </>
  );
};

export default ArticlesPage;
