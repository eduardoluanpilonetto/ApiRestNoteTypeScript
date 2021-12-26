import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRentals1640473407680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rentals",
            columns: [
                {
                    name: "id",
                    type: "varchar(80)"
                },
                {
                    name: "car_id",
                    type: "varchar(80)"
                },
                {
                    name: "user_id",
                    type: "varchar(80)"
                },
                {
                    name: "start_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "end_date",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "expected_return_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "total",
                    type: "numeric",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
        ],
        foreignKeys: [
            {
                name: "FK_RENTALS_CARS",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"]
            },
            {
                name: "FK_RENTALS_USERS",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"]
            }
        ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
