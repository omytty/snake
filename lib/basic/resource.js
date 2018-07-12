(function(window) {
    "use strict";

    var isImage = function(fileName) {
        var suffixIndex=fileName.lastIndexOf(".");
        var suffix=fileName.substring(suffixIndex+1).toUpperCase();
        if(suffix!="BMP"&&suffix!="JPG"&&suffix!="JPEG"&&suffix!="PNG"&&suffix!="GIF"){
            return false;
        }
        return true;
    };

    function Resource(resources) {
        var storage = new Object();
        this.len = Object.keys(resources).length;
        this.loaded = 0;
        this.loaded = false;
        this.promises = [];
        for (var resource in resources) {
            this.promises.push(new Promise((function(resolve, reject) {
                if (isImage(resources[resource])) {
                    var image = new Image();
                    image.src = resources[resource];
                    image.setAttribute('imageId', resource);
                    storage[resource] = image;
                    image.onload = (function(e) {
                        this.loaded++;
                        this.onEachLoaded(this);
                        resolve(image);
                    }).bind(this);
                    image.onabort = function(e) {
                        console.log(e);
                        reject('加载资源出错');
                    };
                } else {
                    // only image and audio
                    var audio = new Audio(resources[resource]);
                    storage[resource] = audio;
                    audio.oncanplaythrough = (function(e) {
                        this.loaded++;
                        this.onEachLoaded(this);
                        resolve(audio);
                    }).bind(this);
                    audio.onabort = function(e) {
                        console.log(e);
                        reject('加载资源出错');
                    };
                }
            }).bind(this)));
        }
        this.storage = storage;
    }

    Resource.prototype.onEachLoaded = function(res) {
        // do something.
    };

    Resource.prototype.load = function(callback) {
        Promise.all(this.promises)
        .then((function(values) {
            this.loaded = true;
            callback(this);
        }).bind(this))
        .catch(function(message) {
            throw new Error(message);
        });
    };

    Resource.prototype.get = function(key) {
        if (this.loaded) {
            var value = this.storage[key];
            if (value) {
                return value;
            }
            throw new Error('未找到资源文件');
        }
        throw new Error('资源尚未加载完成');
    };

    window.Resource = Resource;
})(window);
