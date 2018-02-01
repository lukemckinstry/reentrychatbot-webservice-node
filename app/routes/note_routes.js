
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    console.log( id )
    console.log( details )
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });


  app.post('/next', (req, res) => {
    const note = {
    	0:{seq:0,visited:false, text: "Welcome to Reentry ChatBot. Here is how it works: We will" +
    	" walk you through a series of questions. If at any point you have a question, just" +
    	" ask and we will try our best to answer. Ready to get started?" },
    	1:{seq:1, visited:false, text: "Are you looking for information for yourself or somebody else?" },
    	2:{seq:2, visited:false, text: "Do you have a government ID?", deactivate:[3]},
    	3:{seq:3, visited:false, text: "Do you have a birth certificate?" },
    	4:{seq:4, visited:false, text: "Do you need behavioral health and substance abuse services?"}
    };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops);
      }
    });
  });

  app.get('/next/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    console.log( id )
    console.log( details )
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.put('/next/:id', (req, res) => {
    console.log( "LETS PUT SOMETHING" );
    
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    console.log( id )
    console.log( details )
    console.log( req.body.body );

    const note = { text: req.body.body };
    console.log(  "made it here");
    console.log(  note );
    db.collection('notes').update(details, note, (err, result) => {
      console.log( "result ops" )
      //console.log( result.ops )
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });


};