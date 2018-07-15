(function(window) {
    "use strict";

    window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame;

    var storage = false;

    function FrameWorker() {
        if (!storage) {
            storage = new FrameServer();
        }
        return storage;
    }

    function FrameServer() {
        this.raf = false;
        this.isStart = false;
        this._s = false;
        this.audio = resource.get('backAudio');
        this.audio.loop = true;
        this.played = false;
        // this.audio.volume = 0.5;
        this.nextAction = (function(timestamp) {
            store.observer.update(timestamp);
            if (!this._s) {
                this.raf = requestAnimationFrame(this.nextAction);
            }
        }).bind(this)
    }

    FrameServer.prototype.start = function() {
        this.audio.play();
        this._s = false;
        if (!this.isStart) {
            this.isStart = true;
            this.raf = requestAnimationFrame(this.nextAction);
        }
    };

    FrameServer.prototype.stop = function() {
        this.audio.pause();
        // if (this.raf && this.isStart) {
            this._s = true;
            cancelAnimationFrame(this.raf);
            this.isStart = false;
        // }
    };

    window.FrameServer = FrameServer;
    window.FrameWorker = FrameWorker;
})(window);
