var _ = require('underscore');

var Vector = exports.Vector = function(data){
	
	if(data == null){
		this[0] = 0;
		this[1] = 0;
		this[2] = 0;
	}
	else if("x" in data){
		this[0] = data[0];
		this[1] = data[1];
		this[2] = data[2];
	}
	else if("0" in data){
		this[0] = (typeof(data[0]) == "number")?data[0]:0;
		this[1] = (typeof(data[1]) == "number")?data[1]:0;
		this[2] = (typeof(data[2]) == "number")?data[2]:0;
	}
	
	this.length = 3;
	this.x = this[0];
	this.y = this[1];
	this.z = this[2];
};

var VectorPrototype = {
	
	angleTo : function(other){
		var denom = this.magnitude()*other.magnitude();
		if(denom > 0) return Math.acos(this.dot(other)/denom);
		else return 0;
	},
	
	cross : function(other){
		var x = this[1]*other[2] - other[1]*this[2];
		var y = this[0]*other[2] - other[0]*this[2];
		var z = this[0]*other[1] - other[0]*this[1];
		return new Vector([x,y,z]);
	},
	
	distanceTo : function(other){
		return this.minus(other).magnitude();
	},
	
	dot : function(other){
		return this[0]*other[0] + this[1]*other[1] + this[2]*other[2];
	},
	
	plus : function(other){
		return new Vector([this[0] + other[0],this[1] + other[1],this[2] + other[2]]);
	},
	
	minus : function(other){
		return new Vector([this[0] - other[0],this[1] - other[1],this[2] - other[2]]);
	},
	
	multiply : function(scalar){
		return new Vector([this[0]*scalar,this[1]*scalar,this[2]*scalar]);
	},
	
	dividedBy : function(scalar){
		return new Vector([this[0]/scalar,this[1]/scalar,this[2]/scalar]);
	},
	
	magnitude : function(){
		return Math.sqrt(this.magnitudeSquared());
	},
	
	magnitudeSquared : function(){
		return Math.pow(this[0],2) + Math.pow(this[1],2) + Math.pow(this[2],2);
	},
	
	normalized : function(){
		var magnitude = this.magnitude();
		if(magnitude > 0) return this.dividedBy(magnitude);
		else return new Vector();
	},
	
	pitch : function(){
		return Math.atan2(this[1], -this[2]);
	},
	
	roll : function(){
		return Math.atan2(this[0], -this[1]);
	},
	
	yaw : function(){
		return Math.atan2(this[0], -this[2]);
	},
	
	toArray : function(){
		return [this[0], this[1], this[2]];
	},
	
	toString : function(){
		return "{x:"+this[0]+",y:"+this[1]+",z:"+this[2]+"}";
	},
	
	toSource : function(){ this.toString(); },
	
	compare : function(other){
		return this[0]==other[0] && this[1]==other[1] && this[2]==other[2];
	},
	
	isValid : function(){
		return (this[0] != NaN && this[0] > -Infinity && this[0] < Infinity) &&
			   (this[1] != NaN && this[1] > -Infinity && this[1] < Infinity) &&
			   (this[2] != NaN && this[2] > -Infinity && this[2] < Infinity);
	}
};

Vector.prototype = new Array;
_.extend(Vector.prototype, VectorPrototype);

Vector.backward = function(){ return new Vector([0,0,1]); };
Vector.down = function(){ return new Vector([0,-1,0]); };
Vector.forward = function(){ return new Vector([0,0,-1]); };
Vector.left = function(){ return new Vector([-1,0,0]); };
Vector.right = function(){ return new Vector([1,0,0]); };
Vector.up = function(){ return new Vector([0,1,0]); };
Vector.xAxis = function(){ return new Vector([1,0,0]); };
Vector.yAxis = function(){ return new Vector([0,1,0]); };
Vector.zAxis = function(){ return new Vector([0,0,1]); };
Vector.zero = function(){ return new Vector([0,0,0]); };
