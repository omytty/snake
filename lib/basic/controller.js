(function(window) {
    "use strict";

    function Controller(
        snakeHead,
        ctrlTopDom,
        ctrlRightDom,
        ctrlBottomDom,
        ctrlLeftDom
    ) {
        ctrlTopDom.ontouchstart = this.topTouchHandle.bind(this);
        ctrlRightDom.ontouchstart = this.rightTouchHandle.bind(this);
        ctrlBottomDom.ontouchstart = this.bottomTouchHandle.bind(this);
        ctrlLeftDom.ontouchstart = this.leftTouchHandle.bind(this);

        ctrlTopDom.ontouchend = this.touchEndHandle.bind(this);
        ctrlRightDom.ontouchend = this.touchEndHandle.bind(this);
        ctrlBottomDom.ontouchend = this.touchEndHandle.bind(this);
        ctrlLeftDom.ontouchend = this.touchEndHandle.bind(this);

        this.snakeHead = snakeHead;
        this.ctrlTopDom = ctrlTopDom;
        this.ctrlRightDom = ctrlRightDom;
        this.ctrlBottomDom = ctrlBottomDom;
        this.ctrlLeftDom = ctrlLeftDom;
    }

    Controller.prototype.topTouchHandle = function(event) {
        event.preventDefault();
        this.snakeHead.setMoveUp();
    };

    Controller.prototype.rightTouchHandle = function(event) {
        event.preventDefault();
        this.snakeHead.setMoveRight();
    };

    Controller.prototype.bottomTouchHandle = function(event) {
        event.preventDefault();
        this.snakeHead.setMoveDown();
    };

    Controller.prototype.leftTouchHandle = function(event) {
        event.preventDefault();
        this.snakeHead.setMoveLeft();
    };

    Controller.prototype.touchEndHandle = function(event) {
        event.preventDefault();
        // this.snakeHead.setState(0, 0);
    };

    window.Controller = Controller;
})(window);
