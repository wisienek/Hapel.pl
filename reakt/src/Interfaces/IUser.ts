export interface IUser {
    hasPerms: boolean,
    hasPermsHic: boolean,
}

export interface IUserContext {
    user: IUser | null,
}