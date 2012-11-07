define(['require','exports','module','.'],function (require, exports) {

    exports.name = 'alpha';
    exports.getGreekName = function () {
        return require('.').name;
    };
});
