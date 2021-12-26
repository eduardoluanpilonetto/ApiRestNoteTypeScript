import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCarImages1640467478149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "images_car",
            columns: [
                {
                    name: "id",
                    type: "varchar(80)",
                    isPrimary: true
                },
                {
                    name: "car_id",
                    type: "varchar(80)"
                },
                {
                    name: "imarge_name",
                    type: "varchar(150)"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }))

        await queryRunner.createForeignKey(
            "images_car",
            new TableForeignKey({
                name: "FK_IMAGES_CARS",
                referencedTableName: "Cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
