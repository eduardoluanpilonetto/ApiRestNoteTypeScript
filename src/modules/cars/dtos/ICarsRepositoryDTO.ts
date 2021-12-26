import { Specification } from "../infra/typeorm/entities/specification";

interface ICarsDTO{
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specification?: Specification[],
    id?: string
}

export { ICarsDTO }