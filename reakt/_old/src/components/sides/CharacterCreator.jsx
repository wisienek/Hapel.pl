import { Link } from "react-router-dom";

import { FaUserEdit } from 'react-icons/fa';

const title = "Kreator Skinów";
const header = "skins";

const CharacterCreator = () => {
    return (
        <li className="sideLi">
            <Link to={ header? header: "#" }>
                <FaUserEdit style={{ width: 54, height: 54 }} />
            </Link>

            <span className="item-label">
                {title}
            </span>
        </li>
    )
}

export default CharacterCreator;
