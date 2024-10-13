import React from "react";
import "./WhatWeDo.css";

const WhatWeDo = () => {
  return (
    <section id="what-we-do">
      <div className="what-we-do-top">
        <h2 className="text-4xl p-6 py-10">What we do</h2>
      </div>

      <div className="mission bg-zinc-800 text-lg">
        <p>
          {" "}
          <span>Our Mission </span>
          In an era of rapid industrialization and urban expansion,
          understanding the consequences of human activity on our environment
          has never been more crucial. our mission is to address this pressing
          issue by providing advanced tools and insights into environmental
          change driven by human actions.
        </p>
      </div>

      <div className="problem bg-zinc-800 text-lg">
        <p>
          <span>The Problem </span>
          Human activities, ranging from deforestation and urbanization to
          industrial pollution, have a profound and often detrimental impact on
          our planet. These changes not only affect biodiversity and ecosystems
          but also contribute to broader issues such as climate change and
          resource depletion. Unfortunately, tracking and quantifying these
          impacts in a timely and accurate manner has been a significant
          challenge.
        </p>
      </div>

      <div className="what-are-we-solving bg-zinc-800 text-lg">
        <p>
          <span>What We Are Solving</span>
          Precise Change Detection: By leveraging state-of-the-art image
          processing and machine learning techniques, we detect and analyze
          alterations in land use and environmental conditions with
          unprecedented accuracy.
        </p>

        <p>
          Data-Driven Insights: We integrate diverse data sources, including
          satellite imagery and remote sensing data, to deliver actionable
          insights that guide effective decision-making and policy formulation.
        </p>
      </div>
    </section>
  );
};

export default WhatWeDo;
