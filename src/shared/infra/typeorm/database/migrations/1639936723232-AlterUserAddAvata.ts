import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddAvata1639936723232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn( {
            name: "Avatar",
            type: "varchar(100)",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
