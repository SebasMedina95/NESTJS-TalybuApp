import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";

import { ThematicsComfortsMaster } from "./thematics-comforts.entity";
import { ImagesRoom } from './image.entity';
import { Room } from './room.entity';

@Entity({
    name: "TEMAT_TEMATICAS_HABITACION"
})
export class Thematic {

    @PrimaryGeneratedColumn('uuid', {
        name: "TEMAT_ID"
    })
    public id: string;

    @Column({
        name: "TEMAT_TEMATICA",
        type: 'varchar',
        unique: true,
        length: 150,
        comment: 'Temática de la Temática de Habitación'
    })
    public thematic: string;

    @Column({
        name: "TEMAT_DESCRIPCION",
        type: 'varchar',
        length: 500,
        comment: 'Descripción de la Temática de Habitación'
    })
    public description: string;

    @Column({
        name: "TEMAT_TAMANO",
        type: 'varchar',
        length: 30,
        comment: 'Tamaño de la Temática de Habitación'
    })
    public size: string;

    @Column({
        name: "TEMAT_CATEGORIA",
        type: 'varchar',
        length: 20,
        comment: 'Categoría de la Temática de Habitación'
    })
    public categories: string;

    @Column({
        name: "TEMAT_TAGS",
        type: 'text',
        array: true,
        comment: 'Tags de la Temática de Habitación',
        default: []
    })
    public tags: string[];

    @Column({
        name: "TEMAT_PRECIO",
        type: 'decimal',
        precision: 20,
        scale: 2,
        comment: 'Precio de la Temática de habitación',
        default: 0
    })
    public price: number

    @Column({
        name: "TEMAT_ESTADO",
        type: 'boolean',
        comment: 'Estado Lógico de la Temática de Habitación',
        default: true
    })
    public status: boolean;

    @Column({
        name: "TEMAT_PROMOCION",
        type: 'boolean',
        comment: 'Promociones Habilitadas de la Temática de Habitación',
        default: false
    })
    public promotion: boolean;

    @Column({
        name: "TEMAT_PORCENTAJE_PROMOCION",
        type: 'decimal',
        precision: 20,
        scale: 2,
        comment: 'Porcentaje Promoción de la Temática de habitación',
        default: 0
    })
    public promotionPercentaje: number;

    @Column({
        name: "TEMAT_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

    @Column({
        name: "TEMAT_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    @Column({
        name: "TEMAT_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que actualizó'
    })
    public updateUserAt: string;

    @Column({
        name: "TEMAT_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
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
