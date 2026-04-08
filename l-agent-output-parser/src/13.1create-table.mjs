import mysql from "mysql2/promise"

async function main() {
  const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    multipleStatements: true,
  }

  const connection = await mysql.createConnection(connectionConfig)

  try {
    await connection.query(
      "CREATE DATABASE IF NOT EXISTS hello CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
    )
    await connection.query("USE hello")

    await connection.query(`
      CREATE TABLE IF NOT EXISTS friends (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        gender VARCHAR(10),
        birth_date DATE,
        company VARCHAR(100),
        title VARCHAR(100),
        phone VARCHAR(20),
        wechat VARCHAR(50)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    const insertSql = `
      INSERT INTO friends (
        name,
        gender,
        birth_date,
        company,
        title,
        phone,
        wechat
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
      "王经理",
      "男",
      "1990-01-01",
      "字节跳动",
      "产品经理/产品总监",
      "18612345678",
      "wangjingli2024",
    ]

    const [result] = await connection.execute(insertSql, values)
    console.log("成功创建数据库和表，并插入 demo 数据，插入 ID:", result.insertId)
  } catch (err) {
    console.error("执行出错:", err)
  } finally {
    await connection.end()
  }
}

main().catch((err) => {
  console.error("脚本运行失败:", err)
})
