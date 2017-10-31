# youtube-video-info [![Build Status](https://secure.travis-ci.org/thebigredgeek/youtube-video-info.png?branch=master)](http://travis-ci.org/thebigredgeek/youtube-video-info)

Extracts meta-information about a youtube info.

## Getting Started
Install the module with: `npm install youtube-video-info`

```javascript
var yvi = require('youtube-video-info');

yvi('ZGGWy8G-GA').then(function(data){ //video id 'ZGGWy8G-GA'
    console.log(data); //spits out JSO meta data about the video
}); 
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2013 Andrew E. Rhyne  
Licensed under the MIT license.
