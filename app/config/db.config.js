/*
pool is optional, it will be used for Sequelize connection pool configuration:

max: maximum number of connection in pool
min: minimum number of connection in pool
idle: maximum time, in milliseconds, that a connection can be idle before being released
acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
*/
export const HOST = "localhost";
export const USER = "postgres";
export const PASSWORD = "root";
export const DB = "e-com";
export const dialect = "postgres";
export const pool = {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000
};