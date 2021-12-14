export default function (express, bodyParser, createReadStream, crypto, http, mongoose) {
    const app = express()

    app.use(bodyParser.json());       

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
        console.error(req.body);
        const {login,password,URL}=req.body;
        const newUser = new User({login,password});
        try{
            await m.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true});
            try{
                await newUser.save();
                res.status(201).json({'Добавлено: ':login});
            }
            catch(e){
                console.error(e);
                res.status(400).json({'Ошибка: ':'Нет пароля'});
            }
        }
        catch(e){
            console.error(e.codeName);
        }  
    }

    function wordpress(req, res) {
        res.set(CORS);
        res.send({
            id: 1,
            title: {
                rendered: login
            }
        });
    }

    function wordpressPost(req, res) {
        res.set(CORS).send({
            id: 1,
            title: {
                rendered: login
            }
        });
    }

    async function render(req, res) {
        res.set(CORS);
        res.set(headersText);
        const { addr } = req.query;
        const { random2, random3 } = req.body;
        const r2 = req.body.random2;
        
        
        console.log(random2);

        http.get(addr, (r, body = '') => {
          r.on('data', (data) => (body += data)).on('end', () => {
            writeFileSync('views/render.pug', body);
            res.render('render', { login: login, random2, random3 });
          });
        });
    }


    app.get('/login/', login)
    app.post('/insert/', insert)
    app.get('/code/', code)
    app.get('/sha1/:input/', sha1)
    app.get('/req/', reqData)
    app.post('/req/', reqData)
    app.post('/wordpress/', wordpress)
    app.post('/wordpress/wp-json/wp/v2/posts/1', wordpressPost)
    app.post('/render/', render)
    app.all('*', login)
 
    return app
}