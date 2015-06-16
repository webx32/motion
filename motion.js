(function(){

/*===================filePath:[src/main/motion/motion.js]======================*/
/**
 * @author Brucewan
 * @version 1.0
 * @date 2014-06-13
 * @description tg核心功能
 * @example
		var tab1 = new mo.Tab({
			target: $('#slide01 li')
		}); 
 * @name mo
 * @namespace
 */
(function(){

	(function(){
		
		if(window.Motion) {
			return;
		}

		var Motion = /** @lends mo */{
			/**
			 * tg版本号
			 * @type {string}
			 */
			version: '1.1',

			/**
			 * 命令空间管理 eg. Motion.add('mo.Slide:mo.Tab', function(){})
			 * @param {string} name 
			 * @param {object} obj 
			 */

			add: function(name, obj){
				var target = window;
				var me = arguments.callee;
				var parent = null;
				var isMatch = /^([\w\.]+)(?:\:([\w\.]+))?\s*$/.test(name);
				var objNS = RegExp.$1.split('.');
				var parentNS = RegExp.$2.split('.');
				var name = objNS.pop();
				var isClass = /[A-Z]/.test(name.substr(0,1));
				var constructor = function(){
					var mainFn = arguments.callee.prototype.init;
					if (typeof(mainFn) == 'function' && arguments.callee.caller != me) {
						mainFn && mainFn.apply(this, arguments);
					}
				};

				for(var i = 0; i < objNS.length; i++) {
					var p = objNS[i];
					target = target[p] || (target[p] = {});
				}

				if (parentNS[0] != '') {
					parent = window;
					for (var i = 0; i < parentNS.length; i ++) {
						parent = parent[parentNS[i]];
						if(!parent) {
							parent = null;
							break;
						}
					}
				}


				if(isClass && typeof(obj) == 'function') {
					if(parent) {
						constructor.prototype = new parent();
						constructor.prototype.superClass = parent;
					} 
					target[name] = constructor;
					constructor.prototype.constructor = constructor;
					obj.call(target[name].prototype);
				} else {
					target[name] = obj;
				}

			}

		};

		window.Motion = window.mo = Motion;
	})();

})();

/*===================filePath:[src/main/base/base.js]======================*/
/**
 * @version 1.0
 * @date 2014-06-15
 * @description mo
 * @name mo
 * @namespace
*/

/**
 * @author Brucewan
 * @version 1.0
 * @date 2014-06-18
 * @description 基础类
 * @name mo.Base
 * @class
*/
(function(){
	
	
	Motion.add('mo.Base', function() {
		/**
		 * public 作用域
		 * @alias mo.Base#
		 * @ignore
		 */
		var _public = this;
		/**
		 * public static作用域
		 * @alias mo.Base.
		 * @ignore
		 */
		var _static = this.constructor;
		/**
		 * private static作用域
		 * @alias mo.Base~
		 * @ignore
		 */
		var _self = {};
		/**
		 * 构造函数
		 */
		_public.constructor = function() {
			// private作用域
			var _private = {};
		};


		/**
		 * 绑定事件
		 */
		
		_public.on = function(name, fn) {
			box = Zepto(this);
			return box.on.apply(box, arguments);
		};


		/**
		 * 绑定事件
		 */
		_public.off = function(name, fn) {
			box = Zepto(this);
			return box.off.apply(box, arguments);
		};

		/**
		 * 触发事件
		 */
		_public.trigger = function(name, data) {
			var box = Zepto(this);
			return box.triggerHandler.apply(box, arguments);
		};

		

	});

})();

})();