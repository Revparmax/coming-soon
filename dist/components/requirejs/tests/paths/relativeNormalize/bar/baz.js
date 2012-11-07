define(['require','./foo'],function (require) {
    return {
        name: 'baz',
        foo: require('./foo')
    };
});
