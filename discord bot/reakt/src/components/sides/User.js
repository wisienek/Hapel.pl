import { Link } from "react-router-dom";

const UserSide = ({ user }) => {
    return (
        <li className="sideLi">

            <Link to={ `/user` }>

                <img src={user.avatar} alt="user avatar" />

            </Link>
            <span className="item-label">
                {user.username}
            </span>
        </li>
    )
}

export default UserSide;