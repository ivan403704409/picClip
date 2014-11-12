/*!
 *author: Ivan;42600
 *obj: 可为id或对象，必选;
 *opt: 参数，可选;
 **minL: 左边界，默认不限制;
 **maxL: 右边界，默认不限制;
 **minT: 上边界，默认不限制；
 **maxT: 下边界，默认不限制；
 **lockX: 是否锁定X轴，默认为false;
 **lockY: 是否锁定Y轴，默认为false;
 **downCallBack: 鼠标按下时的回调函数；
 **moveCallBack: 鼠标移动时的回调函数；
 **upCallBack: 鼠标抬起时的回调函数；
*/
function Drag(obj,opt){
	
	this.obj = typeof obj=='string' ? document.getElementById(obj) : obj;	
	this.disX = 0;
	this.disY = 0;
	this.defaults = {	//默认参数
		minL:		  '',
		maxL: 	      '',
		minT:		  '',
		maxT: 		  '',
		lockX: 		  false,
		lockY: 		  false,
		downCallBack: function (){},
		moveCallBack: function (){},
		upCallBack:	  function (){}
	};
	return this.init(opt);
}
Drag.prototype = {
	init: function (opt){
		var _this = this;
		_this.extend(_this.defaults, opt);
		_this.obj.onmousedown = function (ev){
			var ev = ev || window.event;
			_this.fnDown(ev);
			if(typeof _this.defaults.downCallBack == 'function')_this.defaults.downCallBack();
			
			document.onmousemove = function (ev){
				_this.fnMove(ev);
				if(typeof _this.defaults.moveCallBack == 'function')_this.defaults.moveCallBack();				
				return false;
			};
			
			document.onmouseup = function (ev){
				_this.fnUp(ev);
			 	if(typeof _this.defaults.upCallBack == 'function')_this.defaults.upCallBack();
			};
			
			return false;
		};
	},
	fnDown: function (ev){
		var ev = ev || window.event;
		this.disX = ev.clientX - this.obj.offsetLeft;
		this.disY = ev.clientY - this.obj.offsetTop;
	},
	fnMove: function (ev){
		var ev = ev || window.event;
		var l = ev.clientX - this.disX;
		var t = ev.clientY - this.disY;
		
		//如果锁定X或Y就没必要继续了
		if(!this.defaults.lockX){		
			if(typeof this.defaults.minL == 'number'){
				if(l < this.defaults.minL) l = this.defaults.minL;
			}
			if(typeof this.defaults.minT == 'number'){
				if(t < this.defaults.minT) t = this.defaults.minT;
			}	
			this.obj.style.left = l + 'px';					
		}
		if(!this.defaults.lockY){
			if(typeof this.defaults.maxL == 'number'){
			if(l > this.defaults.maxL - this.obj.offsetWidth) l = this.defaults.maxL - this.obj.offsetWidth;
			}
			if(typeof this.defaults.maxT == 'number'){
				if(t > this.defaults.maxT - this.obj.offsetHeight) t = this.defaults.maxT - this.obj.offsetHeight;
			}					
			this.obj.style.top = t + 'px';
		}
	},
	fnUp: function (){
		document.onmousemove = null;
		document.onmouseup = null;
	},
	extend: function (obj, oSrc){	
		for(var attr in oSrc){
			obj[attr] = oSrc[attr];
		}
	}
};
Drag.prototype.constructor = Drag;
/*
	应用：
	new drag(id,{这里写参数})
	new drag(obj,(不写也可以))
*/
