import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './Item.css'

function Item({title, releaseDate, posterUrl, genres, rating}) {
    const subtitle = [
        // Some movies have no known release date
        releaseDate ? releaseDate.getFullYear() : 'Unknown',
        genres.map(g => g.name).join(', ')
    ].filter(str => !!str).join(' • ');
    
    return (
        <article className="Item">
            <img src={posterUrl} />
            <h2>{title}</h2>
            <span className="Item-subtitle">
                {subtitle}
            </span>
            <div className="Item-bubble">
                <FontAwesomeIcon icon={faStar} />
                <span className="Item-bubble-rating">{rating}</span>
            </div>
        </article>
        
    )
}


export default Item;