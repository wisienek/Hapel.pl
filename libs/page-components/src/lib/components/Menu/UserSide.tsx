import { Link } from "react-router-dom";
import { User } from "../Login/User.type";

export const UserSide = (
    { user }: { user: User }
) => {
    return (
        <li className="sideLi">
            <Link to={ `/user` }> 
                <img src={ user.avatar || "" } alt="user avatar" />
            </Link>
            <span className="item-label">
                { user.username }
            </span>
        </li>
    )
}