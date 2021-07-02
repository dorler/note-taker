const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

router.get('/api/notes', (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

router.post('/api/notes', (req, res) => {

    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }

    return fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        allNotes.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(allNotes), () => {
            res.json(true);
        });
    });
});

router.delete('/api/notes/:id', (req, res) => {

    const id = req.params.id;

    return fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        
        const filteredData = allNotes.filter(note => id !== note.id)

        fs.writeFile("db/db.json", JSON.stringify(filteredData), () => {
            res.json(true);
        });
    });
});

module.exports = router;