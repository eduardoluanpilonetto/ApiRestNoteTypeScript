import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./category";
import { Specification } from "./specification";

@Entity("Cars")
class Car{

    @PrimaryColumn()
    id?: string;

    @Column()
    name?: string;

    @Column()
    description?: string;
    
    @Column()
    daily_rate?: number;
    
    @Column()
    available!: boolean;
    
    @Column()
    license_plate?: string;
    
    @Column()
    fine_amount?: number; 
    
    @Column()
    brand?: string;
    
    @ManyToOne(() => Category)
    @JoinColumn({name: "category_id"})
    category?: Category

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{name: "car_id"}],
        inverseJoinColumns: [{name: "specification_id"}]
    })
    specification?: Specification[]

    @Column()
    category_id?: string;
    
    @CreateDateColumn()
    createdAt?: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
            this.available = true;
        }
    }
}

export { Car }