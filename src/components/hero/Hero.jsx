import React, { useState, useEffect } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import Background from "./Background"; // Adjust the import path as needed

const Hero = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.2);
  const [scale, setScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let animationFrameId;

    if (isAnimating) {
      const animate = () => {
        setRotationSpeed((prev) => Math.min(prev + 0.01, 2));
        setScale((prev) => Math.min(prev + 0.02, 5));

        if (scale < 3) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          navigate("/main");
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAnimating, scale, navigate]);

  const handleClick = () => {
    setIsAnimating(true);
  };

  return (
    <section id="hero" className="hero">
      <Background rotationSpeed={rotationSpeed} scale={scale} />
      <div className="hero-content">
        <div className="hero-top mb-20">
          <h1 className="text-5xl font-medium">
            Witness the Apocalyptic scale of human destruction on Earth's
            ecosystems
          </h1>
        </div>

        <div className="hero-bottom">
          <button
            className="p-3 px-6 mt-16 border border-gray-600"
            onClick={handleClick}
          >
            Try now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
