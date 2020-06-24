const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const bugs = [
    {
        id: 123,
        description: 'Window width is very large on login screen',
        userId: 1,
        resolved: true,
        priority: 1
    },
    {
        id: 223,
        description: 'Popup text on landing page is blurry',
        userId: 4,
        resolved: false,
        priority: 3
    },
    {
        id: 322,
        description: 'Navbar should be sticky',
        userId: 2,
        resolved: false,
        priority: 2
    },
    {
        id: 433,
        description: 'Sidebar needs to be togglable on the left',
        userId: null,
        resolved: true,
        priority: 3
    }
];

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Katia' },
    { id: 3, name: 'Mosh' },
    { id: 4, name: 'George' }
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

const bugsEndpoint = '/api/bugs';

app.get(bugsEndpoint, (req, res) => {
    res.json(bugs);
});

app.post(bugsEndpoint, (req, res) => {
    const { description, userId, resolved, priority } = req.body;
    const bug = {
        id: Date.now(),
        description,
        userId,
        resolved,
        priority
    };
    bugs.push(bug);

    res.json(bug);
});

app.patch(`${bugsEndpoint}/:id`, (req, res) => {
    const index = bugs.findIndex(bug => bug.id === parseInt(req.params.id));
    const bug = bugs[index];
    if ('resolved' in req.body) bug.resolved = req.body.resolved;
    if ('userId' in req.body) bug.userId = req.body.userId;

    res.json(bug);
});

app.delete(`${bugsEndpoint}/:id`, (req, res) => {
    const {
        params: { id }
    } = req;
    const bug = bugs.find(bug => bug.id === parseInt(id));

    if (!bug) {
        res.status(404).send(`The bug with the id ${id} was not found`);
        return;
    }
    const index = bugs.indexOf(bug);
    bugs.splice(index, 1);
    res.send(bug);
});

app.listen(9001, () => {
    console.log('Node server started on port 9001.');
});
