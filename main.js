(function startServer() {
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser');
    const request = require('request');
    const fs = require('fs')
    const querystring = require('querystring');
    const engines = require('consolidate');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));

    app.engine('html', engines.htmling);

    app.get('/', function (req, res) {
        res.render(__dirname + "/public/index.html")
    })

    app.post('/', function(req, res){

        var video_id = req.body.yid.split("watch?v=")[1] ? req.body.yid.split("watch?v=")[1].split("\\")[0] : req.body.yid

        request.get('https://www.youtube.com/get_video_info?&video_id=' + video_id +'&el=info&ps=default&eurl=&gl=US&hl=en', function (error, response, body) {
           
            if (!error && response.statusCode == 200) {
                var data = [];
                var row = {};
                var i = 0;

                var video_info = querystring.parse(body, null, null);

                if (video_info.status == "ok") {
                    var url_encoded_fmt_stream = querystring.parse(video_info.url_encoded_fmt_stream_map, null, null);
                   
                    var info = {
                        "author": video_info.author,
                        "thumbnail_url": video_info.thumbnail_url,
                        "title": video_info.title
                    };

                    url_encoded_fmt_stream.url.forEach(function(elm) {
                        
                        row["url"] = elm;
                        row['type'] = getType(url_encoded_fmt_stream.type, i);
                        // row['quality'] = url_encoded_fmt_stream['quality'][i];
                        data[i] = row;
                        i++;
                        row={};
                    }, this);
                    res.render(__dirname + "/public/index.html", {info: info, data: data})
                } else {
                    var error = {
                        "reason": video_info.reason
                    }
                    res.render(__dirname + "/public/index.html", { error: error})
                }    
            }
        });
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })
})();

function getDuration(seconds) {
    var min = parseInt(seconds/60);
    seconds = (seconds - (min * 60));

    return min + " minutes " + seconds + " seconds";
}

function getType(types, id) {

    var result = [];
    var i = 0;
    types.forEach(function(el) {
        switch (el.split(";")[0].split("/")[1]) {
            case "mp4":
                result[i] = 'MPEG4';
                break;
            case "webm":
                result[i] = 'WEBM';
                break;
            case "3gpp":
                result[i] = '3GPP';
                break;
        }   
        i++;
    }, this);
    if (id != null) {
        return result[id]
    } else {
        return result
    }
    
}