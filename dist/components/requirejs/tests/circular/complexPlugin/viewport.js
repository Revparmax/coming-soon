define(['require','slowText!viewport.html','toolbar'],function(require) {
    return {
        name: 'viewport',
        template: require('slowText!viewport.html'),
        toolbar: require('toolbar')
    };
});
