import React from "react";
import { Link } from "react-router-dom"; 
import "./Landing_Page.css";

function Landing_Page() {
  return (
    <div className="container-xl h-100 py-5 d-flex flex-columnn align-items-center">
    <section className="hero-section">
        <div>
          <div data-aos="fade-up" className="flex-hero">
              
              <h1>
                Your Health<br/>
                <span className="text-gradient">
                  
                  Our Responsibility
                </span>
              </h1>
                <div className="blob-cont">
                    <div className="blue blob"></div>
                </div>
                <div className="blob-cont">
                    <div className="blue1 blob"></div>
                </div>
              <h4>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem! 
              </h4>
              <a className="btn btn-primary mb-5 btn-lg px-4" href="#services">
                Get Started
              </a>
                
          </div>
  
        </div>
      </section>
    </div>
  );
}

export default Landing_Page;