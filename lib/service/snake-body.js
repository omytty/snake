(function(window) {
    "use strict";

    function SnakeBody(parent) {
        this.cg = store.cg;
        this.sign = 'body';
        this.x = parent.x;
        this.y = parent.y;
        this.size = parent.size;
        this.parent = parent;
        this.child = null;
        this.old = {
            x: this.x,
            y: this.y
        };
        this.resource = resource.get('snakeBody');
    }

    SnakeBody.store = new Object();

    SnakeBody.prototype.onMount = function() {
        SnakeBody.store[this.id] = this;
    };

    SnakeBody.prototype.update = function(timestamp) {
        this.old.x = this.x;
        this.old.y = this.y;
        this.cg.clearRect(this.x, this.y, this.size);
        this.x = this.parent.old.x;
        this.y = this.parent.old.y;
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
        if (this.child) {
            this.child.update(timestamp);
        }
    };

    SnakeBody.prototype.setChild = function(child) {
        this.child = child;
    };

    SnakeBody.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
        delete SnakeBody.store[this.id];
    };

    window.SnakeBody = SnakeBody;
})(window);
