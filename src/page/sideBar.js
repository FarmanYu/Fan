/**
 * @class sideBar
 * @desc view类.
 * @date 2015/01/16
 * @author farman(yuhongfei1001@163.com)
 */
define(function(require, exports, module) {
	var Events = require("events");
	var Dir = require("dir");

	var SideBar = Events.extend({
		init: function(parent, data) {
			this._super();

			var self = this;
			this.dirs = [];
			this.parent = parent;
			this.$el = $("<div class='_list'></div>");
			this.render(data);
			this.on("show", function(){
				self.$el.show();
				self.onShow();	
			});
			this.on("hide", function(){
				self.$el.hide();
				self.onHide();
			});
			this.on("OpenClass", function(src){
				self.onOpenClass(src);
			});

			this.on("OpenPage", function(page){
				self.onOpenPage(page);
			});

			this.on("ClassChange", function(data){
				alert(data);
			});
		},
		render: function(data){
			this.$el.empty();
			for(var className in data){
				var dirInstance = Dir.newInstance([this, className, data[className]]);
				this.dirs.push(dirInstance);
				this.$el.append( dirInstance.$el );
			}
		},
		onShow: function(){
			console.log("show");
		},
		onHide: function(){
			console.log("hide");
		},
		onOpenClass: function(src){
			this.parent.fire("OpenClass", src);
		},
		onCloseClass: function(src){
			console.log(src);
		},
		onOpenPage: function(page){
			this.parent.fire("OpenPage", page);
		},
		onClosePage: function(page){
			console.log(page);
		}
	});
	module.exports = SideBar;
});