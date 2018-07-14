(function(window) {
    "use strict";

    function Controller(
        snakeHead,
        ctrlTopDom,
        ctrlRightDom,
        ctrlBottomDom,
        ctrlLeftDom
    ) {
        this.state = {
            touchColor: 'rgba(177, 239, 255, 0.5)'
        };

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
        this.ctrlTopDom.style.background = this.state.touchColor;
        this.snakeHead.setMoveUp();
    };

    Controller.prototype.rightTouchHandle = function(event) {
        event.preventDefault();
        this.ctrlRightDom.style.background = this.state.touchColor;
        this.snakeHead.setMoveRight();
    };

    Controller.prototype.bottomTouchHandle = function(event) {
        event.preventDefault();
        this.ctrlBottomDom.style.background = this.state.touchColor;
        this.snakeHead.setMoveDown();
    };

    Controller.prototype.leftTouchHandle = function(event) {
        event.preventDefault();
        this.ctrlLeftDom.style.background = this.state.touchColor;
        this.snakeHead.setMoveLeft();
    };

    Controller.prototype.touchEndHandle = function(event) {
        event.preventDefault();
        this.ctrlTopDom.style.background = 
        this.ctrlRightDom.style.background = 
        this.ctrlBottomDom.style.background = 
        this.ctrlLeftDom.style.background = 
        'rgba(255, 254, 216, 0.5)';
    };

    window.Controller = Controller;
})(window);
