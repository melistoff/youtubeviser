const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var request = require('request');
var decode = require('urldecode')
var fs = require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

var parse = require('url-parse');

request.get('https://www.youtube.com/get_video_info?&video_id=ON-gzJp2A7g&el=info&ps=default&eurl=&gl=US&hl=en', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var csv = body;
        var list = []
        var ss = {}
        var s = decode(csv).split('&');
        var i = 1;
        s.forEach(function(e) {
            // console.log(e);
            var keys = [];
            ss[e.split("=")[0]]=e.split("=")[1]
            if (list[i])
               keys = Object.keys(list[i])
            console.log(e.split("=")[0] in keys)   
            if (e.split("=")[0] in keys) {
                // console.log(e.split("=")[0])
                i++
            }  
            list[i] = ss;   
        });
        // console.log(list[3].quality_label)

        // console.log(ss)
    }
});
// request.get(decode("https%3A%2F%2Fr3---sn-hja50u-j3je.googlevideo.com%2Fvideoplayback%3Fmime%3Dvideo%252Fmp4%26gir%3Dyes%26key%3Dyt6%26requiressl%3Dyes%26initcwndbps%3D16512 50%26signature%3DCFE420DF0F6D51B67F9F7215F4DDD6504E8E8379.5187F6BF3AE3157005BA06FF534AB076EC6774AA%26lmt%3D1426136428011814%26expire%3D1509473437%26ipbits%3D 0%26dur%3D269.733%26aitags%3D136%26source%3Dyoutube%26ei%3DPWj4WYXzGpvHdsz0qogO%26itag%3D136%26pl%3D19%26mt%3D1509451760%26sparams%3Daitags%252Cclen%252Cdur% 252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cpl%252Crequiressl%252Csource%252Cexpire%26m v%3Dm%26ms%3Dau%26ip%3D78.137.4.182%26clen%3D10839790%26mm%3D31%26mn%3Dsn-hja50u-j3je%26id%3Do-AMn0ugTrNp8Hbqs2Lx5TcXKK59XOAY_hIZNH9pxUS9Rttype=video%2Fmp4%3B+codecs%3D%22avc1.4d401f%22,bitrate=317553")).pipe(fs.createWriteStream('1.flv'))
app.post('/', function(req, res) {
    res.send(req.body.urlYou)

})
// var yvi = require('youtube-video-info');
// yvi('ON-gzJp2A7g').then(function (data) { //video id 'ZGGWy8G-GA' 
//     console.log(data); //spits out JSO meta data about the video 
// }); 
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})