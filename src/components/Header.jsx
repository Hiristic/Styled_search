import React from 'react';

const Header = () => (
  <header className="homepage-header">
    <h1 className="homepage-header__title">
     Innekoll
    </h1>
    <h2 className="homepage-header__subtitle ani-fadein">
      <span className="ani-reveal">Koll </span>
      <span className="ani-reveal ani-reveal--lighter">på </span>
      <span className="ani-reveal ani-reveal--lightest">Innehåll</span>
    </h2>
  </header>
);

export default Header;
