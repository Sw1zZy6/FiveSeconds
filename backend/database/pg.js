import pg from 'pg';
const { Client } = pg;

const client = new Client ({
    user: 'postgres',
    host: 'localhost',
    database: 'FiveSeconds',
    password: 'riverside',
    port: 5432,
});

await client.connect();
export default { client };