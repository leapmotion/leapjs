var Vector = require("./vector").Vector,
    _ = require('underscore');

/**
 * Constructs a Matrix object.
 *
 * Creates a new Matrix from the specified Array of Vectors or Matrix. 
 * The default constructor creates an identity matrix.
 *
 * @class Matrix
 * @memberof Leap
 * @classdesc
 * The Matrix object represents a transformation matrix. 
 * 
 * To use this object to transform a Vector, construct a matrix 
 * containing the desired transformation and then use the 
 * [Matrix.transformPoint]{@link Leap.Matrix#transformPoint}() or 
 * [Matrix.transformDirection]{@link Leap.Matrix#transformDirection}() functions 
 * to apply the transform.
 * 
 * Transforms can be combined by multiplying two or more transform 
 * matrices using the times function. 
 */
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

	/**
	 * The rotation and scale factors for the x-axis.
	 * @member xBasis
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The rotation and scale factors for the x-axis.
	 * @member [0]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.xBasis = this[0];

	/**
	 * The rotation and scale factors for the y-axis.
	 * @member yBasis
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The rotation and scale factors for the y-axis.
	 * @member [1]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.yBasis = this[1];

	/**
	 * The rotation and scale factors for the z-axis.
	 * @member zBasis
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The rotation and scale factors for the z-axis.
	 * @member [2]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.zBasis = this[2];

	/**
	 * The translation factors for all three axes. 
	 * @member origin
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The translation factors for all three axes. 
	 * @member [3]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.origin = this[3];
};

var MatrixPrototype = {
	
	/**
	 * Sets this transformation matrix to represent a rotation around 
	 * the specified vector.
	 * 
	 * This function erases any previous rotation and scale transforms 
	 * applied to this matrix, but does not affect translation.
	 * 
	 * @method setRotation
	 * @memberof Leap.Matrix.prototype
	 * @param {Leap.Vector} _axis A Vector specifying the axis of rotation.
	 * @param {float} angleRadians The amount of rotation in radians. 
	 */
	setRotation : function(_axis, angle){
		var axis = _axis.normalized();
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		var C = 1-c;
		
		this[0] = new Vector([axis[0]*axis[0]*C + c, axis[0]*axis[1]*C - axis[2]*s, axis[0]*axis[2]*C + axis[1]*s]);
		this[1] = new Vector([axis[1]*axis[0]*C + axis[2]*s, axis[1]*axis[1]*C + c, axis[1]*axis[2]*C - axis[0]*s]);
		this[2] = new Vector([axis[2]*axis[0]*C - axis[1]*s, axis[2]*axis[1]*C + axis[0]*s, axis[2]*axis[2]*C + c]);
	},
	
	/**
	 * Transforms a vector with this matrix by transforming its 
	 * rotation, scale, and translation. 
	 * 
	 * Translation is applied after rotation and scale.
	 * 
	 * @method transformPoint
	 * @memberof Leap.Matrix.prototype
	 * @param {Leap.Vector} in The Vector to transform.  
	 * @returns {Leap.Vector} A new Vector representing the transformed original.
	 */
	transformPoint : function(data){
		return this[3].plus(this.transformDirection(data));
	},

	/**
	 * Transforms a vector with this matrix by transforming its 
	 * rotation and scale only.
	 * 
	 * @method transformDirection
	 * @memberof Leap.Matrix.prototype
	 * @param {Leap.Vector} in The Vector to transform.  
	 * @returns {Leap.Vector} A new Vector representing the transformed original.
	 */
	transformDirection : function(data){
		var x = this[0].multiply(data[0]);
		var y = this[1].multiply(data[1]);
		var z = this[2].multiply(data[2]);
		return x.plus(y).plus(z);
	},
	
	/**
	 * Multiply transform matrices.
	 * 
	 * Combines two transformations into a single equivalent transformation.
	 * 
	 * @method times
	 * @memberof Leap.Matrix.prototype
	 * @param {Matrix} other A Matrix to multiply on the right hand side. 
	 * @returns {Leap.Matrix} A new Matrix representing the transformation 
	 * equivalent to applying the other transformation followed by this transformation.
	 */
	times : function(other){
		var x = this.transformDirection(other[0]);
		var y = this.transformDirection(other[1]);
		var z = this.transformDirection(other[2]);
		var o = this.transformPoint(other[3]);
		return new Matrix([x,y,z,o]);
	},
	
	/**
	 * Performs a matrix inverse if the matrix consists entirely of 
	 * rigid transformations (translations and rotations). 
	 * 
	 * If the matrix is not rigid, this operation will not represent an inverse.
	 * 
	 * Note that all matricies that are directly returned by the API are rigid.
	 * 
	 * @method rigidInverse
	 * @memberof Leap.Matrix.prototype
	 * @returns {Leap.Matrix} The rigid inverse of the matrix.
	 */
	rigidInverse : function(){
		var x = new Vector([this[0][0], this[1][0], this[2][0]]);
		var y = new Vector([this[0][1], this[1][1], this[2][1]]);
		var z = new Vector([this[0][2], this[1][2], this[2][2]]);
		var rotInverse = new Matrix([x,y,z]);
		rotInverse[3] = rotInverse.transformDirection(Vector.zero().minus(this[3]));
		return rotInverse;
	},
	
	/**
	 * Writes the 3x3 Matrix object to a 9 element row-major float array. 
	 * 
	 * Translation factors are discarded.
	 * 
	 * @method toArray3x3
	 * @memberof Leap.Matrix.prototype
	 * @returns {Array} The rotation Matrix as a flattened array.
	 */
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
	
	/**
	 * Convert a 4x4 Matrix object to a 16 element row-major float array. 
	 * 
	 * Translation factors are discarded.
	 * 
	 * @method toArray4x4
	 * @memberof Leap.Matrix.prototype
	 * @returns {Array} The entire Matrix as a flattened array.
	 */
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
	
	/**
	 * Write the matrix to a string in a human readable format. 
	 * 
	 * @method toString
	 * @memberof Leap.Matrix.prototype
	 * @returns {String}
	 */
	toString : function(){
		return "{xBasis:"+this[0]+",yBasis:"+this[1]+
		",zBasis:"+this[2]+",origin:"+this[3]+"}";
	},
	
	toSource : function(){ this.toString(); },
	
	/**
	 * Compare Matrix equality component-wise. 
	 * 
	 * @method compare
	 * @memberof Leap.Matrix.prototype
	 * @returns {Boolean}
	 */
	compare : function(other){
		return this[0].compare(other[0]) && 
		this[1].compare(other[1]) && 
		this[2].compare(other[2]) && 
		this[3].compare(other[3]);
	}
};

Matrix.prototype = new Array;
_.extend(Matrix.prototype, MatrixPrototype);

/**
 * Returns the identity matrix specifying no translation, rotation, and scale.
 *
 * @static
 * @type {Leap.Matrix}
 * @name identity
 * @memberof Leap.Matrix
 */
Matrix.identity = function(){ return new Matrix(); };
