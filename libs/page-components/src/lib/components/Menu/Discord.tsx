
export const Discord = () => {
    const login = () => window.location.href = "http://hapel-ic.pl/api/dc/auth";
    
    return (
        <li className="sideLi">
            <a onClick={ login }>
                <span>dc</span>
            </a>

            <span className="item-label">
                Zaloguj
            </span>
        </li>
    )
}
