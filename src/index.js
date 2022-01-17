import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import NavigationBar from "./components/NavigationBar/NavigationBar.js";
import { IntroSection, PluginSection, ThemeSection } from "./components/HeroSections/HeroSections.js";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header>
          <NavigationBar />
        </header>
        <section className="home-hero-section">
          <div className="page-section-inner">
            <IntroSection />
            <PluginSection />
            <ThemeSection />
          </div>
        </section>
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);