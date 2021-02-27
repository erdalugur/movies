const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { resolveApp } = require('./utils')
const app = express();
const db = require('./db')

//-- middewars start --//
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "*",
}));
// serve static files js|css|html
app.use('/images', express.static(resolveApp('images')));
//-- middlewares end --//

// movies router handler
app.get('/api/movies', async function (req, res, next) {
    res.send({ data: await db.movies.fetchAll() })
})

app.get('/api/movie/:id', async function (req, res, next) {
    let movie = await db.movies.firstOrDefault(x => x.id == req.params.id)
    res.send({ data: movie })
})
app.get('/api/categories', async function (req, res, next) {
    res.send({ data: await db.categories.fetchAll() })
})
app.post('/auth/login', async function (req, res, next) {
    let username = req.body['username']
    let password = req.body['password']
    // check user from db
    let user = {
        firstname: 'Uğur',
        lastname: 'Erdal',
        localtion: 'Antalya/Turkey',
        job: 'React Native Developer',
        username: 'info@ugurerdal.com',
        password: 'hello2021',
        image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
    }
    res.send({ data: user })
})

app.get('/api/category/:id', async function (req, res, next) {
    let category = await db.categories.firstOrDefault(x => x.id == req.params.id)
    res.send({ data: category })
})

// index router handler
app.get('*', async function (req, res, next) {
    res.send('welcome to movie api')
})


const port = 5000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});



