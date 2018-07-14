(function(window) {
    "use strict";

    function Container() {
        this.storage = new Object();
    }

    Container.prototype.set = function(key, obj) {
        this.storage[key] = obj;
    };

    Container.prototype.get = function(key) {
        if (this.storage[key]) {
            return this.storage[key];
        }
        throw new Error('Container: 请求对象不存在');
    };
})(window);