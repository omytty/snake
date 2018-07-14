(function(window) {
    "use strict";

    function BerryService() {
        Obclient.call(this, store.cg);
        this.audio = resource.get('eatAudio');
        this.state = {
            start: false,
        };
    }

    Obclient.extend(BerryService);

    BerryService.prototype.update = function(timestamp) {
        this.state.start || (this.state.start = timestamp);
        if (this.state.start && timestamp - this.state.start > 3000) {
            if (this.lens() < 5) {
                var xNumber = Math.floor((Math.random() * store.xNumber));
                var yNumber = Math.floor((Math.random() * store.yNumber));
                var x = xNumber * store.snakeSize;
                var y = yNumber * store.snakeSize;
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
        Berry.store = {};
    };

    window.BerryService = BerryService;
})(window);
