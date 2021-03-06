(function(window, document) {
    "use strict";

    function Mixed() {
        this.noticeWarn = document.getElementById('notice-warn');
        this.noticeDom = document.getElementById('notice');
        this.noticeMessage = document.getElementById('notice-message');
        this.gameMessage = document.getElementById('game-message');
        this.gameLine = document.getElementById('game-line');
        this.gameStart = document.getElementById('game-start');
        this.pulse = document.getElementById('pulse');
        this.noticeWarn = document.getElementById('notice-warn');
        this.controllerDom = document.getElementById('controller');
        this.state = {
            noticeCounter: 1
        };
    }

    Mixed.prototype.getState = function(key) {
        var value = this.state[key];
        if (typeof(value) == undefined) {
            throw new Error('Get state of undefined.');
        }
        return value;
    };

    Mixed.prototype.notice = function(text, time) {
        this.state.noticeCounter++;
        var text = 'warning';
        if (this.state.noticeCounter % 5 === 0) {
            text = 'be careful!';
        }
        this.noticeWarn.innerText = text;
        setTimeout(() => {
            this.noticeWarn.innerText = null;
        }, 1000);
    };

    Mixed.prototype.showEndScreen = function(score) {
        this.gameStart.onclick = this.restartGame.bind(this);
        this.noticeMessage.innerText = 'Game Over';
        this.gameMessage.innerText = '吃掉了 '+ score + ' 个苹果';
        this.gameStart.innerText = '再来一局';
        this.noticeDom.style.display = 'block';
    };

    Mixed.prototype.restartGame = function() {
        this.noticeDom.style.display = 'none';
        window.resource.load(main);
    };

    Mixed.prototype.startGame = function(event) {
        this.noticeDom.style.display = 'none';
        window.frameServer.start();
    };

    Mixed.prototype.gameStartHandle = function(dom) {
        dom.onclick = this.startGame.bind(this);
    };

    Mixed.prototype.initScreen = function() {
        this.noticeMessage.innerText = 'Greedy Snake!';
        this.gameMessage.innerText = '加载成功～';
        this.gameStart.style.display = 'inline';
    };

    Mixed.prototype.toggleGameHandle = function(dom) {
        dom.onclick = this.toggleGame.bind(this);
    };

    window.Mixed = Mixed;
})(window, document);