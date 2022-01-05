export enum ListItem {
    CARD = 'card',
    ELKI = 'elki',
    HOME = 'home',
    SCHOOL = 'school',
    ROLE = 'role',
}

export interface MenuItemInput {
    title: string;
    header: string;
    Icon?: () => JSX.Element;
    ref?: () => void;
}

export type IItemList = {
    [key in ListItem]: MenuItemInput;
}