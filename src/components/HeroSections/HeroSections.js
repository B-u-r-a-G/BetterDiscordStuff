import React from 'react';
import './HeroSections.css';
import { GitHubButton, BDButton } from '../Buttons/Buttons.js';
import AddonCard from '../AddonCard/AddonCard.js';
import Addons from '../../addons.json';

const Plugins = Addons.plugins;
const Themes = Addons.themes;

export function IntroSection() {
    return (
        <div id="hero-top-container" className="flex-container align-center justify-center direction-column">
            <h1 className="text-center title">My plugins and themes</h1>
            <p className="text-center title-description">Here you can find my plugins and themes. Don't expect anything good</p>
            <div className="btn-container">
                <GitHubButton href="https://github.com/HypedDomi/BetterDiscordStuff" text="View on GitHub" />
                <BDButton href="https://betterdiscord.app" text="Install BetterDiscord" />
            </div>
        </div>
    );
}

export function PluginSection() {
    return (
        <section className="page-section" id="plugins">
            <div className="addons-header page-section-inner flex-container justify-between align-center">
                <h1 className="title">Plugins</h1>
            </div>
            <div className="page-section-inner">
                <div className="addon-card-container">
                    {
                        Plugins.map(plugin => (
                            <AddonCard
                                key={plugin.name}
                                name={plugin.name}
                                description={plugin.description}
                                downloadUrl={plugin.downloadUrl}
                                gitHubUrl={plugin.gitHubUrl}
                            />
                        ))
                    }
                </div>
            </div>
            <div style={{ paddingTop: '30px' }} />
        </section>
    );
}

export function ThemeSection() {
    return (
        <section className="page-section" id="themes">
            <div className="addons-header page-section-inner flex-container justify-between align-center">
                <h1 className="title">Themes</h1>
            </div>
            <div className="page-section-inner">
                <div className="addon-card-container">
                    {
                        Themes.map(themes => (
                            <AddonCard
                                key={themes.name}
                                name={themes.name}
                                description={themes.description}
                                imageUrl={themes.imageUrl}
                                downloadUrl={themes.downloadUrl}
                                gitHubUrl={themes.gitHubUrl}
                                previewUrl={themes.previewUrl}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}