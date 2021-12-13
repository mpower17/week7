export default function (express, bodyParser, createReadStream, crypto, http, mongoose) {
    const app = express()

    app.use(bodyParser.urlencoded({extended:true}));       

    const UserSchema = new mongoose.Schema({
        login: {
          type: 'String'
        },
        password: {
          type: 'String'
        }
    });
    

    const User = mongoose.model('User', UserSchema);

    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Accept'
      };

    const headersText = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Author': login,
        ...CORS,
    };


    function login(req, res) {
        res.set(CORS);
        res.send("itmo286434");
    }

    async function code(req, res) {
        res.set(CORS);
        const reader = createReadStream(import.meta.url.substring(7))
        reader.setEncoding('utf8')
        let result = ''
        for await (const chunk of reader) result += chunk
        response.send(result)
    } 

    function sha1(req, res) {
        res.set(CORS);
        response.send(crypto.createHash('sha1').update(request.params.input).digest('hex'))
    }
 
    function reqData(req, res) {
        res.set(CORS);
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
        res.set(CORS);
        const {login,password,URL}=req.body;
        const newUser = new User({login,password});
        try{
            await m.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true});
            try{
                await newUser.save();
                r.res.status(201).json({'Добавлено: ':login});
            }
            catch(e){
                console.error(e);
                r.res.status(400).json({'Ошибка: ':'Нет пароля'});
            }
        }
        catch(e){
            console.error(e.codeName);
        }  
    }

    app.get('/login/', login)
    app.post('/insert/', insert)
    app.get('/code/', code)
    app.get('/sha1/:input/', sha1)
    app.get('/req/', reqData)
    app.post('/req/', reqData)
    app.all('*', login)
 
    return app
}