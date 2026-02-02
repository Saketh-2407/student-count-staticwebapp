const sql = require("mssql");

module.exports = async function (context, req) {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
      encrypt: true
    }
  };

  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
      SELECT Country, COUNT(*) AS StudentCount
      FROM Students
      GROUP BY Country
      ORDER BY StudentCount DESC;
    `);

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: result.recordset
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: "Database query failed", details: err.message }
    };
  } finally {
    // close connection
    try { await sql.close(); } catch (e) {}
  }
};
