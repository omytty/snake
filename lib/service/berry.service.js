(function(window) {
    "use strict";

    function BerryService() {
        Obclient.call(this, store.cg);
        this.state = {
            start: false,
        };
    }

    Obclient.extend(BerryService);

    BerryService.prototype.update = function(timestamp) {
        this.state.start || (this.state.start = timestamp);
        if (this.state.start && timestamp - this.state.start > 3000) {
            if (this.lens() < 5) {
                var x = Math.floor((Math.random() * store.documentWidth - 30));
                var y = Math.floor((Math.random() * store.documentHeight - 30));
                if (x < 1) {
                    x = 1
                }
                if (y < 1) {
                    y = 1;
                }
                store.observer.attach(new Berry(x, y));
            }
            this.state.start = false;
        }
    };

    BerryService.prototype.lens = function() {
        return Object.keys(Berry.store).length;
    };

    BerryService.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        for (var i in Berry.store) {
            Berry.store[i].destruct();
        }
        Berry.store = {};
    };

    window.BerryService = BerryService;
})(window);
