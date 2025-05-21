import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

const ArticleDetails = () => {
  const { id } = useParams(); // Get the article ID from the URL parameters
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the details of the article using the ID
    axios
      .get(`http://localhost/wp-headless/server/wp-json/wp/v2/posts/${id}`)
      .then((response) => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching article details:', error);
        setError('Error fetching article details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {/* Add Header component */}
      <Header />
      
      {/* Main content of the page */}
      <div className="article-details-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {loading ? (
          <p>Loading article details...</p>
        ) : error ? (
          <p>{error}</p>
        ) : article ? (
          <div>
            <h1>{article.title.rendered}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: article.content.rendered }}
              style={{ lineHeight: '1.6', marginTop: '20px' }}
            />
          </div>
        ) : (
          <p>Article not found.</p>
        )}
      </div>
      
      {/* Add Footer component */}
      <Footer />
    </>
  );
};

export default ArticleDetails;
