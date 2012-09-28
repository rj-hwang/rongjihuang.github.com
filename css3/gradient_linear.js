var cssCfg = {
	/** get the real css config code. return {cssKey: cssValue, ...} */
	getRealCSSConfig: function($container){
		// find all config line
		var $lines = $container.find(".line");
		var css = {};
		$lines.each(function(){
			var $this = $(this);

			var $select = $this.find("input:radio,input:checkbox");
			if ($select.size() == 0 || $select[0].checked) {
				css[$.trim($this.find(".key").text())] = $.trim($this.find(".value").text().replace(/^:|;$/g,""));
			}
		});
		return css;
	},

	/** update */
	doChange: function(){
		console.log("doChange");
		var $lines = $("#lines");
		var css = cssCfg.getRealCSSConfig($lines);
		var code = ["#target {"];
		for(var k in css){
			code.push("    " + k + ": " + css[k] + ";");
		}
		code.push("}");
		$("#code").html(code.join("\r\n"));

		// set target css
		$("#target").css(css);
	}
};

jQuery(function($) {
	// show the real css code
	cssCfg.doChange();

	var $lines = $("#lines");
	$lines.find(".line>td.value>div").each(function() {
		var $this = $(this);
		var cfg = $this.data("cfg");
		console.log("cfg.type=" + cfg.type);

		if (cfg.type == "color") {	// select color
			var $picker = $('<div class="picker color"/>').appendTo("body")
				.mousedown(function(e) {
					e.stopPropagation();
				});
			var farb = $.farbtastic($picker, function(c) {
				if (c) {
					$this.text(c.toUpperCase()).next().css({backgroundColor:c.toUpperCase()});
					cssCfg.doChange();
				}
			});
			$this.click(function() {
				farb.setColor($this.text());
				$picker.css($this.offset()).fadeIn();
				$(document).one('mousedown', function handler() {
					$picker.fadeOut();
				});
			});
			
			$this.next().css({backgroundColor:$this.text()});
		} else if (cfg.type == "number") {	// change number
			var $picker = $('<div class="picker number"><input type="range" value="0" max="100" step="1"/></div>').appendTo("body")
				.mousedown(function(e) {
					e.stopPropagation();
				});
			$picker.children().change(function() {
				$this.text(this.value);
				cssCfg.doChange();
			});
			$this.click(function() {
				$picker.children().attr({min: cfg.min, max: cfg.max}).val($this.text());
				$picker.css($this.offset()).fadeIn();
				$(document).one('mousedown', function handler() {
					$picker.fadeOut();
				});
			});
		}
	});

	$lines.find("input:radio,input:checkbox").change(cssCfg.doChange);
});