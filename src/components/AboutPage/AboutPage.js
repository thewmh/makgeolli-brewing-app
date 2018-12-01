import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div className="about-page">
      <h1>
        About 막
      </h1>
      <p>Makgeolli (Korean: 막걸리, [mak.k͈ʌl.li]), sometimes anglicized to makkoli (/ˈmækəli/,[1] MAK-ə-lee), is a Korean alcoholic beverage. The milky, off-white and lightly sparkling rice wine has a slight viscosity that tastes slightly sweet, tangy, bitter, and astringent. Chalky sediment gives it a cloudy appearance.
      As a low proof drink of six to nine percent alcohol by volume, it is often considered a happy, communal beverage. In Korea, makgeolli is often unpasteurized, and the wine continues to mature in the bottle. Because of the short shelf life of unpasteurized "draft" makgeolli, many exported makgeolli undergo pasteurization, which deprives the beverage of complex enzymes and flavor compounds.</p>
    </div>
  </div>
);

export default AboutPage;
