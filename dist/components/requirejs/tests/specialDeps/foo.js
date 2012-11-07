define(['require','exports','module','exports','require','module'],function(require, exports, module) {
    require('exports').name = 'foo';
    require('require')('exports').related = require('module').config().related;
});