const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs')
const querystring = require('querystring');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
var engines = require('consolidate');

// app.set('views', __dirname + '/views');
app.engine('html', engines.htmling);
// app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render(__dirname + "/index.html")
})

app.post('/', function(req, res){
    request.get('https://www.youtube.com/get_video_info?&video_id='+req.body.yid+'&el=info&ps=default&eurl=&gl=US&hl=en', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            s = querystring.parse(body, null, null);
            var t = querystring.parse(s.url_encoded_fmt_stream_map, null, null);
            var data = [];
            var row = {};
            var i = 0;

            t.url.forEach(function(e) {
                row["url"] = e;
                // console.log(t['quality'])
                row['type'] = t['type'][i];
                row['quality'] = t['quality'][i];
                data[i] = row;
                i++
                row={}
            }, this);
            console.log(data[0]['url']);
            res.render(__dirname + "/index.html", { data: data})
        }
    });
});


// request.get(decode("https%3A%2F%2Fr3---sn-hja50u-j3je.googlevideo.com%2Fvideoplayback%3Fmime%3Dvideo%252Fmp4%26gir%3Dyes%26key%3Dyt6%26requiressl%3Dyes%26initcwndbps%3D16512 50%26signature%3DCFE420DF0F6D51B67F9F7215F4DDD6504E8E8379.5187F6BF3AE3157005BA06FF534AB076EC6774AA%26lmt%3D1426136428011814%26expire%3D1509473437%26ipbits%3D 0%26dur%3D269.733%26aitags%3D136%26source%3Dyoutube%26ei%3DPWj4WYXzGpvHdsz0qogO%26itag%3D136%26pl%3D19%26mt%3D1509451760%26sparams%3Daitags%252Cclen%252Cdur% 252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cpl%252Crequiressl%252Csource%252Cexpire%26m v%3Dm%26ms%3Dau%26ip%3D78.137.4.182%26clen%3D10839790%26mm%3D31%26mn%3Dsn-hja50u-j3je%26id%3Do-AMn0ugTrNp8Hbqs2Lx5TcXKK59XOAY_hIZNH9pxUS9Rttype=video%2Fmp4%3B+codecs%3D%22avc1.4d401f%22,bitrate=317553")).pipe(fs.createWriteStream('1.flv'))

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})