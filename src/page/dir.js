/**
 * @class dir
 * @desc view类.
 * @date 2015/01/16
 * @author farman(yuhongfei1001@163.com)
 */
define(function(require, exports, module) {
	var Events = require("events");

	var Dir = Events.extend({
		init: function(parent, className, data) {
			this._super();

			this.parent = parent;
			this.$el = $("<div></div>");
			this.className = className;
			this.dirData = data;
			this.render(data);
			this.bindEvent();
		},
		renderTitle: function(title, href){
			var titleTpl = '<a href="<%=href%>" class="_list-item _icon-css _list-dir"><span class="_list-arrow"></span><%=title%></a>';
			var render = _.template(titleTpl);
			var html = render({
				title: title,
				href : href
			});
			this.$el.append(html);
		},
		renderBody: function(subData){
			var self = this;
			var bodyTpl = [
				'<div class="_list _list-sub">',
					'<%subData.forEach(function(item){%>',
					'<a href="/dom-battery-status/" class="_list-item _list-dir" data-slug="battery-status">',
						'<span class="_list-arrow"></span>',
						'<span class="_list-count">10</span>',
						'<%=item%>',
					'</a>',
					'<%})%>',
				'</div>'
			].join("");
			var render = _.template(bodyTpl);
			var html = render({
				subData: subData
			});
			this.$el.append(html);
		},
		render: function(data){
			this.$el.empty();
			this.renderTitle(this.className,"");
			this.renderBody(data);
		},
		bindEvent: function(e){
			var self = this;
			// this.$el.delegate("p","click", function(e){
			// 	var target = $(e.target);
			// 	target.css("color","red");
			// 	self.parent.fire("OpenPage", target.text());
			// });
			// this.$el.delegate("h1","click", function(e){
			// 	var target = $(e.target);
			// 	target.css("color","green");
			// 	self.parent.fire("OpenClass", target.text());
			// });
		},
		openClass: function(){
			console.log("show");
		},
		closeClass: function(){
			console.log("hide");
		}
	});
	module.exports = Dir;
});