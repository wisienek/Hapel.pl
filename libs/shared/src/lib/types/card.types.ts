export enum CardRarity {
    COMMON = "COMMON",
    UNCOMMON = "UNCOMMON",
    RARE = "RARE",
    ANCIENT = "ANCIENT",
    LEGENDARY = "LEGENDARY"
}

export type CardRarityColors = {
    [CardRarity.COMMON]: "#8b392d"
    [CardRarity.UNCOMMON]: "#7b858f"
    [CardRarity.RARE]: "#f17727"
    [CardRarity.ANCIENT]: "#e1b11b"
    [CardRarity.LEGENDARY]: "#393a75"
}

export type CardData = {
    name: string;
    description: string;
    number: number;
    rarity: CardRarity;
}