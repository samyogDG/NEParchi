import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LandingPage.css";
import logo from "./assets/logo.jpg";
import logo2 from "./assets/logo2.jpg";

function LandingPage() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the fade-out process after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Navigate after the fade-out transition completes
      setTimeout(() => {
        navigate("/about"); // Adjust the path according to your route configuration
      }, 500); // Delay to allow for fade-out transition
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div className={`App ${fadeOut ? 'fade-out' : ''}`}>
      <div className="cinematic-bars">
        <div className="bar top"></div>
        <div className="bar bottom"></div>
      </div>
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="First Logo" className="logo-img first-logo" />
          <img src={logo2} alt="Second Logo" className="logo-img second-logo" />
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
