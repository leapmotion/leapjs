var Vector = exports.Vector = function(data){
	
	if(data == null){
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
	else if("x" in data){
		this.x = data.x;
		this.y = data.y;
		this.z = data.z;
	}
	else if("0" in data){
		this.x = (typeof(data[0]) == "number")?data[0]:0;
		this.y = (typeof(data[1]) == "number")?data[1]:0;
		this.z = (typeof(data[2]) == "number")?data[2]:0;
	}
};

Vector.prototype = {
	
	angleTo : function(other){
		var denom = this.magnitude()*other.magnitude();
		if(denom > 0) return Math.acos(this.dot(other)/denom);
		else return 0;
	},
	
	cross : function(other){
		var x = this.y*other.z - other.y*this.z;
		var y = this.x*other.z - other.x*this.z;
		var z = this.x*other.y - other.x*this.y;
		return new Vector([x,y,z]);
	},
	
	distanceTo : function(other){
		return this.minus(other).magnitude();
	},
	
	dot : function(other){
		return this.x*other.x + this.y*other.y + this.z*other.z;
	},
	
	plus : function(other){
		return new Vector([this.x + other.x,this.y + other.y,this.z + other.z]);
	},
	
	minus : function(other){
		return new Vector([this.x - other.x,this.y - other.y,this.z - other.z]);
	},
	
	multiply : function(scalar){
		return new Vector([this.x*scalar,this.y*scalar,this.z*scalar]);
	},
	
	dividedBy : function(scalar){
		return new Vector([this.x/scalar,this.y/scalar,this.z/scalar]);
	},
	
	magnitude : function(){
		return Math.sqrt(this.magnitudeSquared());
	},
	
	magnitudeSquared : function(){
		return Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2);
	},
	
	normalized : function(){
		var magnitude = this.magnitude();
		if(magnitude > 0) return this.dividedBy(magnitude);
		else return new Vector();
	},
	
	pitch : function(){
		return Math.atan2(this.y, -this.z);
	},
	
	roll : function(){
		return Math.atan2(this.x, -this.y);
	},
	
	yaw : function(){
		return Math.atan2(this.x, -this.z);
	},
	
	toArray : function(){
		return [this.x, this.y, this.z];
	},
	
	toString : function(){
		return "{x:"+this.x+",y:"+this.y+",z:"+this.z+"}";
	},
	
	compare : function(other){
		return this.x==other.x && this.y==other.y && this.z==other.z;
	},
	
	isValid : function(){
		return (this.x != NaN && this.x > -Infinity && this.x < Infinity) &&
			   (this.y != NaN && this.y > -Infinity && this.y < Infinity) &&
			   (this.z != NaN && this.z > -Infinity && this.z < Infinity);
	}
};

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
