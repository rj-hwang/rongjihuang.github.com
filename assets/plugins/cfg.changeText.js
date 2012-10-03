(function( $ ){
  var methods = {
    init : function( options ) {
      var data = this.data('changeText');
      if(data) return this;

      // 配置
      var settings = $.extend({
        min : 0,
        max : 100
      }, options);
      var $dom = $('<ul class="picker text"></ul>').hide().appendTo("body");
      $dom.mousedown(function(e) {
        // 避免点击配置窗口时窗口关闭
        e.stopPropagation();
      });
      var html = [];
      for(var i=0; i < settings.items.length; i++){
        html.push("<li>" + settings.items[i] + "</li>");
      }
      $dom.html(html.join(""));

      console.log("changeText: init");

      // 记录状态
      var $target = settings.target ? $(settings.target) : this;
      this.data('changeText', {
        target : $target, 
        dialog : $dom
      });

      // 绑定鼠标悬停事件
      $dom.delegate("li", {
        mouseenter : function(e) {
          $(this).css("text-decoration","underline");
        },
        mouseleave : function(){
          $(this).css("text-decoration","none");
        },
        click : function(){
          var text = $(this).text();
          $target.text(text);
          if(settings.change){
            cfg.getFN(settings.change).call($dom, text);
          }
        }
      });

      // 绑定选择事件
      var $this = this;
      this.bind("click.changeText", function(e) {
        $dom.css($this.offset()).fadeIn();
        $(document).one('mousedown', function handler() {
          $dom.fadeOut();
        });
        console.log("changeText:" + "click");
      });
    },
    destory : function( ) { 
      var data = this.data('changeText');
      data.dialog.undelegate();
      data.dialog.remove();
      this.removeData('changeText');
      this.unbind('.changeText');
    }
  };

  $.fn.changeText = function(method) { 
    // 方法调用逻辑
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.changeText' );
    }    
  };
})( jQuery );