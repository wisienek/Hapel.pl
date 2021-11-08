import Link from "next/link";
import Image from "next/image";

const UserSide = ({ user }) => {
    return (
        <li className="sideLi">
            <Link to={ `/user` }>
                <Image src={ user.avatar } alt="user avatar" />
            </Link>
            <span className="item-label">
                { user.username }
            </span>
        </li>
    )
}

export default UserSide;