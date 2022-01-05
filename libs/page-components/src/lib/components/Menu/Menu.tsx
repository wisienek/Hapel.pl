import { useContext } from 'react';
import { userContext } from '../Login/User';

export const Menu = () => {
    const { user } = useContext( userContext );

    return (
        <ul id="sideUl">

        </ul>
    )
}
