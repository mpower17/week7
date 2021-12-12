export default function (express, bodyParser, createReadStream, crypto, http, mongoose) {
    const app = express()

    const schema = new mongoose.Schema({
        login: String,
        password: String
    });

    const user = new mongoose.model('user', schema);

    app.use((req, res, next) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
        res.set('Access-Control-Allow-Headers', 'x-test,Content-Type,Accept,Access-Control-Allow-Headers,X-Resp,Access-Control-Expose-Headers');
        res.set('Access-Control-Expose-Headers', 'X-Resp,Content-Type,Accept,Access-Control-Allow-Headers,Access-Control-Expose-Headers');
        res.set('Charset', 'UTF-8');
        res.set('Content-Type', 'text/plain');

        next();
    })

    function login(req, res) {
        res.send("itmo286434");
    }

    async function code(request, response) {
        const reader = createReadStream(import.meta.url.substring(7))
        reader.setEncoding('utf8')
        let result = ''
        for await (const chunk of reader) result += chunk
        response.send(result)
    } 

    function sha1(request, response) {
        response.send(crypto.createHash('sha1').update(request.params.input).digest('hex'))
    }
 
    function reqData(req, res) {
        const url = req.query.addr || req.body
        let msg = ''
        if (url)
            http.get(url, {headers: {'Content-Type': 'text/plain'}}, response => {
                response.setEncoding('utf8')
                response.on('data', chunk => msg += chunk)
                response.on('end', () => res.send(msg))
            })
        else
            res.send('Не удалось получить данные по URL')
    }

    async function insert(req, res) {
        const {login, password, URL} = req.body;
        let newUser = new user({
                    login,
                    password
                });
        try{
            await m.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true});
            try {
                await newUser.save();
                res.status(201);
            } catch(e){
                res.status(400);
            }
        } catch(e) {
            console.log(e.codeName);
        }
    }

    app.get('/login/', login)
    app.get('/insert/', insert)
    app.get('/code/', code)
    app.get('/sha1/:input/', sha1)
    app.get('/req/', reqData)
    app.post('/req/', reqData)
    app.all('*', login)
 
    return app
}