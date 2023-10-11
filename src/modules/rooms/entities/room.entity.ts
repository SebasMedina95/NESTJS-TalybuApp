import { Thematic } from './thematic.entity';
import { Column, 
         Entity, 
         JoinColumn, 
         ManyToOne, 
         PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({
    name: "HABIT_HABITACIONES"
})
export class Room {

    @ApiProperty({ example : "b811a145-7001-4a63-b478-3b81eaedc2e2", description: "Id de la habitación", uniqueItems: true })
    @PrimaryGeneratedColumn('uuid', {
        name: "HABIT_ID"
    })
    public id: string;

    @ApiProperty({ example : "101", description: "Número de la habitación", uniqueItems: true })
    @Column({
        name: "HABIT_NUMERO",
        type: 'int',
        unique: true,
        comment: 'Número de la habitación'
    })
    public number: number;


    @ApiProperty({ example : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.", description: "Descripción de la habitación", uniqueItems: true })
    @Column({
        name: "HABIT_DESCRIPCION",
        type: 'varchar',
        length: 1000,
        nullable: true,
        comment: 'Descripción de la habitación'
    })
    public description: string;

    @ApiProperty({ example : "Motel.", description: "Tipo de la habitación" })
    @Column({
        name: "HABIT_TIPO",
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: 'Tipo de la habitación'
    })
    public type: string;

    @ApiProperty({ example : "true", description: "Estado de la habitación", default: true })
    @Column({
        name: "HABIT_ESTADO",
        type: 'boolean',
        comment: 'Estado Lógico de la habitación',
        default: true
    })
    public status: boolean;

    @ApiProperty({ example : "43567432", description: "Documento de usuario que creó" })
    @Column({
        name: "HABIT_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

    @ApiProperty({ example : "2023-10-10", description: "Fecha de usuario que creó" })
    @Column({
        name: "HABIT_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    //? Relación con las temátcias
    @ManyToOne( () => Thematic, (thematic) => thematic.rooms )
    @JoinColumn({ name: 'TEMAT_ID' })
    thematic?: Thematic | string;

}
