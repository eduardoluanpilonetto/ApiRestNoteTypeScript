import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Car } from "./car";
import { v4 as uuidv4 } from "uuid";

@Entity("images_car")
class CarImage{
    @PrimaryColumn()
    id?: string;

    @Column()
    car_id?: string;

    @Column()
    imarge_name?: String;

    @CreateDateColumn()
    created_at?: Date

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export { CarImage }