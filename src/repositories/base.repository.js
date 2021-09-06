import pool from '../database';

class BaseRepository {
  constructor(table) {
    this.table = table;
  }

  async getAll() {
    const response = await pool.query(`SELECT * FROM ${this.table} ORDER BY id ASC`);
    return response.rows;
  }

  async getById(id) {
    return await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
  }

  async create(item) {
    const PARAMS = Object.keys(item).join(', ');
    const values = Object.values(item);
    const VALUES = values.map((_, i) => `$${i + 1}`);
    return await pool.query(`INSERT INTO ${this.table} (${PARAMS}) VALUES (${VALUES})`, values);
  }

  async update(item, id) {
    const PARAMS = Object.keys(item)
      .map((param, i) => `${param} = $${i + 2}`)
      .join(', ');
    const values = Object.values(item);
    console.log(`UPDATE users SET ${PARAMS} WHERE id = $1`);
    return await pool.query(`UPDATE ${this.table} SET ${PARAMS} WHERE id = $1`, [id, ...values]);
  }

  async destroy(id) {
    return await pool.query(`DELETE FROM ${this.table} where id = $1`, [id]);
  }
}

export default BaseRepository;
