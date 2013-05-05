var Vector = require("./vector").Vector,
    _ = require('underscore');

var Matrix = exports.Matrix = function(data){
	
	if(data instanceof Matrix){
		this[0] = new Vector(data.xBasis);
		this[1] = new Vector(data.yBasis);
		this[2] = new Vector(data.zBasis);
		this[3] = new Vector(data.origin);
	}
	else if(data instanceof Array){
		if(data[0] instanceof Vector && typeof(data[1]) == "number"){
			this.setRotation(data[0],data[1]);
			this[3] = new Vector(data[2]);
		}
		else{
			this[0] = new Vector(data[0]);
			this[1] = new Vector(data[1]);
			this[2] = new Vector(data[2]);
			this[3] = new Vector(data[3]);
		}
	}
	else{
		this[0] = new Vector([1,0,0]);
		this[1] = new Vector([0,1,0]);
		this[2] = new Vector([0,0,1]);
		this[3] = new Vector([0,0,0]);
	}
	
	this.length = 4;
	this.xBasis = this[0];
	this.yBasis = this[1];
	this.zBasis = this[2];
	this.origin = this[3];
};

var MatrixPrototype = {
	
	setRotation : function(_axis, angle){
		var axis = _axis.normalized();
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		var C = 1-c;
		
		this[0] = new Vector([axis[0]*axis[0]*C + c, axis[0]*axis[1]*C - axis[2]*s, axis[0]*axis[2]*C + axis[1]*s]);
		this[1] = new Vector([axis[1]*axis[0]*C + axis[2]*s, axis[1]*axis[1]*C + c, axis[1]*axis[2]*C - axis[0]*s]);
		this[2] = new Vector([axis[2]*axis[0]*C - axis[1]*s, axis[2]*axis[1]*C + axis[0]*s, axis[2]*axis[2]*C + c]);
	},
	
	transformPoint : function(data){
		return this[3].plus(this.transformDirection(data));
	},

	transformDirection : function(data){
		var x = this[0].multiply(data[0]);
		var y = this[1].multiply(data[1]);
		var z = this[2].multiply(data[2]);
		return x.plus(y).plus(z);
	},
	
	times : function(other){
		var x = this.transformDirection(other[0]);
		var y = this.transformDirection(other[1]);
		var z = this.transformDirection(other[2]);
		var o = this.transformPoint(other[3]);
		return new Matrix([x,y,z,o]);
	},
	
	rigidInverse : function(){
		var x = new Vector([this[0][0], this[1][0], this[2][0]]);
		var y = new Vector([this[0][1], this[1][1], this[2][1]]);
		var z = new Vector([this[0][2], this[1][2], this[2][2]]);
		var rotInverse = new Matrix([x,y,z]);
		rotInverse[3] = rotInverse.transformDirection(Vector.zero().minus(this[3]));
		return rotInverse;
	},
	
	toArray3x3 : function(output){
		if(output == null) output = [];
		else output.length = 0;
		output[0] = this[0][0];
		output[1] = this[0][1];
		output[2] = this[0][2];
		output[3] = this[1][0];
		output[4] = this[1][1];
		output[5] = this[1][2];
		output[6] = this[2][0];
		output[7] = this[2][1];
		output[8] = this[2][2];
		return output;
	},
	
	toArray4x4 : function(output){
		if(output == null) output = [];
		else output.length = 0;
		output[0] = this[0][0];
		output[1] = this[0][1];
		output[2] = this[0][2];
		output[3] = 0;
		output[4] = this[1][0];
		output[5] = this[1][1];
		output[6] = this[1][2];
		output[7] = 0;
		output[8] = this[2][0];
		output[9] = this[2][1];
		output[10] = this[2][2];
		output[11] = 0;
		output[12] = this[3][0];
		output[13] = this[3][1];
		output[14] = this[3][2];
		output[15] = 1;
		return output;
	},
	
	toString : function(){
		return "{xBasis:"+this[0]+",yBasis:"+this[1]+
		",zBasis:"+this[2]+",origin:"+this[3]+"}";
	},
	
	toSource : function(){ this.toString(); },
	
	compare : function(other){
		return this[0].compare(other[0]) && 
		this[1].compare(other[1]) && 
		this[2].compare(other[2]) && 
		this[3].compare(other[3]);
	}
};

Matrix.prototype = new Array;
_.extend(Matrix.prototype, MatrixPrototype);

Matrix.identity = function(){ return new Matrix(); };
