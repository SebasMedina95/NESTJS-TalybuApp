import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";

import { ThematicsComfortsMaster } from "./thematics-comforts.entity";
import { ImagesRoom } from './image.entity';
import { Room } from './room.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "TEMAT_TEMATICAS_HABITACION"
})
export class Thematic {

    @ApiProperty({ example : "b811a145-7001-4a63-b478-3b81eaedc2e2", description: "Id de la temática de habitación", uniqueItems: true })
    @PrimaryGeneratedColumn('uuid', {
        name: "TEMAT_ID"
    })
    public id: string;

    @ApiProperty({ example : "Moderna", description: "Temática de la habitación", uniqueItems: true })
    @Column({
        name: "TEMAT_TEMATICA",
        type: 'varchar',
        unique: true,
        length: 150,
        comment: 'Temática de la Temática de Habitación'
    })
    public thematic: string;

    @ApiProperty({ example : "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", description: "Descripción de la temática de la habitación", uniqueItems: true })
    @Column({
        name: "TEMAT_DESCRIPCION",
        type: 'varchar',
        length: 500,
        comment: 'Descripción de la Temática de Habitación'
    })
    public description: string;

    @ApiProperty({ example : "Pequeño.", description: "Tamaño de la temática de la habitación" })
    @Column({
        name: "TEMAT_TAMANO",
        type: 'varchar',
        length: 30,
        comment: 'Tamaño de la Temática de Habitación'
    })
    public size: string;

    @ApiProperty({ example : "Hospedaje", description: "Categoría de la temática de habitación" })
    @Column({
        name: "TEMAT_CATEGORIA",
        type: 'varchar',
        length: 20,
        comment: 'Categoría de la Temática de Habitación'
    })
    public categories: string;

    @ApiProperty({ example : "['Comfort','Seducción','Pasión']", description: "Tags de la temática de habitación", default: [] })
    @Column({
        name: "TEMAT_TAGS",
        type: 'text',
        array: true,
        comment: 'Tags de la Temática de Habitación',
        default: []
    })
    public tags: string[];

    @ApiProperty({ example : "123.000", description: "Precio de la temática de habitación", default: 0 })
    @Column({
        name: "TEMAT_PRECIO",
        type: 'decimal',
        precision: 20,
        scale: 2,
        comment: 'Precio de la Temática de habitación',
        default: 0
    })
    public price: number

    @ApiProperty({ example : "true", description: "Estado temática de la habitación", default: true })
    @Column({
        name: "TEMAT_ESTADO",
        type: 'boolean',
        comment: 'Estado Lógico de la Temática de Habitación',
        default: true
    })
    public status: boolean;

    @ApiProperty({ example : "false", description: "Promoción de la temática habitación", default: false })
    @Column({
        name: "TEMAT_PROMOCION",
        type: 'boolean',
        comment: 'Promociones Habilitadas de la Temática de Habitación',
        default: false
    })
    public promotion: boolean;

    @ApiProperty({ example : "false", description: "Porcentaje Promoción de la temática habitación", default: 0 })
    @Column({
        name: "TEMAT_PORCENTAJE_PROMOCION",
        type: 'decimal',
        precision: 20,
        scale: 2,
        comment: 'Porcentaje Promoción de la Temática de habitación',
        default: 0
    })
    public promotionPercentaje: number;

    @ApiProperty({ example : "43567432", description: "Documento de usuario que creó" })
    @Column({
        name: "TEMAT_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

    @ApiProperty({ example : "2023-10-10", description: "Fecha que creó" })
    @Column({
        name: "TEMAT_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    @ApiProperty({ example : "43567432", description: "Documento de usuario que actualizó" })
    @Column({
        name: "TEMAT_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que actualizó'
    })
    public updateUserAt: string;

    @ApiProperty({ example : "2023-10-10", description: "Fecha que actualizó" })
    @Column({
        name: "TEMAT_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    public updateDateAt: Date;

    //?Relación con las temáticas
    @OneToMany( () => ThematicsComfortsMaster, (thematicDetail) => thematicDetail.thematic )
    detail_thematic: ThematicsComfortsMaster;

    //?Relación con las imágenes
    @OneToMany( () => ImagesRoom, (image) => image.thematic )
    images: ImagesRoom[];

    //?Relación con las habitaciones
    @OneToMany( () => Room, (room) => room.thematic )
    rooms: Room[];

}
