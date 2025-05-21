import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";
import Header from "./Header";
import Footer from "./Footer";

function AboutPage() {
  return (
    <div className="about-page">
      <Header />
      <div className="about-container">
        <div className="about-content">
        <div className="about-heading">
        
          <h1>  Art | Interior | Architecture</h1>
          <p>Formed by two words: Nepal and architecture, Neparchi is a platform
            covering projects, articles, news, events, and blogs related to arts, interiors, architecture, and other related fields.
          </p>
          </div>
          {/* Grid Layout with Images */}
          <div className="about-grid">
            {[
              {
                imgSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                title: "Our Mission",
                text: "We strive to create meaningful solutions that blend technology and art. Our goal is to innovate in ways that resonate with both the human and technical aspects of the world."
              },
              {
                imgSrc: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                title: "Our Values",
                text: "Creativity, innovation, and integrity are the pillars of our work. Each project is driven by a passion for pushing boundaries and delivering results that matter."
              },
              {
                imgSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                title: "Our Team",
                text: "A diverse team of engineers and artists working together to shape the future. Meet the people behind the creativity and innovation."
              },
             
            ].map((card, index) => (
              <div className="about-card" key={index}>
                <img src={card.imgSrc} alt={card.title} className="card-image" />
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </div>
            ))}
          </div>

          <div className="articles-link-container">
            <Link to="/articles" className="articles-link">
              Explore Our Work
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
