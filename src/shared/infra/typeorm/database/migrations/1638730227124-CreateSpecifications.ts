import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecifications1638730227124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "Specification",
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
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
