/* jshint devel:true */

let $ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function(name, fn) {
    this.addEventListener(name, fn);
    return this;
};

Node.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
    this.forEach(function(el) {
        el.on(name, fn);
    });

    return this;
};


export default $;
