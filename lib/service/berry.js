(function(window) {
    "use strict";

    function Berry(x, y) {
        Obclient.call(this, store.cg);
        this.x = x;
        this.y = y;
        this.size = store.snakeSize;
        this.resource = resource.get('berry');
        this.update();
    }

    Obclient.extend(Berry);

    Berry.store = new Object();

    Berry.prototype.onMount = function() {
        Berry.store[this.id] = this;
    };

    Berry.prototype.update = function() {
        this.cg.clearRect(this.x, this.y, this.size);
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
    };

    Berry.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        delete Berry.store[this.id];
        this.cg.clearRect(this.x, this.y, this.size);
    };

    window.Berry = Berry;
})(window);
