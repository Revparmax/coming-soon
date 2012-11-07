define(['require','exports','module'],function (require, exports, module) {
    return {
        //no config, just should get an empty object.
        id: 'plain' + (module.config().foo || '')
    }
});
