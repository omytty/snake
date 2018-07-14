(function(window) {
    "use strict";

    function EffectService() {
        this.dom1 = document.getElementById('effect-1');
    }

    EffectService.prototype.output = function(num, message) {
        this['dom' + num].innerText = message;
        setTimeout(() => {
            this['dom' + num].innerText = null;
        }, 1300);
    };

    window.EffectService = EffectService;
})(window);
