import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thematic } from './thematic.entity';
import { Comfort } from './comfort.entity';

@Entity({
    name: "MTECO_MAESTRO_TEMATICAS_COMODIDADES"
})
export class ThematicsComfortsMaster {

    @PrimaryGeneratedColumn({
        name: "MTECO_ID",
        comment: 'Clave primaria de tabla'
    })
    public id?: number;

    @ManyToOne( () => Thematic, (thematic) => thematic.detail_thematic )
    @JoinColumn({ name: 'TEMAT_TEMATICA' })
    public thematic?: Thematic | string;

    @ManyToOne( () => Comfort, (comfort) => comfort.detail_comfort )
    @JoinColumn({ name: 'COMOD_ID' })
    public comfort?: Comfort | string;

}
