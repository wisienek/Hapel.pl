import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Eliksir {

    @PrimaryGeneratedColumn()
    serial: number;

    @Column()
    nazwa: string;

    @Column()
    kolor: string;

    @Column()
    hex: string;

    @Column()
    zapach: string;

    @Column()
    smak: string;

    @Column()
    data: number;

    @Column()
    czas: string;

    @Column()
    inokreacja: string;

    @Column()
    pcena: number;

    @Column()
    ile: number;

}