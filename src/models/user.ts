import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    password: string
}

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';

            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds)
              );

            const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`can't create user (${u.firstName} ${u.lastName}): ${err}`);
        }
    }

    async autenticateUser(firstName: string, lastName: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT password FROM users WHERE firstName=($1) and lastName=($2)';
            const result = await conn.query(sql, [firstName, lastName]);
            conn.release();

            if(result.rows.length) {
                const user = result.rows[0];
                if(bcrypt.compareSync(password+pepper, user.password)) {
                    return user;
                }
            }

            return null;
        } catch(err) {
            throw new Error(`can't authenticate user (${firstName} ${lastName}): ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`can't get user with id ${id}: ${err}`);
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`can't get users: ${err}`);
        }
    }
}

