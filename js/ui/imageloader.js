/**
 * Image loader helper class
 *
 * This class keeps a cache with the used images and it's also able to preload
 * them.
 *
 * @class ImageLoader
 * @module ui
 * @static
 */
var ImageLoader = {};

/**
 * Given a `source` path, returns a `Image` object. The `source` is relative to
 * the path defined by `IMAGE_PATH`.
 *
 * This class keeps a cache with all loaded images. Use this method to load an
 * `Image` whenever possible.
 *
 * Usage:
 *
 *     var image = ImageLoader.image("sprite/fan/fan.jpg");
 *
 * @method image
 * @static
 * @param source {String} Relative path to the image
 * @return {Image} Reference to the loaded image
 */
ImageLoader.image = function (source) {
    if (!this._cache[source])
        ImageLoader.load(source);

    return this._cache[source];
};

/**
 * Preloads the images in `source` and execute a callback when the loading of
 * each of them is complete.
 *
 * The callback sends as argument an object containing the path to the loaded
 * image (`source`), the number of images currently loaded (`loaded`) and the
 * total number of images (`total`).
 *
 * Usage:
 *
 *     var images = [
 *         "sprites/fan/engine/gear_1.jpg",
 *         "sprites/fan/engine/gear_2.jpg",
 *         "sprites/fan/engine/gear_3.jpg",
 *         "sprites/fan/engine/gear_4.jpg",
 *         "sprites/gearcanon/gear/1.jpg",
 *         "sprites/gearcanon/gear/2.jpg",
 *         "sprites/gearcanon/gear/3.jpg",
 *         "sprites/gearcanon/gear/4.jpg",
 *         "sprites/gearcanon/gear/gear.jpg"
 *     ];
 *     ImageLoader.load(images, function(a) {
 *         document.title = Math.round(a.loaded/a.total*100) + "%";
 *         console.log(a.source + " loaded");
 *     });
 * Displays in the title the loading percentage.
 *
 * Or:
 *
 *     var images = {
 *         "sprites/fan/gear_1.jpg": "images/sprites/fan/gear_1.jpg",
 *         "sprites/fan/gear_2.jpg": "images/sprites/fan/gear_2.jpg",
 *         "sprites/gearcanon/1.jpg": "other-images/sprites/gearcanon/1.jpg",
 *         "sprites/gearcanon/2.jpg": "other-images/sprites/gearcanon/1.jpg"
 *     };
 *     ImageLoader.load(images)
 *
 * @method load
 * @static
 * @param source {String|Array|Object} List of paths to the images to load. Pass a
 * string if it's just one image.
 * @param [callback] {Function} Function to be called after each image finishes loading
 */
ImageLoader.load = function (source, callback) {
    if (Object.prototype.toString.call(source) === "[object String]")
        source = [source];

    for (var key in source) {
        if (this._cache[key])
            continue;

        var img = new Image();
        img.onload = this._onload.bind(this, callback, key, false);
        img.onerror = this._onload.bind(this, callback, key, true);
        img.src = source[key];
        this._cache[key] = img;
    }
};

/**
 * Removes the image from the cache
 *
 * @method unload
 * @static
 * @param source {String} The path to the image loaded
 */
ImageLoader.unload = function (source) {
    if (!this._cache[source])
        return;

    delete this._cache[source];
    this._loadCount--;
};

/**
 * Images cache
 *
 * @property _cache
 * @static
 * @type {Object}
 * @private
 */
ImageLoader._cache = {};
ImageLoader._loadCount = 0;

/**
 * @method _onload
 */
ImageLoader._onload = function (onload, source, error) {
    this._loadCount++;

    if (onload)
        onload({source: source, error: error, loaded: this._loadCount, total: Object.keys(this._cache).length});
};
