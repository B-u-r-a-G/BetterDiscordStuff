import './AddonCard.css';
import { GitHubButton, DownloadButton, PreviewButton } from '../Buttons/Buttons.js';
import thumbnail from '../../assets/thumbnail.svg';

function AddonCard(props) {
    return (
        <div className="addon-card" style={ props.imageUrl ? {"flex-direction": "column"} : null}>
            {
                props.imageUrl && (
                    <img loading="lazy" onError={(e) => e.target.src = `${thumbnail}`} class="addon-card-image" src={props.imageUrl} alt={props.name} />
                )
            }
            <div className="addon-card-inner">
                <h3 className="addon-card-title">{props.name}</h3>
                <p className="addon-card-description">{props.description}</p>
                <div className="addon-card-buttons">
                    <div className="btn-container">
                        <DownloadButton href={props.downloadUrl} text="Download" />
                        {
                            props.previewUrl && <PreviewButton href={props.previewUrl} text="Preview" />
                        }
                        <GitHubButton href={props.gitHubUrl} text="Source" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddonCard;