/*
 * youtube-video-info
 * https://github.com/thebigredgeek/youtube-video-info
 *
 * Copyright (c) 2013 Andrew E. Rhyne
 * Licensed under the MIT license.
 */

var request = require('request'),
    q       = require('q');


module.exports = function(id){
    var deferral = q.defer();
    request("http://gdata.youtube.com/feeds/api/videos/"+id+"?v=2&alt=json",function(error,response,body){
        if(error){
            deferral.reject(error);
        }
        else{
            deferral.resolve(body);
        }
    });
    return deferral.promise;
};
