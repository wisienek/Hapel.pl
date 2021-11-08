import Link from "next/link";
import Image from "next/image";

const title = "Karty czarodziejów";
const header = "/karty/moje";

const Cards = () => {
    return (
        <li className="sideLi">
            <Link href={ header? header: "#" }>

            <Image src="/resources/Card.svg" height={30} width={30} />

            <span className="item-label">
                { title }
            </span>

            </Link>
        </li>
    )
}


export default Cards;