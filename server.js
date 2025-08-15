import { createServer } from "http";
import { createConnection } from "mysql";

// set up db connection
const con = createConnection({
  host: "localhost",
  user: "root",
  password: "Root123*",
  database: "todolist",
});

// db connection error handling and quering to get data

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// node js server to serve json data to backend from db
const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  console.log(req.url);

  if (req.method === "GET") {
    con.query("SELECT * FROM todos", function (err, result) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newTodo = JSON.parse(body);

      res.statusCode = 201; // something was created

      con.query(
        `INSERT INTO todos (todo, isChecked) VALUES ('${newTodo.todo}',${Number(
          newTodo.isChecked
        )})`,
        // [value],
        (err, result) => {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        }
      );
      con.query("SELECT * FROM todos", (err, result) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result)); // send updated list to frontend
      });
    });

    // patch req
  } else if (req.method === "PATCH") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newTodo = JSON.parse(body);

      res.statusCode = 204; // something was updated

      if (newTodo.type === "checkbox") {
        con.query(
          `UPDATE todos SET isChecked = '${newTodo.isChecked}' WHERE id = ${newTodo.id}`,

          (err, result) => {
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);
          }
        );
      } else {
        con.query(
          `UPDATE todos SET todo = '${newTodo.todo}' WHERE id = ${newTodo.id}`,

          (err, result) => {
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);
          }
        );
      }

      con.query("SELECT * FROM todos", (err, result) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result)); // send updated list to frontend
      });
    });
  } else if (req.method === "DELETE") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const todo = JSON.parse(body);
      console.log(todo);

      res.statusCode = 200; // something was updated

      // delete a single todo
      try {
        if (todo.type === "single") {
          con.query(
            `DELETE FROM todos WHERE id = ${todo.id}`,

            (err, result) => {
              if (err) throw err;
              console.log("Number of records deleted: " + result.affectedRows);
            }
          );
        }
        // delete all todos
        else {
          con.query(
            `DELETE FROM todos`,

            (err, result) => {
              if (err) throw err;
              console.log("Number of records deleted: " + result.affectedRows);
            }
          );
        }

        // Query the db and send update as res to frontend
        con.query("SELECT * FROM todos", (err, result) => {
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result)); // send updated list to frontend
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
  console.log(req.method);
});

server.listen(8000);
