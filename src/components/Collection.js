import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import Item from './Item';
import Loading from './Loading';
import {getGenres, searchMovies, buildImageUrl} from '../api'

import './Collection.css'

// TODO: Move out to component. Or maybe don't try to replicate the design
//       The design with its custom arrow stumped me! (With the time limit in mind)
import './Select.css'
function Select({children, label, disabled}) {
    return (
        <div className='Select'>
            <select disabled={disabled}>
                {children}
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
        </div>
    )
}

// Some movies don't have posters
const MISSING_POSTER_IMAGE_URL = "https://via.placeholder.com/154x231.png?text=Missing"

// Movie item from API to a more simple representation for Item
function serializeItem(item, genreMap) {
    const posterUrl = item.poster_path ? buildImageUrl(item.poster_path, 'w154') : MISSING_POSTER_IMAGE_URL;
    const releaseDate = item.release_date ? new Date(item.release_date) : null;
    const genres = item.genre_ids.map(id => genreMap[id]);

    return {
        id: item.id,
        title: item.title,
        rating: item.vote_average,
        posterUrl,
        releaseDate,
        genres,
    }
}

function Collection() {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [genreMap, setGenreMap] = useState(null);
    const [collection, setCollection] = useState([]);
    const [pagination, setPagination] = useState({hasMore: false, nextPage: null});
    const [queryString, setQueryString] = useState('Wonder');
    const [currentPage, setCurrentPage] = useState(1);

    // Fetching genres to look them up is needed before any items can be rendered
    useEffect(() => {
        const fetchData = async () => {
            // TODO: Wrap in catch & handle errors
            const allGenres = await getGenres()
            const map = allGenres.genres.reduce((acc, next) => Object.assign(acc, {[next.id]: next}), {});
            setGenreMap(map);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!genreMap) return;
        if (queryString.length < 1) return;

        const fetchData = async () => {
            setIsLoadingData(true);
            // TODO: Wrap in catch & handle errors
            const itemList = await searchMovies(queryString, currentPage);
            const hasMore = itemList.page < itemList.total_pages;

            setPagination({hasMore, nextPage: hasMore && itemList.page + 1});
            setCollection(collection.concat(itemList.results.map(item => serializeItem(item, genreMap))));
            setIsLoadingData(false);
        };
        fetchData();
    }, [genreMap, queryString, currentPage])

    // TODO: Throttle/debounce (I can never remember which) so that each keystore doesn't result in a fetch
    // Also this is a raw function but should probably be something else. Alas, hooks are not yet my forte 
    function setSearchValue(value) {
        // Maybe it's worth just putting queryString, pagination, and currentPage, into one state.
        // There is currently no reason for them to be separate other than separation itself.
        setCollection([]);
        setQueryString(value);
        setPagination({hasMore: false, nextPage: null});
        setCurrentPage(1);
    }

    return (
        <div className="Collection">
            <div className="Collection-options">
                <div className="Search">
                    <input 
                        value={queryString}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder='Search movie, TV shows or actors'
                    />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <Select label='Sortera' disabled>
                    <option value='popularity.desc'>Popularity</option>
                    <option value='year.desc'>Year</option>
                </Select>
            </div>


            <div className="Collection-list">
                {collection.map(item => (
                    <Item key={item.id} {...item} />
                ))}
            </div>

            
            <div className="Collection-footer">
                <Loading hidden={!isLoadingData} />
                {(!isLoadingData && pagination.hasMore) && (
                    <button className="Collection-footer-button" onClick={() => setCurrentPage(currentPage + 1)}>Load more</button>
                )}
            </div>
        </div>
    )
}

export default Collection;