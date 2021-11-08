import Link from "next/link";
import Image from "next/image";

const title = "Główna";
const header = "/";

const Glowna = () => {
    return (
        <li className="sideLi">
            <Link href={header? header: "#"}>
                <Image src="./resources/Hat.svg" />
            </Link>
            <span className="item-label">
                {title}
            </span>
        </li>
    )
}

export default Glowna;