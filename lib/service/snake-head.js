(function(window) {
    "use strict";

    function SnakeHead(x, y, bodyNumber) {
        Obclient.call(this, store.cg);
        if (!bodyNumber) {
            bodyNumber = 5;
        }
        this.sign = 'head';
        this.x = x;
        this.y = y;
        this.size = 20;
        this.child = null;
        this.lastBody = this;
        this.speed = 1;
        this.updateTime = 300;
        this.score = 0;
        this.old = {
            x: x,
            y: y
        };
        this.snakeHeads = {
            up: resource.get('snakeHeadUp'),
            down: resource.get('snakeHeadDown'),
            left: resource.get('snakeHeadLeft'),
            right: resource.get('snakeHeadRight'),
        };
        this.resource = this.snakeHeads.right;
        this.initState();
        this.initBodys(bodyNumber);
    }

    Obclient.extend(SnakeHead);

    SnakeHead.prototype.update = function(timestamp) {
        this.start || (this.start = timestamp);
        if (this.start && timestamp - this.start > this.updateTime) {
            this.cg.clearRect(this.x, this.y, this.size);
            this.old.x = this.x;
            this.old.y = this.y;
            this.x = this.x + this.state.x * (this.size + 2);
            this.y = this.y + this.state.y * (this.size + 2);
            this.checkBodyCollision(this);
            this.checkWallCollision();
            this.cg.renderImage(this.resource, this.size, this.x, this.y);
            this.checkBerryCollision();
            if (this.child) {
                this.child.update(timestamp);
            }
            this.start = undefined;
        }
    };

    SnakeHead.prototype.initBodys = function(bodyNumber) {
        var body = new SnakeBody(this);
        body.x  = this.x - this.size;
        this.setChild(body);
        this.lastBody = body;
        for (var i = 0; i < bodyNumber; i++) {
            this.appendBody();
        }
    };

    SnakeHead.prototype.appendBody = function() {
        var body = new SnakeBody(this.lastBody);
        this.lastBody.setChild(body);
        this.lastBody = body;
        this.score++;
    };

    SnakeHead.prototype.setChild = function(child) {
        this.child = child;
    };

    SnakeHead.prototype.setSpeed = function(number) {
        this.updateTime = number;
    };

    SnakeHead.prototype.setMoveUp = function() {
        this.resource = this.snakeHeads.up;
        this.setState(0, -this.speed);
    };
    
    SnakeHead.prototype.setMoveDown = function() {
        this.resource = this.snakeHeads.down;
        this.setState(0, this.speed);
    };

    SnakeHead.prototype.setMoveRight = function() {
        this.resource = this.snakeHeads.right;
        this.setState(this.speed, 0);
    };

    SnakeHead.prototype.setMoveLeft = function() {
        this.resource = this.snakeHeads.left;
        this.setState(-this.speed, 0);
    };

    SnakeHead.prototype.checkBerryCollision = function() {
        var berrys = Berry.store
        for (var i in berrys) {
            var berry = berrys[i];
            var halfBerry = berry.size/2;
            var halfHead = this.size/2;
            var swapA = this.y + halfHead;
            var swapB = this.x + halfHead;
            var a = Math.abs(swapA - (berry.y + halfBerry));
            var b = Math.abs(swapB - (berry.x + halfBerry));
            var c = Math.sqrt(a * a + b * b);
            if (c < halfBerry + halfHead) {
                berry.destruct();
                this.appendBody();
            }
        }
    };

    SnakeHead.prototype.checkBodyCollision = function(body) {
        if (!body.child) {
            return true;
        }
        var swapA = this.y+this.size/2;
        var swapB = this.x+this.size/2;
        var a = Math.abs(swapA - (body.child.y + body.child.size/2));
        var b = Math.abs(swapB - (body.child.x + body.child.size/2));
        var c = Math.sqrt(a * a + b * b);
        if (c < 20) {
            store.berryService.destruct();
            this.destruct();
        }
        return this.checkBodyCollision(body.child);
    };

    SnakeHead.prototype.checkWallCollision = function() {
        if (
            store.documentWidth < this.x + this.size ||
            this.x < 0 ||
            this.y < 0 ||
            store.documentHeight < this.y + this.size
        ) {
            store.berryService.destruct();
            this.destruct();
        }
    };

    SnakeHead.prototype.setState = function(x, y) {
        if (x !== null) {
            this.state.x = x;
        }
        if (y !== null) {
            this.state.y = y;
        }
    };

    SnakeHead.prototype.initState = function() {
        this.state = {x: this.speed, y: 0};
    };

    SnakeHead.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
        store.mixed.showEndScreen(this.score);
    };

    window.SnakeHead = SnakeHead;
})(window);
