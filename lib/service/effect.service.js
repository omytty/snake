(function(window) {
    "use strict";

    function EffectService() {
        Obclient.call(this, store.cg);
        this.audio = resource.get('eatAudio');
    }

    Obclient.extend(EffectService);

    EffectService.prototype.update = function(timestamp) {
        
    };

    EffectService.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
    };

    window.EffectService = EffectService;
})(window);
