var Vector = require("./vector").Vector

/**
 * The InteractionBox class represents a box-shaped region completely within
 * the field of view of the Leap Motion controller.
 *
 * <p>The interaction box is an axis-aligned rectangular prism and provides
 * normalized coordinates for hands, fingers, and tools within this box.
 * The InteractionBox class can make it easier to map positions in the
 * Leap Motion coordinate system to 2D or 3D coordinate systems used
 * for application drawing.</p>
 *
 * <p>The InteractionBox region is defined by a center and dimensions along the x, y, and z axes.</p>
 */
var InteractionBox = exports.InteractionBox = function(data) {
    /**
     * Indicates whether this is a valid InteractionBox object.
     *
     * @member valid
     * @type {Boolean}
     * @memberof Leap.InteractionBox.prototype
     */
    this.valid = true;
    /**
     * The center of the InteractionBox in device coordinates (millimeters).
     * <p>This point is equidistant from all sides of the box.</p>
     *
     * @member center
     * @type {Leap.Vector}
     * @memberof Leap.InteractionBox.prototype
     */
    this.center = new Vector(data.center);
    /**
     * The depth of the InteractionBox in millimeters, measured along the z-axis.
     *
     * @member depth
     * @type {Number}
     * @memberof Leap.InteractionBox.prototype
     */
    this.depth = data.depth;
    /**
     * The height of the InteractionBox in millimeters, measured along the y-axis.
     *
     * @member height
     * @type {Number}
     * @memberof Leap.InteractionBox.prototype
     */
    this.height = data.height;
    /**
     * The width of the InteractionBox in millimeters, measured along the x-axis.
     *
     * @member width
     * @type {Number}
     * @memberof Leap.InteractionBox.prototype
     */
    this.width = data.width;
}

/**
 * Converts a position defined by normalized InteractionBox coordinates
 * into device coordinates in millimeters.
 *
 * <p>This function performs the inverse of normalizePoint().</p>
 *
 * @method denormalizePoint
 * @memberof Leap.InteractionBox.prototype
 * @param {Leap.Vector} normalizedPosition The input position in InteractionBox coordinates.
 * @returns {Leap.Vector} The corresponding denormalized position in device coordinates.
 */
InteractionBox.prototype.denormalizePoint = function(normalizedPosition) {
    var vec = new Vector(0,0,0);

    vec.x = ( ( ( normalizedPosition.x + this.center.x ) - 0.5 ) * this.width );
    vec.y = ( ( ( normalizedPosition.y + this.center.y ) - 0.5 ) * this.height );
    vec.z = ( ( ( normalizedPosition.z + this.center.z ) - 0.5 ) * this.depth );

    return vec;
}

/**
 * Normalizes the coordinates of a point using the interaction box.
 *
 * <p>Coordinates from the Leap Motion frame of reference (millimeters) are
 * converted to a range of [0..1] such that the minimum value of the
 * InteractionBox maps to 0 and the maximum value of the InteractionBox maps to 1.</p>
 *
 * @method normalizePoint
 * @memberof Leap.InteractionBox.prototype
 * @param {Leap.Vector} position The input position in device coordinates.
 * @param {Boolean} clamp Whether or not to limit the output value to the range [0,1]
 * when the input position is outside the InteractionBox. Defaults to true.
 * @returns {Leap.Vector} The normalized position.
 */
InteractionBox.prototype.normalizePoint = function(position, clamp) {
    var vec = new Vector(0,0,0);

    vec.x = ( ( position.x - this.center.x ) / this.width ) + 0.5;
    vec.y = ( ( position.y - this.center.y ) / this.height ) + 0.5;
    vec.z = ( ( position.z - this.center.z ) / this.depth ) + 0.5;

    if( clamp )
    {
        vec.x = Math.min( Math.max( vec.x, 0 ), 1 );
        vec.y = Math.min( Math.max( vec.y, 0 ), 1 );
        vec.z = Math.min( Math.max( vec.z, 0 ), 1 );
    }

    return vec;
}

/**
 * Writes a brief, human readable description of the InteractionBox object.
 *
 * @method toString
 * @memberof Leap.InteractionBox.prototype
 * @returns {String} A description of the InteractionBox object as a string.
 */
InteractionBox.prototype.toString = function() {
    return "InteractionBox [ width:" + this.width + " height:" + this.height + " depth:" + this.depth + " ]";
}

/**
 * An invalid InteractionBox object.
 *
 * You can use this InteractionBox instance in comparisons testing
 * whether a given InteractionBox instance is valid or invalid. (You can also use the
 * InteractionBox.valid property.)

 * @static
 * @type {Leap.InteractionBox}
 * @name Invalid
 * @memberof Leap.InteractionBox
 */
InteractionBox.Invalid = { valid: false };
