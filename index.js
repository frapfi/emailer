const express = require('express');

//a single express instance / application
const app = express();

//route handler
app.get('/', (req, res) => {
	res.send({ hi: 'there'})
});

// possibility to inject runtime variables / configs
// (after deployment just before the app starts)
const PORT = process.env.PORT || 5000;

app.listen(PORT);