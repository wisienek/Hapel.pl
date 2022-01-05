// "Roślinne": {
//     "Marakuja": {
//       "cena": "2",
//       "ilosc": "1",
//       "jednostka": "szt"
//     },

export type ElixirIngredient = {
    name: string;
    type: string;
    price: number;
    quantity: number;
    availableQuantity: number;
    canBuyWithLicence: boolean;
    canBuyWithoutLicence: boolean;
}