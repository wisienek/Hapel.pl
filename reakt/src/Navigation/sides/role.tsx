import Link from "next/link";
import Image from "next/image";

// import { GoRepoForked } from "react-icons/go";

const title = "Role";
const header = "/role";

const Role = () => {
    return (
        <li className="sideLi">
            <Link href={header? header: "#"}>
                <Image src="./resources/Role.svg" />
            </Link> 
            
            <span className="item-label">
                {title}
            </span>
        </li>
    )
}

export default Role;
