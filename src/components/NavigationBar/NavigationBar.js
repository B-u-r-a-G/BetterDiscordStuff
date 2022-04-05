import './NavigationBar.css';
import smallLogo from '../../assets/BD.svg';
import bigLogo from '../../assets/BetterDiscord.svg';
import { DiscordButton } from '../Buttons/Buttons';

export default function NavigationBar() {
  return (
    <div id="navbar" className="page-section flex-container align-center">
      <div id="navbar-inner">
        <a href='/'>
          <img src={smallLogo} className="navbar-logo small" alt="" />
          <img src={bigLogo} className="navbar-logo" alt="" />
        </a>
        <div id="navbar-items">
          <NavigationItem text="Plugins" link="#plugins" />
          <NavigationItem text="Themes" link="#themes" />
          <DiscordButton text="Discord" href="https://discord.gg/gp2ExK5vc7" />
        </div>
      </div>
    </div>
  );
}

function NavigationItem(props) {
  return (
    <div className="navbar-item">
      <a href={props.link}>
        <span>{props.text}</span>
      </a>
    </div>
  );
}