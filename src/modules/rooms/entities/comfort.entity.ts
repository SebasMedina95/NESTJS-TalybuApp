import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";
import { ThematicsComfortsMaster } from "./thematics-comforts.entity";

@Entity({
    name: "COMOD_COMODIDADES_HABITACION"
})
export class Comfort {

    @ApiProperty({ example : "b811a145-7001-4a63-b478-3b81eaedc2e2", description: "Id de la comodidad", uniqueItems: true })
    @PrimaryGeneratedColumn('uuid', {
        name: "COMOD_ID"
    })
    public id: string;


    @ApiProperty({ example : "Cama Redonda 3x3", description: "Nombre de la comodidad", uniqueItems: true })
    @Column({
        name: "COMOD_COMODIDAD",
        type: 'varchar',
        unique: true,
        length: 100,
        comment: 'Comodidad de Habitación'
    })
    public comfort: string;


    @ApiProperty({ example : "true", description: "Estado de la comodidad", default: true })
    @Column({
        name: "COMOD_ESTADO",
        type: 'boolean',
        comment: 'Estado Comodidad de Habitación',
        default: true
    })
    public status: boolean;

    @ApiProperty({ example : "43567432", description: "Documento de usuario que creó", uniqueItems: true })
    @Column({
        name: "COMOD_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

    @ApiProperty({ example : "2023-10-10", description: "Fecha de creación", uniqueItems: true })
    @Column({
        name: "COMOD_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    @ApiProperty({ example : "43567432", description: "Documento de usuario que actualizó", uniqueItems: true })
    @Column({
        name: "COMOD_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que actualizó'
    })
    public updateUserAt: string;

    @ApiProperty({ example : "2023-10-10", description: "Fecha de actualización", uniqueItems: true })
    @Column({
        name: "COMOD_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    public updateDateAt: Date;


    @OneToMany( () => ThematicsComfortsMaster, (comfortDetail) => comfortDetail.comfort )
    detail_comfort: ThematicsComfortsMaster;

}
