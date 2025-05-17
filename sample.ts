// sample.ts

const config = {
  dbHost: "localhost",
  dbUser: "admin",
};

// Hardcoded Secret
const apiKey = "supersecretapikey123"; // Should be detected
let password = "MyPassword123!";      // Should be detected
const secretKey = `another_secret_value`; // Should be detected

function getUserData(userId: string, db: any) {
  // SQL Injection - string concatenation
  const query1 = "SELECT * FROM users WHERE id = '" + userId + "'"; // Should be detected
  db.execute(query1);

  // SQL Injection - template literal (basic)
  const query2 = `SELECT * FROM profiles WHERE user_id = ${userId} AND status = 'active'`; // Should be detected
  db.query(query2);

  const safeQuery = "SELECT * FROM products WHERE category = ?";
  db.prepare(safeQuery, ["electronics"]); // Should NOT be detected as SQLi by basic rules

  const notASecret = "normal_string";
  console.log(notASecret);
}

class Database {
  query(sql: string) {
    console.log("Executing query:", sql);
    // In a real app, this would interact with a database
  }
  execute(sql: string) {
    console.log("Executing SQL:", sql);
  }
  prepare(sql: string, params: any[]) {
    console.log("Preparing statement:", sql, "with params:", params);
  }
}

const dbInstance = new Database();
getUserData("123", dbInstance);

const someOtherVariable = "this is not a secret";
const token = "this_is_a_token_but_not_hardcoded_as_per_simple_rules"; // Not detected by simple name rule