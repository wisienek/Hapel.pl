export type DBConfig = {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;

    entities: string[];
    synchronize: boolean;
};

export type MainORMConfig = {
    port: number;
    database: DBConfig;
}