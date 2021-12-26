import {MigrationInterface, QueryRunner, Table, Timestamp} from "typeorm";

export class CreateUsers1639250961402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "varchar(82)",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar(255)"
                },
                {
                    name: "password",
                    type: "varchar(80)"
                },
                {
                    name: "email",
                    type: "varchar(80)",
                    isUnique: true
                },
                {
                    name: "driver_license",
                    type: "varchar(80)"
                },
                {
                    name: "isAdmin",
                    type: "boolean",
                    default: false
                },
                {
                    name: "crated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
