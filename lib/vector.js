var _ = require('underscore');

/**
 * Constructs a Vector object.
 *
 * Creates a new Vector from the specified Array or Vector. 
 * The default constructor sets all components to zero.
 *
 * @class Vector
 * @memberof Leap
 * @classdesc
 * The Vector object represents a three-component mathematical vector or point 
 * such as a direction or position in three-dimensional space.
 * 
 * The Leap software employs a right-handed Cartesian coordinate system. 
 * Values given are in units of real-world millimeters. The origin is 
 * centered at the center of the Leap device. The x- and z-axes lie in the 
 * horizontal plane, with the x-axis running parallel to the long edge of 
 * the device. The y-axis is vertical, with positive values increasing upwards 
 * (in contrast to the downward orientation of most computer graphics 
 * coordinate systems). The z-axis has positive values increasing away from the 
 * computer screen.
 */
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
	/**
	 * The horizontal component.
	 * @member x
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	/**
	 * The horizontal component.
	 * @member [0]
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	this.x = this[0];
	/**
	 * The vertical component.
	 * @member y
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	/**
	 * The vertical component.
	 * @member [1]
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	this.y = this[1];
	/**
	 * The depth component.
	 * @member z
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	/**
	 * The depth component.
	 * @member [2]
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	this.z = this[2];
};

var VectorPrototype = {
	/**
	 * The angle between this vector and the specified vector in radians.
	 * 
	 * The angle is measured in the plane formed by the two vectors. 
	 * The angle returned is always the smaller of the two conjugate angles. 
	 * Thus A.angleTo(B) == B.angleTo(A) and is always a positive value less 
	 * than or equal to pi radians (180 degrees).
	 * 
	 * If either vector has zero length, then this function returns zero.
	 * 
	 * ![Vector AngleTo](images/Math_AngleTo.png)
	 * 
	 * @method AngleTo
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Float} The angle between this vector and the specified 
	 * vector in radians. 
	 */
	angleTo : function(other){
		var denom = this.magnitude()*other.magnitude();
		if(denom > 0) return Math.acos(this.dot(other)/denom);
		else return 0;
	},
	
	/**
	 * The cross product of this vector and the specified vector.
	 * 
	 * The cross product is a vector orthogonal to both original vectors. 
	 * It has a magnitude equal to the area of a parallelogram having the 
	 * two vectors as sides. The direction of the returned vector is 
	 * determined by the right-hand rule. Thus A.cross(B) == -B.cross(A).
	 * 
	 * ![Vector Cross](images/Math_Cross.png)
	 * 
	 * @method Cross
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Leap.Vector} The cross product of this vector and the 
	 * specified vector. 
	 */
	cross : function(other){
		var x = this[1]*other[2] - other[1]*this[2];
		var y = this[0]*other[2] - other[0]*this[2];
		var z = this[0]*other[1] - other[0]*this[1];
		return new Vector([x,y,z]);
	},
	
	/**
	 * The distance between the point represented by this Vector object 
	 * and a point represented by the specified Vector object. 
	 * 
	 * @method distanceTo
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Float} The distance from this point to the specified point.
	 */
	distanceTo : function(other){
		return this.minus(other).magnitude();
	},
	
	/**
	 * The dot product of this vector with another vector.
	 * 
	 * The dot product is the magnitude of the projection of this vector onto 
	 * the specified vector.
	 * 
	 * ![Vector Dot](images/Math_Dot.png)
	 * 
	 * @method dot
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Float} The dot product of this vector and the specified vector.
	 */
	dot : function(other){
		return this[0]*other[0] + this[1]*other[1] + this[2]*other[2];
	},
	
	/**
	 * Add vectors component-wise.
	 * 
	 * @method plus
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Leap.Vector}
	 */
	plus : function(other){
		return new Vector([this[0] + other[0],this[1] + other[1],this[2] + other[2]]);
	},
	
	/**
	 * Subtract vectors component-wise.
	 * 
	 * @method minus
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Leap.Vector}
	 */
	minus : function(other){
		return new Vector([this[0] - other[0],this[1] - other[1],this[2] - other[2]]);
	},
	
	/**
	 * Multiply vector by a scalar.
	 * 
	 * @method multiply
	 * @memberof Leap.Vector.prototype
	 * @param {Float} scalar
	 * @returns {Leap.Vector}
	 */
	multiply : function(scalar){
		return new Vector([this[0]*scalar,this[1]*scalar,this[2]*scalar]);
	},
	
	/**
	 * Divide vector by a scalar.
	 * 
	 * @method dividedBy
	 * @memberof Leap.Vector.prototype
	 * @param {Float} scalar
	 * @returns {Leap.Vector}
	 */
	dividedBy : function(scalar){
		return new Vector([this[0]/scalar,this[1]/scalar,this[2]/scalar]);
	},
	
	/**
	 * The magnitude, or length, of this vector.
	 * 
	 * The magnitude is the L2 norm, or Euclidean distance between the 
	 * origin and the point represented by the (x, y, z) components of 
	 * this Vector object.
	 * 
	 * @method magnitude
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The length of this vector.
	 */
	magnitude : function(){
		return Math.sqrt(this.magnitudeSquared());
	},
	
	/**
	 * The square of the magnitude, or length, of this vector.
	 * 
	 * @method magnitudeSquared
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The square of the length of this vector. 
	 */
	magnitudeSquared : function(){
		return Math.pow(this[0],2) + Math.pow(this[1],2) + Math.pow(this[2],2);
	},
	
	/**
	 * A normalized copy of this vector.
	 * 
	 * A normalized vector has the same direction as the original 
	 * vector, but with a length of one.
	 * 
	 * @method normalized
	 * @memberof Leap.Vector.prototype
	 * @returns {Leap.Vector} A Vector object with a length of one, 
	 * pointing in the same direction as this Vector object. 
	 */
	normalized : function(){
		var magnitude = this.magnitude();
		if(magnitude > 0) return this.dividedBy(magnitude);
		else return new Vector();
	},
	
	/**
	 * The pitch angle in radians.
	 * 
	 * Pitch is the angle between the negative z-axis and the projection 
	 * of the vector onto the y-z plane. In other words, pitch represents 
	 * rotation around the x-axis. If the vector points upward, the 
	 * returned angle is between 0 and pi radians (180 degrees); if it 
	 * points downward, the angle is between 0 and -pi radians.
	 * 
	 * ![Vector Pitch](images/Math_Pitch_Angle.png)
	 * 
	 * @method pitch
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The angle of this vector above or below the 
	 * horizon (x-z plane). 
	 */
	pitch : function(){
		return Math.atan2(this[1], -this[2]);
	},
	
	/**
	 * The roll angle in radians.
	 * 
	 * Roll is the angle between the y-axis and the projection of 
	 * the vector onto the x-y plane. In other words, roll represents 
	 * rotation around the z-axis. If the vector points to the left 
	 * of the y-axis, then the returned angle is between 0 and pi 
	 * radians (180 degrees); if it points to the right, the angle is 
	 * between 0 and -pi radians.
	 * 
	 * ![Vector Roll](images/Math_Roll_Angle.png)
	 * 
	 * Use this function to get roll angle of the plane to which this 
	 * vector is a normal. For example, if this vector represents the 
	 * normal to the palm, then this function returns the tilt or roll 
	 * of the palm plane compared to the horizontal (x-z) plane.
	 * 
	 * @method roll
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The angle of this vector above or below the 
	 * horizon (x-z plane). 
	 */
	roll : function(){
		return Math.atan2(this[0], -this[1]);
	},
	
	/**
	 * The yaw angle in radians. 
	 * 
	 * Yaw is the angle between the negative z-axis and the projection 
	 * of the vector onto the x-z plane. In other words, yaw represents 
	 * rotation around the y-axis. If the vector points to the right 
	 * of the negative z-axis, then the returned angle is between 0 and 
	 * pi radians (180 degrees); if it points to the left, the angle 
	 * is between 0 and -pi radians.
	 * 
	 * ![Vector Roll](images/Math_Yaw_Angle.png)
	 * 
	 * @method yaw
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The angle of this vector to the right or left 
	 * of the negative z-axis. 
	 */
	yaw : function(){
		return Math.atan2(this[0], -this[2]);
	},
	
	/**
	 * Returns the vector as a float array.
	 * 
	 * @method toArray
	 * @memberof Leap.Vector.prototype
	 * @returns {Float[]}
	 */
	toArray : function(){
		return [this[0], this[1], this[2]];
	},
	
	/**
	 * Returns a string containing this vector in a human readable 
	 * format: (x, y, z). 
	 * 
	 * @method toString
	 * @memberof Leap.Vector.prototype
	 * @returns {String}
	 */
	toString : function(){
		return "{x:"+this[0]+",y:"+this[1]+",z:"+this[2]+"}";
	},
	
	toSource : function(){ this.toString(); },
	
	/**
	 * Compare Vector equality component-wise.
	 * 
	 * @method compare
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Boolean}
	 */
	compare : function(other){
		return this[0]==other[0] && this[1]==other[1] && this[2]==other[2];
	},
	
	/**
	 * Returns true if all of the vector's components are finite.
	 *
	 * If any component is NaN or infinite, then this returns false.
	 * 
	 * @method isValid
	 * @memberof Leap.Vector.prototype
	 * @returns {Boolean}
	 */
	isValid : function(){
		return (this[0] != NaN && this[0] > -Infinity && this[0] < Infinity) &&
				 (this[1] != NaN && this[1] > -Infinity && this[1] < Infinity) &&
			   (this[2] != NaN && this[2] > -Infinity && this[2] < Infinity);
	}
};

Vector.prototype = new Array;
_.extend(Vector.prototype, VectorPrototype);

/**
 * The unit vector pointing backward along the positive z-axis: (0, 0, 1)
 *
 * @static
 * @type {Leap.Vector}
 * @name backward
 * @memberof Leap.Vector
 */
Vector.backward = function(){ return new Vector([0,0,1]); };
/**
 * The unit vector pointing down along the negative y-axis: (0, -1, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name down
 * @memberof Leap.Vector
 */
Vector.down = function(){ return new Vector([0,-1,0]); };
/**
 * The unit vector pointing forward along the negative z-axis: (0, 0, -1) 
 *
 * @static
 * @type {Leap.Vector}
 * @name forward
 * @memberof Leap.Vector
 */
Vector.forward = function(){ return new Vector([0,0,-1]); };
/**
 * The unit vector pointing left along the negative x-axis: (-1, 0, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name left
 * @memberof Leap.Vector
 */
Vector.left = function(){ return new Vector([-1,0,0]); };
/**
 * The unit vector pointing right along the positive x-axis: (1, 0, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name right
 * @memberof Leap.Vector
 */
Vector.right = function(){ return new Vector([1,0,0]); };
/**
 * The unit vector pointing up along the positive y-axis: (0, 1, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name up
 * @memberof Leap.Vector
 */
Vector.up = function(){ return new Vector([0,1,0]); };
/**
 * The x-axis unit vector: (1, 0, 0)
 *
 * @static
 * @type {Leap.Vector}
 * @name xAxis
 * @memberof Leap.Vector
 */
Vector.xAxis = function(){ return new Vector([1,0,0]); };
/**
 * The y-axis unit vector: (0, 1, 0)
 *
 * @static
 * @type {Leap.Vector}
 * @name yAxis
 * @memberof Leap.Vector
 */
Vector.yAxis = function(){ return new Vector([0,1,0]); };
/**
 * The z-axis unit vector: (0, 0, 1)
 *
 * @static
 * @type {Leap.Vector}
 * @name zAxis
 * @memberof Leap.Vector
 */
Vector.zAxis = function(){ return new Vector([0,0,1]); };
/**
 * The zero vector: (0, 0, 0)
 *
 * @static
 * @type {Leap.Vector}
 * @name zero
 * @memberof Leap.Vector
 */
Vector.zero = function(){ return new Vector([0,0,0]); };
