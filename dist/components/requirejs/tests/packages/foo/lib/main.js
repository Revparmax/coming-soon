define(['require','exports','module','alpha'],function (require, exports) {    
    exports.name = 'foo';
    exports.alphaName = require('alpha').name;
});
