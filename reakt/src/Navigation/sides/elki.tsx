import Link from "next/link";
import Image from "next/image";

const Elki = () => {
    const title = "Eliksiry";
    const header = "/elki";
    
    return (
        <li className="sideLi">
            <Link href={ header? header: "#" }>
                <Image src="./resources/Eliksir.svg" />
            </Link>
            <span className="item-label">
                {title}
            </span>

        </li>
    )
}

export default Elki;