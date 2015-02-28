define(function(require, exports, module) {
	//@see https://github.com/FrontEnd-home/wiki/blob/master/frontend.md
	var routes = [{
			name: "index",
			match: /^\/(index|index.html)?/i
		},{
			name: "list",
			match: /^\/list\/[\s\S]+/i
		}, {
			name: "tagged",
			match: /^\/tagged\/[\s\S]+/i
		}, {
			name: "search",
			match: /^\/q\/[\s\S]+/i
		}, {
			name: "golbal_objects",
			match: /^\/golbal_objects\/[\s\S]+/i
		}];
	return routes;
});
;define(function(require, exports, module){
	var model = require("model");
	var host = "http://localhost";
	//创建模型的基础方法.
	var createModel = function(url, opt){
		var deafultOpt = {
			url : host + url
		};
		if(opt){
			deafultOpt = $.extend(deafultOpt, opt);
		}
		return model.newInstance([deafultOpt]);
	};
	
	var modelInterface = {};
	modelInterface.getCatory = createModel("/ajax/list");

	module.exports = modelInterface;
	
});
;define(function(require, exports, module) {

	var Storage = require("storage");

	function createStorage(key, value, lifetime) {
		var value = value || {};
		var lifetime = lifetime || 0;
		return Storage.newInstance([key, value, lifetime]);
	}

	var storageInterface = {};
	storageInterface.head = createStorage("HEAD");

	module.exports = storageInterface;
});
;define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();
			this.$el.html("golbal_objects");
		},
		onShow: function(){
			console.log("golbal_objects.show!");
		},
		onHide: function(){
			console.log("golbal_objects.hide!");
		}
	});

	module.exports = listController;
});
;define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();

			// this.$el.html("index<div id='xx'>xxxxxx</div>");
			// this.$el.css("border","1px solid #000");

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
			//this.parent.fire("ClassChange", 222);
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
;define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();

			this.$el.html("list");
		},
		onShow: function(){
			console.log("list.show!");
		},
		onHide: function(){
			console.log("list.hide!");
		}
	});

	module.exports = listController;
});
;define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();
			this.$el.html("search");
		},
		onShow: function(){
			console.log("search.show!");
		},
		onHide: function(){
			console.log("search.hide!");
		}
	});

	module.exports = listController;
});
;define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();

			this.$el.html("tagged");
		},
		onShow: function(){
			console.log("tagged.show!");
		},
		onHide: function(){
			console.log("tagged.hide!");
		}
	});

	module.exports = listController;
});