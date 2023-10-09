import { Thematic } from './thematic.entity';
import { Column, 
         Entity, 
         JoinColumn, 
         ManyToOne, 
         PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "HABIT_HABITACIONES"
})
export class Room {

    @PrimaryGeneratedColumn('uuid', {
        name: "HABIT_ID"
    })
    public id: string;

    @Column({
        name: "HABIT_NUMERO",
        type: 'int',
        unique: true,
        comment: 'Número de la habitación'
    })
    public number: number;

    @Column({
        name: "HABIT_DESCRIPCION",
        type: 'varchar',
        length: 1000,
        nullable: true,
        comment: 'Descripción de la habitación'
    })
    public description: string;

    @Column({
        name: "HABIT_TIPO",
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: 'Tipo de la habitación'
    })
    public type: string;

    @Column({
        name: "HABIT_ESTADO",
        type: 'boolean',
        comment: 'Estado Lógico de la habitación',
        default: true
    })
    public status: boolean;

    @Column({
        name: "HABIT_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

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
