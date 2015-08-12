## 功能
1. 前端路由，根据前端路由来控制页面渲染，选择自己的页面控制器.  
2. 支持SEO.  
3. 支持路径修改，实现页面无刷新.  
4. 支持自定义事件. 待完善.  
5. 底层使用seajs，支持amd. 
6. view支持简易事件绑定. 

## 前端路由
页面使用farman.min.js，基于location.pathname的路径来配置前端路由。

	define("routes", [], function(require, exports, module) {
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

## 支持SEO
后端和前端配置相同的URL解析，将内容渲染至页面，供spider爬取.

## 无刷新
框架接管全部a链接跳转，实现修改url，加载ViewController脚本执行, 异步刷新页面.提升网站性能.

## 自定义事件
app和view均继承events类，支持自定义事件, 可以提供更加丰富api.捕获模块事件.

## 支持AMD
底层使用seajs支持amd，seajs有强大的社区和丰富的周边插件，给框架提供有力的支持。

## ViewController简易事件绑定
每个ViewController都继承自View，有自定义的事件，参考backbone的View, 有自己的$el容器，处理自己的view内容.
	
	////...
	events: {
        'click #viewname': 'showViewName'
    },
	showViewName: function(){
		alert( this.viewName );
	}
