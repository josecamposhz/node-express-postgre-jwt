import BaseRepository from './base.repository';
import pool from '../database';

class TaskRepository extends BaseRepository {
  constructor(table) {
    super(table);
  }

  async getUserTasks(userId) {
    const res = await pool.query(`SELECT * FROM ${this.table} WHERE userId = $1`, [userId]);
    return res.rows;
  }
}

export default new TaskRepository("tasks");
