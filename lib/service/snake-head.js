(function(window) {
    "use strict";

    function SnakeHead(x, y) {
        Obclient.call(this, store.cg);
        this.x = x;
        this.y = y;
        this.size = 20;
        this.resource = resource.get('snakeHead');
        this.initState();
    }

    Obclient.extend(SnakeHead);

    SnakeHead.prototype.update = function(timestamp) {
        this.cg.clearRect(this.x - 2, this.y - 2, this.size+4);
        this.x = this.x + this.state.x;
        this.y = this.y + this.state.y;
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
    };

    SnakeHead.prototype.onCollision = function() {
        
    };

    SnakeHead.prototype.setState = function(x, y) {
        if (x) {
            this.state.x = x;
        }
        if (y) {
            this.state.y = y;
        }
    };

    SnakeHead.prototype.initState = function() {
        this.state = {x: 0, y: 0};
    };

    SnakeHead.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
    };

    window.SnakeHead = SnakeHead;
})(window);
