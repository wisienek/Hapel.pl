import Link from "next/link";
import Image from "next/image";

const title = "Szkoła";
const header = "/hogwart";

const School = () => {

    return (
        <li className="sideLi">
            <Link href={header? header: "#"}>
                <Image src="./resources/School.svg" />
            </Link>

            <span className="item-label">
                {title}
            </span>
        </li>
    )
}

export default School;