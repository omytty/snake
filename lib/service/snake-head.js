(function(window) {
    "use strict";

    function SnakeHead(x, y, size) {
        Obclient.call(this, store.cg);
        store.score = store.score - 5;
        this._sign = 'right';
        this.sign = 'right';
        this.x = x;
        this.y = y;
        this.size = size;
        this.child = null;
        this.lastBody = this;
        this.speed = 1;
        this.updateTime = 300;
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
        this.endAudio = resource.get('endAudio');
        this.resource = this.snakeHeads.right;
        this.initState();
        this.initBodys(5);
    }

    Obclient.extend(SnakeHead);

    SnakeHead.prototype.update = function(timestamp) {
        this.start || (this.start = timestamp);
        if (this.start && timestamp - this.start > this.updateTime) {
            this.checkBerryCollision();

            this.cg.clearRect(this.x, this.y, this.size);
            this.old.x = this.x;
            this.old.y = this.y;
            this.x = this.x + this.state.x * this.size;
            this.y = this.y + this.state.y * this.size;
            this.checkBodyCollision(this);
            this.checkWallCollision();
            this.cg.renderImage(this.resource, this.size, this.x, this.y);
            if (this.child) {
                this.child.update(timestamp);
            }
            this.sign = this._sign;
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
        store.score++;
    };

    SnakeHead.prototype.setChild = function(child) {
        this.child = child;
    };

    SnakeHead.prototype.setSpeed = function(number) {
        this.updateTime = number;
    };

    SnakeHead.prototype.setMoveUp = function() {
        if (this.sign != 'down') {
            this._sign = 'up';
            this.resource = this.snakeHeads.up;
            this.setState(0, -this.speed);
        }
    };
    
    SnakeHead.prototype.setMoveDown = function() {
        if (this.sign != 'up') {
            this._sign = 'down';
            this.resource = this.snakeHeads.down;
            this.setState(0, this.speed);
        }
    };

    SnakeHead.prototype.setMoveRight = function() {
        if (this.sign != 'left') {
            this._sign = 'right';
            this.resource = this.snakeHeads.right;
            this.setState(this.speed, 0);
        }
    };

    SnakeHead.prototype.setMoveLeft = function() {
        if (this.sign != 'right') {
            this._sign = 'left';
            this.resource = this.snakeHeads.left;
            this.setState(-this.speed, 0);
        }
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
                window.store.berryService.audio.pause();
                window.store.berryService.audio.play();
                berry.destruct();
                this.appendBody();
                if ((store.score % 10) === 0) {
                    store.effectService.output(1, ' Apple x ' + store.score);
                }
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
        if (c < store.snakeSize - 3) {
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
            cancelAnimationFrame(window.frameServer.raf);
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
        store.mixed.showEndScreen(store.score);
        window.frameServer.stop();
        this.endAudio.play();
        store.berryService.destruct();
    };

    window.SnakeHead = SnakeHead;
})(window);
