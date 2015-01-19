define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();

			this.$el.html("index<div id='xx'>xxxxxx</div>");
			this.$el.css("border","1px solid #000");

			var self = this;
			this.on("OpenPage", function(page){
				self.$el.append(page+"<br/>");
			});	
			this.on("OpenClass", function(src){
				self.$el.append(src+"<br/>");
			});

		},
		events:{
			"click #xx":"showMe"
		},
		showMe: function(){
			this.parent.fire("ClassChange", 222);
		},
		onShow: function(){
			this._super();
			console.log("index.show!");
		},
		onHide: function(){
			console.log("index.hide!");
		}
	});

	module.exports = listController;
});