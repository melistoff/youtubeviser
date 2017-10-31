'use strict';

var yvi = require('../lib/youtube-video-info.js');

exports.signature = function(test){
    test.ok(typeof yvi === 'function','should be a function');
    test.done();
};
