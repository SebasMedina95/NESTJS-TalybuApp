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

    @PrimaryGeneratedColumn('uuid', {
        name: "IMGHA_ID"
    })
    public id: string;

    @Column({
        name: "IMGHA_URL_IMAGEN",
        type: 'text',
        comment: 'Url de la imagen de la temática de habitación.'
    })
    public url: string;

    @Column({
        name: "IMGHA_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

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
