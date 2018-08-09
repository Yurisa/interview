(function(window){
  var zepto = {};

  function Z(dom, selector){
    var i,len = dom ? dom.length : 0;
    for(i = 0; i < len; i++){
        this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || '';
  }

  zepto.Z = function(dom, selector){
      return new Z(dom, selector);
      
  }

  zepto.init = function(selector){
      var slice = Array.prototype.slice
      var dom = slice.call(document.querySelectorAll(selector));
      return zepto.Z(dom, selector);
  }

  var $ = function(selector){
      return zepto.init(selector);
  }

  window.$ = $

  $.fn = {
      css: function(){
         alert('css');
      },
      html: function(){
         alert('html')
      }

  }
  zepto.Z.prototype = Z.prototype = $.fn
})(window)