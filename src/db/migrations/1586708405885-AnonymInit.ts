import {MigrationInterface, QueryRunner} from "typeorm";

export class AnonymInit1586708405885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `gratitudes` (`id` varchar(23) NOT NULL, `from` varchar(16) NULL DEFAULT null, `to` varchar(255) NOT NULL, `reason` varchar(255) NOT NULL, `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `gratitudes`");
    }

}
