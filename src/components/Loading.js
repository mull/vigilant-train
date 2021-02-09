import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import './Loading.css'

function Loading({hidden}) {
    return (
        <div className={cx('Loading', {'hidden': hidden})}>
            <FontAwesomeIcon icon={faSpinner} />
        </div>
    );
}

Loading.defaultProps = {
    hidden: false
};

export default Loading;