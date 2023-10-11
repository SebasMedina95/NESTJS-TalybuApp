import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         JoinColumn,
         ManyToOne,
         PrimaryGeneratedColumn } from "typeorm";
import { Thematic } from './thematic.entity';

@Entity({
    name: "IMGHA_IMAGENES_HABITACION"
})
export class ImagesRoom {

    @ApiProperty({
        example : "b811a145-7001-4a63-b478-3b81eaedc2e2",
        description: "Id de la imagen",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid', {
        name: "IMGHA_ID"
    })
    public id: string;


    @ApiProperty({
        example : "http://res.cloudinary.com/dervi5j2i/image/upload/v1695959605/g5qwtndyconzbrfqlzpy.jpg",
        description: "Url de la comodidad",
        uniqueItems: true
    })
    @Column({
        name: "IMGHA_URL_IMAGEN",
        type: 'text',
        comment: 'Url de la imagen de la temática de habitación.'
    })
    public url: string;


    @ApiProperty({
        example : "43567432",
        description: "Documento de usuario que creó",
        uniqueItems: true
    })
    @Column({
        name: "IMGHA_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;


    @ApiProperty({
        example : "2023-10-10",
        description: "Fecha de creación",
        uniqueItems: true
    })
    @Column({
        name: "IMGHA_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    //? Relación con las temátcias
    @ManyToOne( () => Thematic, (thematic) => thematic.images )
    @JoinColumn({ name: 'TEMAT_ID' })
    thematic?: Thematic | string;

}
