module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'anonym',
  entities: ['dist/db/entities/*.js', 'dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src/db/entities',
  },
  logging: true,
};