// implement your API here
const db = require('./data/db.js');

const express = require('express');

const server = express();

server.listen(4000, () => {
    console.log('Listening on port 4000...');
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world!');
});



server.post('/users', (req, res) => {
    const userInfo = req.body;


    console.log(userInfo);

    db.insert(userInfo)
        .then( user => {
            if(userInfo.name && userInfo.bio) {
                res.status(201).json({ success: true, user })
            } else  {
                res.status(400).json({ success: false, message: 'Please provide name and bio for the user.'})
            }
            
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        });
});



server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })

});
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(userId => {
            if (userId) {
                res.status(200).json(
                    { success: true, userId });
            } else {
                res.status(500).json(
                    { success: false, message: 'id not found' });
            }
        });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.status(204).end();
            } else {
                res.status(404).json(
                    { success: false, message: 'id is not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });

});

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.update(id, changes)
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json({ success: true, updatedUser });
            } else {
                res.status(404).json(
                    { success: false, message: 'id not found ' });
            }
        });
});