import Image from "next/image";

const title = "Zaloguj"; // konto jak zalogowany
const header = "/api/dc/auth"; // <- router do logowania

const Discord = () => {
    const login = () => window.location.href = "http://hapel-ic.pl/api/dc/auth";

    return (
        <li className="sideLi">
            <a onClick={ login }>
                <Image src="./resources/Discord.svg" />
            </a>

            <span className="item-label">
                {title}
            </span>
        </li>
    )
}

export default Discord;