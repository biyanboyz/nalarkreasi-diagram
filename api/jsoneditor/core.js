const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
module.exports = (
		app, 
		baseUrl, 
		relativeDiagramPath,
		relativeJsonEditorPublicWWW
	) => {
	app.use(bodyParser.json());
	app.use('/'+baseUrl, express.static(relativeJsonEditorPublicWWW));
	app.get('/'+baseUrl+'/read', (req, res) => {
		res.set('Content-Type', 'application/json');
		res.send(fs.readFileSync(relativeDiagramPath));
	});
	app.post('/'+baseUrl+'/update', (req, res) => {
		if(req.body){
			fs.writeFileSync(relativeDiagramPath, JSON.stringify(req.body, null, '\t'));
			res.send('{success: true}');
		}
	});
}