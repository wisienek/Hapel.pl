import { Link } from 'react-router-dom';
import { MenuItemInput } from './Menu.types';

export const MenuItem = ({ title, header, Icon, ref }: MenuItemInput) => {
  return (
    <li className="sideLi">
      <Link to={header ? header : '#'}>
        {ref ? (
          <a onClick={ref}>
            <Icon />
          </a>
        ) : (
          <Icon />
        )}

        <span className="item-label">{title}</span>
      </Link>
    </li>
  );
};
