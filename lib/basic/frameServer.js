(function(window) {
    "use strict";

    window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame;

    function FrameServer() {
        this.raf = false;
        this.isStart = false;
        this.audio = resource.get('backAudio');
        this.audio.volume = 0.2;
        this.audio.loop = true;
        this.nextAction = (function(timestamp) {
            store.observer.update(timestamp);
            this.raf = requestAnimationFrame(this.nextAction);
        }).bind(this)
    }

    FrameServer.prototype.start = function() {
        this.audio.play();
        if (!this.isStart) {
            this.isStart = true;
            this.raf = requestAnimationFrame(this.nextAction);
        }
    };

    FrameServer.prototype.stop = function() {
        this.audio.pause();
        if (this.raf && this.isStart) {
            cancelAnimationFrame(this.raf);
            this.isStart = false;
        }
    };

    window.FrameServer = FrameServer;
})(window);
