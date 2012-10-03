(function( $ ){
  var methods = {
    init : function( options ) {
      var data = this.data('changeNumber');
      if(data) return this;

      // 配置
      var settings = $.extend({
        min : 0,
        max : 100
      }, options);
      var $dom = $('<div class="picker number"><input type="range" value="0" max="100" step="1"/></div>').hide().appendTo("body");
      $dom.mousedown(function(e) {
        // 避免点击配置窗口时窗口关闭
        e.stopPropagation();
      });

      console.log("changeNumber: init");

      // 记录状态
      var $target = settings.target ? $(settings.target) : this;
      var $changer = $dom.children();
      $changer.attr({min: settings.min, max: settings.max}).val($target.text());
      this.data('changeNumber', {
        target : $target, 
        changer : $changer, 
        dialog : $dom
      });

      // 绑定变动事件
      $changer.bind("change.changeNumber", function() {
        $target.text(this.value);
        if(settings.change){
          cfg.getFN(settings.change).call($dom, this.value);
        }
      });

      // 绑定点击事件
      var $this = this;
      this.bind("click.changeNumber", function(){
        $dom.css($this.offset()).fadeIn();
        $(document).one('mousedown', function handler() {
          $dom.fadeOut();
        });
        console.log("changeNumber:" + "click");
      });
    },
    destory : function( ) { 
      var data = this.data('changeNumber');
      data.changer.unbind('.changeNumber');
      data.dialog.remove();
      this.removeData('changeNumber');
      this.unbind('.changeNumber');
    }
  };

  $.fn.changeNumber = function(method) { 
    // 方法调用逻辑
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.changeNumber' );
    }    
  };
})( jQuery );