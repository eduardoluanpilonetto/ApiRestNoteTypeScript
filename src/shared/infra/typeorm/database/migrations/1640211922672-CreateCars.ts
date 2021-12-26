import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1640211922672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Cars",
            columns: [
                {
                    name: "id",
                    type: "varchar(80)",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar(80)"
                },
                {
                    name: "description",
                    type: "varchar(80)"
                },
                {
                    name: "daily_rate",
                    type: "numeric"
                },
                {
                    name: "available",
                    type: "boolean",
                    default: true
                },
                {
                    name: "license_plate",
                    type: "varchar(80)"
                },
                {
                    name: "fine_amount",
                    type: "numeric"
                },
                {
                    name: "brand",
                    type: "varchar(80)"
                },
                {
                    name: "category_id",
                    type: "varchar(80)",
                    isNullable: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FK_CARS_CATEGORY",
                    referencedTableName: "Categories",
                    referencedColumnNames: ["id"],
                    columnNames: ["category_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
