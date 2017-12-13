/*
Todo

const fs = require('fs');
const express = require('express');
const app = express();
const diagramPath = "../../../data/diagram.json";

app.use(express.static('public'));
app.get('/read', (req, res) => {
	res.send(fs.readFileSync(diagramPath));
});
app.get('/update', (req, res) => {
	if(req.params.json){
		fs.writeFileSync(diagramPath, req.params.json);
	}
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
*/