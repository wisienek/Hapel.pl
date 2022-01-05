import { IItemList, ListItem } from "./Menu.types";

export const ItemList: IItemList = {
    [ListItem.CARD]: {
        title: "Karty czarodziejów",
        header: "/karty/moje",
    },
    [ListItem.ELKI]: {
        title: "Eliksiry",
        header: "/elki",
    },
    [ListItem.HOME]: {
        title: "Główna",
        header: "/",
    },
    [ListItem.SCHOOL]: {
        title: "Szkoła",
        header: "/hogwart",
    },
    [ListItem.ROLE]: {
        title: "Role",
        header: "/role",
    }
}