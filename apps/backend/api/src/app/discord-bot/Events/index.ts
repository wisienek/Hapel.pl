import { event as GuildCreateEvent } from './guildCreate';
import { event as InteractionCreateEvent } from './interactionCreate';
import { event as MessageReactionAddEvent } from './messageReactionAdd';
import { event as MessageReactionRemoveEvent } from './messageReactionRemove';
import { event as ReadyEvent } from './ready';

export const Events = [
    GuildCreateEvent,
    InteractionCreateEvent,
    MessageReactionAddEvent,
    MessageReactionRemoveEvent,
    ReadyEvent,
];
