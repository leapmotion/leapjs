var Vector = require("./vector").Vector;

var Matrix = exports.Matrix = function(data){
	
	if(data instanceof Matrix){
		this.xBasis = new Vector(data.xBasis);
		this.yBasis = new Vector(data.yBasis);
		this.zBasis = new Vector(data.zBasis);
		this.origin = new Vector(data.origin);
	}
	else if(data instanceof Array){
		if(data[0] instanceof Vector && typeof(data[1]) == "number"){
			this.setRotation(data[0],data[1]);
			this.origin = new Vector(data[2]);
		}
		else{
			this.xBasis = new Vector(data[0]);
			this.yBasis = new Vector(data[1]);
			this.zBasis = new Vector(data[2]);
			this.origin = new Vector(data[3]);
		}
	}
	else{
		this.xBasis = new Vector([1,0,0]);
		this.yBasis = new Vector([0,1,0]);
		this.zBasis = new Vector([0,0,1]);
		this.origin = new Vector([0,0,0]);
	}
};

Matrix.prototype = {
	
	setRotation : function(_axis, angle){
		var axis = _axis.normalized();
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		var C = 1-c;
		
		this.xBasis = new Vector([axis.x*axis.x*C + c, axis.x*axis.y*C - axis.z*s, axis.x*axis.z*C + axis.y*s]);
		this.yBasis = new Vector([axis.y*axis.x*C + axis.z*s, axis.y*axis.y*C + c, axis.y*axis.z*C - axis.x*s]);
		this.zBasis = new Vector([axis.z*axis.x*C - axis.y*s, axis.z*axis.y*C + axis.x*s, axis.z*axis.z*C + c]);
	},
	
	transformPoint : function(data){
		return this.origin.plus(this.transformDirection(data));
	},

	transformDirection : function(data){
		var x = this.xBasis.multiply(data.x);
		var y = this.yBasis.multiply(data.y);
		var z = this.zBasis.multiply(data.z);
		return x.plus(y).plus(z);
	},
	
	times : function(other){
		var x = this.transformDirection(other.xBasis);
		var y = this.transformDirection(other.yBasis);
		var z = this.transformDirection(other.zBasis);
		var o = this.transformPoint(other.origin);
		return new Matrix([x,y,z,o]);
	},
	
	rigidInverse : function(){
		var x = new Vector([this.xBasis.x, this.yBasis.x, this.zBasis.x]);
		var y = new Vector([this.xBasis.y, this.yBasis.y, this.zBasis.y]);
		var z = new Vector([this.xBasis.z, this.yBasis.z, this.zBasis.z]);
		var rotInverse = new Matrix([x,y,z]);
		rotInverse.origin = rotInverse.transformDirection(Vector.zero().minus(this.origin));
		return rotInverse;
	},
	
	toArray3x3 : function(output){
		if(output == null) output = [];
		else output.length = 0;
		output[0] = this.xBasis.x;
		output[1] = this.xBasis.y;
		output[2] = this.xBasis.z;
		output[3] = this.yBasis.x;
		output[4] = this.yBasis.y;
		output[5] = this.yBasis.z;
		output[6] = this.zBasis.x;
		output[7] = this.zBasis.y;
		output[8] = this.zBasis.z;
		return output;
	},
	
	toArray4x4 : function(output){
		if(output == null) output = [];
		else output.length = 0;
		output[0] = this.xBasis.x;
		output[1] = this.xBasis.y;
		output[2] = this.xBasis.z;
		output[3] = 0;
		output[4] = this.yBasis.x;
		output[5] = this.yBasis.y;
		output[6] = this.yBasis.z;
		output[7] = 0;
		output[8] = this.zBasis.x;
		output[9] = this.zBasis.y;
		output[10] = this.zBasis.z;
		output[11] = 0;
		output[12] = this.origin.x;
		output[13] = this.origin.y;
		output[14] = this.origin.z;
		output[15] = 1;
		return output;
	},
	
	toString : function(){
		return "{xBasis:"+this.xBasis+",yBasis:"+this.yBasis+
		",zBasis:"+this.zBasis+",origin:"+this.origin+"}";
	},
	
	compare : function(other){
		return this.xBasis.compare(other.xBasis) && 
		this.yBasis.compare(other.yBasis) && 
		this.zBasis.compare(other.zBasis) && 
		this.origin.compare(other.origin);
	}
};

Matrix.identity = function(){ return new Matrix(); };
