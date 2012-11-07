define({
    load: function (id, require, load, config) {
        
        if (id === 'broken') {
            var err = new Error('broken');
            err.plugMessage = id;
            load.error(err);
        } else {
            load(id);
        }
    }
});