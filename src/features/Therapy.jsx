import React, { useState, useEffect } from "react";
import "./Therapy.css";

const Therapy = () => {
  const quotes = [
    "“Healing doesn’t mean the damage never existed. It means the damage no longer controls your life.”",
    "“You are allowed to be both a masterpiece and a work in progress at the same time.”",
    "“Your mental health is a priority. Take time to breathe, pause, and reset.”",
    "“Growth is growth, no matter how small.”",
    "“Talking about your feelings is a sign of strength, not weakness.”",
    "“Every emotion you feel is valid, important, and worth understanding.”"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="therapy-container">
      <h2 className="therapy-title">Therapy & Emotional Support 🌿</h2>

      <div className="quote-box">
        <p className="quote fade-in">{quotes[current]}</p>
      </div>

      <a
        href="https://chicagocounseling.org/individuals/?gad_source=1&gad_campaignid=22914839896&gbraid=0AAAAA9Xe-4dhqB5N8-ApSI2FBV6qa-Iav&gclid=Cj0KCQiA0KrJBhCOARIsAGIy9wDUP8ME4s30b_ykfxTdBq1dkntkbBBebcJi6eYKnUBe6OWOgccoVWYaAqxBEALw_wcB"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="therapy-btn">Request Therapy</button>
      </a>
    </div>
  );
};

export default Therapy;
