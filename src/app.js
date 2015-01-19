/**
 * @class app
 * @desc 单页app类
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define(function(require, exports, module) {
	
	var Parser = require("parser");
	var Events = require("events");
	var SideBar = require("sideBar");

	var App = Events.extend({
		init: function( routes, defaultView ) {
			this._super();
			
			this.root = $("#contentView");
			this.views = {};
			this.viewList = [];
			this.currentView = Events.newInstance();
			this.sideBarView = SideBar.newInstance([this, {
				"javascript":["Date","Json","String","Number"],
				"node":["fs","http","net"]
			}]);
			this.root.append( this.sideBarView.$el );

			this.parser = Parser.newInstance([location, routes, defaultView]);
			this.updateView();
			this.obServer();
		},
		obServer: function(){
			this.registerEvent();
			var self = this;
			this.root.delegate("a","click", function(e){
				var href = $(e.target).attr("href");
				if(href){
					e.preventDefault();
					self.forward(href);
					self.viewChange(href);
				}
			});
		},
		registerEvent: function(){
			var self = this;
			this.on("OpenClass", function(data){
				self.currentView.fire("OpenClass",data);
			});
			this.on("OpenPage", function(data){
				self.currentView.fire("OpenPage",data);
			});

			this.on("ClassChange", function(newClass){
				self.sideBarView.fire("ClassChange", newClass);
			});
		},
		viewChange: function(href){
			var path = href || location.pathname;
			this.parser.decode(path, "path");
			this.updateView();
		},
		updateView: function(){
			this.view = this.parser.view;
			this.loadView( this.view );
		},
		loadView: function( view ){
			if(!view){
				console.error("have no this page!, please check routes!");
				return;
			}
			this.currentView.fire("hide");
			if(this.views[view]){
				this.currentView = this.views[view];
			} else{
				try{
					this.currentView = require(view).newInstance();
					this.currentView.parent = this;
					this.root.append( this.currentView.$el );
					this.views[view] = this.currentView;
					this.viewList.push(this.currentView);
				}catch(e){
					console.error("have no this view!");
				}
			}
			this.currentView.fire("show");
		},
		forward: function( page ){
			var currentState = history.state;
			history.pushState(currentState, "", page);
		}
	});

	module.exports = App;
});