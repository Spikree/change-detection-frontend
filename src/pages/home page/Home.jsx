import React from "react";
import Hero from "../../components/hero/Hero";
import WhatWeDo from "../../components/what we do/WhatWeDo";
import Demo from "../../components/Demo/Demo";
import Feedback from "../../components/Demo/Feedback";

const Home = () => {
  return (
    <div className="home">
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <WhatWeDo />
      </section>
      <section id="demo">
        <Demo />
      </section>
      <section id="contact">
        <Feedback />
      </section>
    </div>
  );
};

export default Home;
