import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSpecificationCars1640380622733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "specifications_cars",
            columns: [
                {
                    name: "car_id",
                    type: "varchar(80)",
                    isNullable: false
                },
                {
                    name: "specification_id",
                    type: "varchar(80)",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FK_CARS_SPECIFICATIONS",
                    referencedTableName: "Cars",
                    referencedColumnNames: ["id"],
                    columnNames: ["car_id"]
                },
                {
                    name: "FK_SPECIFICATIONS_CARS",
                    referencedTableName: "Specification",
                    referencedColumnNames: ["id"],
                    columnNames: ["specification_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
