import { Comfort } from '../../rooms/entities/comfort.entity';
import { BeforeInsert,
         BeforeUpdate,
         Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "USUAR_USUARIOS"
})
export class User {

    @PrimaryGeneratedColumn('uuid', {
        name: "USUAR_ID"
    })
    public id: string;

    @Column({
        name: "USUAR_DOCUMENTO",
        type: 'varchar',
        unique: true,
        length: 30,
        nullable: true,
        comment: 'Documento del Usuario'
    })
    public document: string;

    @Column({
        name: "USUAR_TIPO_DOCUMENTO",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Tipo Documento del Usuario'
    })
    public typeDocument: string;

    @Column({
        name: "USUAR_NOMBRE_COMPLETO",
        type: 'varchar',
        length: 150,
        comment: 'Nombre Completo del Usuario'
    })
    public fullName: string;

    @Column({
        name: "USUAR_TELEFONO",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Teléfono del Usuario'
    })
    public phone: string;

    @Column({
        name: "USUAR_DIRECCION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Dirección del Usuario'
    })
    public address: string;

    @Column({
        name: "USUAR_CORREO_ELECTRONICO",
        type: 'varchar',
        unique: true,
        length: 100,
        comment: 'Correo Electrónico del Usuario'
    })
    public email: string;

    @Column({
        name: "USUAR_PASSWORD",
        type: 'varchar',
        length: 100,
        comment: 'Contraseña del Usuario'
    })
    public password: string;

    @Column({
        name: "USUAR_ESTADO",
        type: 'boolean',
        comment: 'Estado Usuario',
        default: true
    })
    public status: boolean;

    @Column({
        name: "USUAR_ROLES",
        type: "text",
        array: true,
        default: ['USER'],
        comment: 'Roles del Usuario'
    })
    public roles: string[];

    @Column({
        name: "USUAR_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    public createUserAt: string;

    @Column({
        name: "USUAR_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public createDateAt: Date;

    @Column({
        name: "USUAR_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que actualizó'
    })
    public updateUserAt: string;

    @Column({
        name: "USUAR_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    public updateDateAt: Date;

    //? Integridad referencial para saber quien movió el registro
    //* Integridad referencial con comodidades:
    // @OneToMany()
    // refComfort: Comfort


    @BeforeInsert()
    checkFieldBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldBeforeUpdated(){
        this.email = this.email.toLowerCase().trim();
    }

}
