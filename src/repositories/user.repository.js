import BaseRepository from './base.repository';
import pool from '../database';

class UserRepository extends BaseRepository {
  constructor(table) {
    super(table);
  }

  async getUserByEmail(email) {
    const response = await pool.query(`SELECT * FROM ${this.table} WHERE email = $1`, [email]);
    return response.rows;
  }
}

export default new UserRepository('users');
