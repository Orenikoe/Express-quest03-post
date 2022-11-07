const express = require('express');
const app = express();
const database = require('./db_connection.js')
app.use(express.json());
const port = 5000;



app.get('/users', (req, res) => {
	const { id } = req.params;
	database
		.query("SELECT * FROM users")
		.then(([result]) => {
			res.send(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error adding the user');
		});
});
app.get('/users/:id', (req, res) => {
	const { id } = req.params;
	database
		.query(`SELECT * FROM users where id = ${id}`)
		.then(([result]) => {
			res.send(result[0]);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error adding the user');
		});
});

app.post('/users', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	await database
		.query('INSERT INTO users(username, password) VALUES (?, ?)', [
			username,
			password,
		])
		.then(([result]) => {
			// res.location(`/users/${result.insertId}`).sendStatus(201);
	res.send(result);

		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error adding the user');
		});


});
app.put('/users/:id', (req, res) => {
  database
  .query('UPDATE users SET ? WHERE id = ?', [req.body, req.params.id])
  .then(([result]) => {
    res.sendStatus(200).send(result);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });

});
app.delete('/users/:id', (req, res) => {
  database
  .query('DELETE FROM users WHERE id = ?', [req.params.id])
  .then(([result]) => {
    res.sendStatus(200).send(result);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });

});

app.listen(port, (err) => {
	if (err) {
		console.error('something bad happened');
	} else {
		console.log('Server is listening');
	}
});



