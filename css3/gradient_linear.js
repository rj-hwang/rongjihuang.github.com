jQuery(function($) {
	var $trs = $("#items>tbody>tr");

	// find the real css config code. {cssKey: cssValue, ...}
	function getRealCSSConfig(){
		var css = {};
		$trs.each(function(){
			var $this = $(this);
			var $radio = $this.find("input:radio");
			if ($radio.size() == 0 || $radio[0].checked) {
				css[$.trim($this.find("td.label").text())] = $.trim($this.find("td.value").text().replace(/^:|;$/g,""));
			}
		});
		return css;
	}

	// show the real css code
	var css = getRealCSSConfig();
	var code = ["Real CSS code {"];
	for(var k in css){
		code.push("    " + k + ": " + css[k] + ";");
	}
	code.push("}");
	$("#code").html(code.join("\r\n"));
});