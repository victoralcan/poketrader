import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTradeRecords1627857761651
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trade_records',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'trade_id',
            type: 'uuid',
          },
          {
            name: 'pokemon_id',
            type: 'uuid',
          },
          {
            name: 'left',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'trade_records',
      new TableForeignKey({
        name: 'RelatedTrade',
        columnNames: ['trade_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'trades',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trade_records',
      new TableForeignKey({
        name: 'TradedPokemon',
        columnNames: ['pokemon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pokemons',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trade_records', 'TradedPokemon');

    await queryRunner.dropForeignKey('trade_records', 'RelatedTrade');

    await queryRunner.dropTable('trade_records');
  }
}
