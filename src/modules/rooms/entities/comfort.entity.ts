import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";
import { ThematicsComfortsMaster } from "./thematics-comforts.entity";

@Entity({
    name: "COMOD_COMODIDADES_HABITACION"
})
export class Comfort {

    @PrimaryGeneratedColumn('uuid', {
        name: "COMOD_ID"
    })
    public id: string;

    @Column({
        name: "COMOD_COMODIDAD",
        type: 'varchar',
        unique: true,
        length: 100,
        comment: 'Comodidad de Habitación'
    })
    public comfort: string;

    @Column({
        name: "COMOD_ESTADO",
        type: 'boolean',
        comment: 'Estado Comodidad de Habitación',
        default: true
    })
    public status: boolean;

    @Column({
        name: "COMOD_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

    @Column({
        name: "COMOD_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    @Column({
        name: "COMOD_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que actualizó'
    })
    public updateUserAt: string;

    @Column({
        name: "COMOD_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public updateDateAt: Date;


    @OneToMany( () => ThematicsComfortsMaster, (comfortDetail) => comfortDetail.comfort )
    detail_comfort: ThematicsComfortsMaster;

}
