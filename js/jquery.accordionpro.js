/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {


  /**
   * Class for managing events.
   * Can be extended to provide event functionality in other classes.
   *
   * @class EventEmitter Manages event registering and emitting.
   */
  function EventEmitter() {}

  // Shortcuts to improve speed and size
  var proto = EventEmitter.prototype;
  var exports = this;
  var originalGlobalValue = exports.EventEmitter;

  /**
   * Finds the index of the listener for the event in it's storage array.
   *
   * @param {Function[]} listeners Array of listeners to search through.
   * @param {Function} listener Method to look for.
   * @return {Number} Index of the specified listener, -1 if not found
   * @api private
   */
  function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Alias a method while keeping the context correct, to allow for overwriting of target method.
   *
   * @param {String} name The name of the target method.
   * @return {Function} The aliased method
   * @api private
   */
  function alias(name) {
    return function aliasClosure() {
      return this[name].apply(this, arguments);
    };
  }

  /**
   * Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
   * Each property in the object response is an array of listener functions.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Function[]|Object} All listener functions for the event.
   */
  proto.getListeners = function getListeners(evt) {
    var events = this._getEvents();
    var response;
    var key;

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (typeof evt === 'object') {
      response = {};
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          response[key] = events[key];
        }
      }
    }
    else {
      response = events[evt] || (events[evt] = []);
    }

    return response;
  };

  /**
   * Takes a list of listener objects and flattens it into a list of listener functions.
   *
   * @param {Object[]} listeners Raw listener objects.
   * @return {Function[]} Just the listener functions.
   */
  proto.flattenListeners = function flattenListeners(listeners) {
    var flatListeners = [];
    var i;

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  };

  /**
   * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Object} All listener functions for an event in an object.
   */
  proto.getListenersAsObject = function getListenersAsObject(evt) {
    var listeners = this.getListeners(evt);
    var response;

    if (listeners instanceof Array) {
      response = {};
      response[evt] = listeners;
    }

    return response || listeners;
  };

  /**
   * Adds a listener function to the specified event.
   * The listener will not be added if it is a duplicate.
   * If the listener returns true then it will be removed after it is called.
   * If you pass a regular expression as the event name then the listener will be added to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addListener = function addListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var listenerIsWrapped = typeof listener === 'object';
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
        listeners[key].push(listenerIsWrapped ? listener : {
          listener: listener,
          once: false
        });
      }
    }

    return this;
  };

  /**
   * Alias of addListener
   */
  proto.on = alias('addListener');

  /**
   * Semi-alias of addListener. It will add a listener that will be
   * automatically removed after it's first execution.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addOnceListener = function addOnceListener(evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: true
    });
  };

  /**
   * Alias of addOnceListener.
   */
  proto.once = alias('addOnceListener');

  /**
   * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
   * You need to tell it what event names should be matched by a regex.
   *
   * @param {String} evt Name of the event to create.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.defineEvent = function defineEvent(evt) {
    this.getListeners(evt);
    return this;
  };

  /**
   * Uses defineEvent to define multiple events.
   *
   * @param {String[]} evts An array of event names to define.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.defineEvents = function defineEvents(evts) {
    for (var i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }
    return this;
  };

  /**
   * Removes a listener function from the specified event.
   * When passed a regular expression as the event name, it will remove the listener from all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to remove the listener from.
   * @param {Function} listener Method to remove from the event.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeListener = function removeListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var index;
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        index = indexOfListener(listeners[key], listener);

        if (index !== -1) {
          listeners[key].splice(index, 1);
        }
      }
    }

    return this;
  };

  /**
   * Alias of removeListener
   */
  proto.off = alias('removeListener');

  /**
   * Adds listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
   * You can also pass it a regular expression to add the array of listeners to all events that match it.
   * Yeah, this function does quite a bit. That's probably a bad thing.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addListeners = function addListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(false, evt, listeners);
  };

  /**
   * Removes listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be removed.
   * You can also pass it a regular expression to remove the listeners from all events that match it.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to remove.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeListeners = function removeListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(true, evt, listeners);
  };

  /**
   * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
   * The first argument will determine if the listeners are removed (true) or added (false).
   * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be added/removed.
   * You can also pass it a regular expression to manipulate the listeners of all events that match it.
   *
   * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
    var i;
    var value;
    var single = remove ? this.removeListener : this.addListener;
    var multiple = remove ? this.removeListeners : this.addListeners;

    // If evt is an object then pass each of it's properties to this method
    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      for (i in evt) {
        if (evt.hasOwnProperty(i) && (value = evt[i])) {
          // Pass the single listener straight through to the singular method
          if (typeof value === 'function') {
            single.call(this, i, value);
          }
          else {
            // Otherwise pass back to the multiple function
            multiple.call(this, i, value);
          }
        }
      }
    }
    else {
      // So evt must be a string
      // And listeners must be an array of listeners
      // Loop over it and pass each one to the multiple method
      i = listeners.length;
      while (i--) {
        single.call(this, evt, listeners[i]);
      }
    }

    return this;
  };

  /**
   * Removes all listeners from a specified event.
   * If you do not specify an event then all listeners will be removed.
   * That means every event will be emptied.
   * You can also pass a regex to remove all events that match it.
   *
   * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeEvent = function removeEvent(evt) {
    var type = typeof evt;
    var events = this._getEvents();
    var key;

    // Remove different things depending on the state of evt
    if (type === 'string') {
      // Remove all listeners for the specified event
      delete events[evt];
    }
    else if (type === 'object') {
      // Remove all events matching the regex.
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          delete events[key];
        }
      }
    }
    else {
      // Remove all listeners in all events
      delete this._events;
    }

    return this;
  };

  /**
   * Alias of removeEvent.
   *
   * Added to mirror the node API.
   */
  proto.removeAllListeners = alias('removeEvent');

  /**
   * Emits an event of your choice.
   * When emitted, every listener attached to that event will be executed.
   * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
   * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
   * So they will not arrive within the array on the other side, they will be separate.
   * You can also pass a regular expression to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {Array} [args] Optional array of arguments to be passed to each listener.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.emitEvent = function emitEvent(evt, args) {
    var listeners = this.getListenersAsObject(evt);
    var listener;
    var i;
    var key;
    var response;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        i = listeners[key].length;

        while (i--) {
          // If the listener returns true then it shall be removed from the event
          // The function is executed either with a basic call or an apply if there is an args array
          listener = listeners[key][i];

          if (listener.once === true) {
            this.removeListener(evt, listener.listener);
          }

          response = listener.listener.apply(this, args || []);

          if (response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener);
          }
        }
      }
    }

    return this;
  };

  /**
   * Alias of emitEvent
   */
  proto.trigger = alias('emitEvent');

  /**
   * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
   * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {...*} Optional additional arguments to be passed to each listener.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.emit = function emit(evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args);
  };

  /**
   * Sets the current value to check against when executing listeners. If a
   * listeners return value matches the one set here then it will be removed
   * after execution. This value defaults to true.
   *
   * @param {*} value The new value to check for when executing listeners.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.setOnceReturnValue = function setOnceReturnValue(value) {
    this._onceReturnValue = value;
    return this;
  };

  /**
   * Fetches the current value to check against when executing listeners. If
   * the listeners return value matches this one then it should be removed
   * automatically. It will return true by default.
   *
   * @return {*|Boolean} The current value to check for or the default, true.
   * @api private
   */
  proto._getOnceReturnValue = function _getOnceReturnValue() {
    if (this.hasOwnProperty('_onceReturnValue')) {
      return this._onceReturnValue;
    }
    else {
      return true;
    }
  };

  /**
   * Fetches the events object and creates one if required.
   *
   * @return {Object} The events storage object.
   * @api private
   */
  proto._getEvents = function _getEvents() {
    return this._events || (this._events = {});
  };

  /**
   * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
   *
   * @return {Function} Non conflicting EventEmitter class.
   */
  EventEmitter.noConflict = function noConflict() {
    exports.EventEmitter = originalGlobalValue;
    return EventEmitter;
  };

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
    define('eventEmitter/EventEmitter',[],function () {
      return EventEmitter;
    });
  }
  else if (typeof module === 'object' && module.exports){
    module.exports = EventEmitter;
  }
  else {
    this.EventEmitter = EventEmitter;
  }
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) {
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});

/*!
 * Test for CSS3 Transitions
 * http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
 */

function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }

    return false;
}

function getPrefixed(prop){
    var i, s = document.createElement('p').style, v = ['ms','O','Moz','Webkit'];
    if( s[prop] == '' ) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for( i = v.length; i--; )
        if( s[v[i] + prop] == '' )
            return (v[i] + prop);
}

/*!
 * jQuery Animate -> CSS3 Transitions
 * http://addyosmani.com/blog/css3transitions-jquery/
 */

;(function($) {
  $.fn.extend({
    defaultAnimate: $.fn.animate,
    animate: function(props, speed, easing, callback) {
      var options = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: callback || !callback && easing || jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: callback && easing || easing && !jQuery.isFunction(easing) && easing
          };

      return $(this).each(function() {
        var $this = $(this), easing, prefix;

          // check if transitions supported; only animate parent accordion element or slide list items
          if (supportsTransitions() && ($this.hasClass('accordionPro') || $this.hasClass('slide'))) {

            // set default css easing function
            easing = options.easing || 'ease-in-out';

            // get prefix
            prefix = (getPrefixed('transition').replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-'));

            // animate with css transitions
            $this.css(prefix, 'all ' + speed / 1000 + 's ' + easing).css(props);

            // callback
            setTimeout(function() {
              $this.css(prefix);
              if ($.isFunction(options.complete)) {
                options.complete();
              }
            }, speed);
          }
          else {
            // set default jQuery easing function
            options.easing = 'swing';

            // animate with jQuery
            $this.defaultAnimate(props, options);
          }
      })
    }
  });
})(jQuery);

/*!
 * Plugin Name:    Accordion Pro JS - a responsive accordion plugin for jQuery
 * Plugin URI:     http://stitchui.com/accordion-pro-js/
 * Version:        2.0.0
 * Author:         Nicola Hibbert
 * Author URI:     http://stitchui.com
 *
 * Copyright:      (c) 2011-2015 Stitch UI
 */
;(function($) {

  function AccordionPro(elem, options) {

    /**
     * Merge defaults with options in new settings object
     */

    var settings = $.extend(true, {}, this.defaults, options);


    /**
     * "Globals"
     */

    var $window = $(window),
        parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : settings.tab.size },
        panels = tabs.next(),
        border = 0,
        offset = 0,
        padding = 0,
        tabBorder = 0,
        horizontal = settings.orientation === 'horizontal' ? 1 : 0,
        easing = 'ease-in-out',
        fitToContent = !horizontal && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent'),
        touch = !!('ontouchstart' in window);


    /**
     * SETUP PLUGIN
     */

    var setup = {

      /**
       * Backwards compatibility
       */

      backwardsCompatibility: function() {

        // theme
        if (settings.theme === 'dark') {
          settings.theme = 'bordered';
          settings.colour = {
            scheme : 'charcoal',
            style : 'gradient'
          };
        }

        if (settings.theme === 'light') {
          settings.theme = 'bordered';
          settings.colour = {
            scheme : 'white',
            style : 'gradient'
          };
        }

      },


      /**
       * Set plugin classes
       */

      setPluginClasses : function() {
        var classNames = 'accordionPro ';

        // set orientation classname
        classNames += horizontal ? 'horizontal ' : 'vertical ';

        // theme
        classNames += settings.theme + ' ';

        // there is no stitch gradient, only stitch flat
        if (settings.theme === 'stitch') settings.colour.style = 'flat';

        // colour scheme and style
        classNames += settings.colour.scheme ? ('scheme-' + settings.colour.scheme + ' ' + 'style-' + settings.colour.style + ' ') : '';

        // rounded
        classNames += settings.rounded ? 'rounded ' : '';

        // rtl
        classNames += settings.rtl ? 'rtl ' : '';

        // start closed
        classNames += settings.startClosed ? 'closed ' : '';

        // fitToContent
        classNames += (!horizontal && fitToContent) ? 'fitToContent ' : '';

        // scrollable
        classNames += settings.panel.scrollable ? 'scrollable ' : '';

        // scale images
        classNames += settings.panel.scaleImages ? 'scaleImages ' : '';

        // set classnames
        elem.addClass(classNames);
      },


      /**
       * Add slide number and data to each slide
       */

      setSlideClasses : function() {
        slides.each(function(index) {
          $(this)
            .addClass('slide slide-' + (index + 1))
            .attr('data-slide-name', elem[0].id + '-slide-' + (index + 1));
        });
      },


      /**
       * Add classes to tabs for styling
       */

      setTabClasses : function() {
        var classNames = '';

        // tab icon
        if (settings.tab.icon !== 'none') {
          classNames += settings.tab.icon;
        }

        // alternate text orientation
        if (settings.tab.textOrientation !== 'normal') {
          classNames += ' alt-text-orientation';
        }

        // set classnames
        tabs.addClass(classNames);
      },


      /**
       * Set plugin width and height
       */

      setPluginDimensions : function() {
        elem
          .outerWidth(horizontal ? settings.horizontalWidth : settings.verticalWidth)
          .outerHeight(horizontal ? settings.horizontalHeight : settings.verticalHeight);
      },


      /**
       * Calculate border, padding, etc
       */

      calcBoxDimensions : function() {
        var firstPanel = slides.eq(0).children('div');

        // cache parent height and width values
        parent.w = elem.width();
        parent.h = elem.height();

        // calculate slide border
        border = elem.outerHeight() - elem.height();

        // calculate slide offset (once only)
        offset =
          parseInt(firstPanel.css('marginLeft'), 10) ||
          parseInt(firstPanel.css('marginRight'), 10) ||
          parseInt(firstPanel.css('marginBottom'), 10) || 0;

        // calculate padding
        if (horizontal) {
          padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10);
        } else {
          padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10);
        }

        // calculate tab border (a lot more work than it should be because FF gets it wrong)
        tabBorder = Math.ceil(+(tabs.eq(0).css('borderLeftWidth')).slice(0, -2)) * 2;
      },


      /**
       * Calculate slide widths, heights, positions
       */

      calcSlideDimensions : function(index, panelH, selected) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = slide.w + tab.h;
          calc.height = '100%';
          calc.position = { left : index * tab.h, top : 0 };

          if (settings.rtl) {
            calc.position = { right : index * tab.h, top : 0 };
          }

          // compensate for selected slide (position)
          if (selected && index > slides.index(selected)) {
            calc.position[settings.rtl ? 'right' : 'left'] += slide.w;
          }
        } else {
          // variable height or flexible (fitToContent) height
          if (fitToContent) {
            calc.height = transparent ? panelH : panelH + tab.h; // variable height
          } else {
            calc.height = slide.h + tab.h; // fixed height
          }

          // width and default position
          calc.width = '100%';
          calc.position = { top : index * tab.h, left : 0 };

          // compensate for selected slide (position)
          if (selected && index > slides.index(selected)) {
            if (fitToContent) {
              calc.position.top += selected.height() - tab.h;
            } else {
              calc.position.top += slide.h;
            }
          }
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },


      /**
       * Set individual slide widths, heights, positions
       */

      setSlideDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },


      /**
       * Set all slide widths, heights, positions
       */

      setSlidesDimensions : function() {
        var _this = this, selected;

        // cache slide length
        slide.l = slides.length;

        // calculate global slide dimensions
        if (horizontal) {
          slide.w = parent.w - slide.l * tab.h;
          slide.h = parent.h;
        } else {
          slide.w = tabs.eq(0).width(); // px value
          slide.h = parent.h - slide.l * tab.h;
        }

        // set selected slide class if startClosed option is not enabled
        if (!settings.startClosed) {
          selected = slides.eq(settings.tab.selected - 1).addClass('selected');
        }

        // set dimensions of each slide
        slides.each(function(index) {
          var $this = $(this),
              panelH = $this.children('div').height(),
              calc = _this.calcSlideDimensions(index, panelH, selected);

          _this.setSlideDimensions.call($this, calc);
        });
      },


      /**
       * Set individual tab widths, heights, positions
       */

      setTabDimensions : function() {
        this
          .width(tab.w)
          .height(tab.h - (tabBorder ? (tabBorder + padding) : 0))
          .css({
            'font-size' : settings.tab.fontSize + 'px',
            'line-height' : (tab.h - (tabBorder ? (tabBorder + padding) : padding)) + 'px',
            'font-family' : settings.tab.font
          });

        // fixes for stitch
        if (settings.theme === 'stitch') {
          this.width(this.width() - tabBorder)
        }
      },


      /**
       * Set all tab widths, heights, positions
       */

      setTabsDimensions : function() {
        var _this = this,
            $first = tabs.first(),
            sheet = document.styleSheets[0];

        // calculate global tab dimensions
        tab.w = horizontal ? slide.h : elem.width();

        // set dimensions of each tab
        tabs.each(function(index) {
          _this.setTabDimensions.call($(this));
        });

        // adjust line-height on :after
        if (padding && sheet && sheet.insertRule) {
          sheet.insertRule('.accordionPro .slide > :first-child:after { left: ' + padding + 'px; height: ' + (tab.h - (tabBorder ? (tabBorder + padding) : padding)) + 'px }', sheet.cssRules.length);
        }
      },


      /**
       * Calculate panel widths, heights, positions
       */

      calcPanelDimensions : function(index, panelH) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = transparent ? slide.w + tab.h : slide.w - offset - padding;
          calc.height = slide.h;
          calc.position = { left : (transparent ? 0 : tab.h), top : 0 };

          if (settings.rtl) {
            calc.position = { right : (transparent ? 0 - offset : tab.h - offset), top : 0 };
          }
        } else {
          if (fitToContent) {
            calc.height = 'auto'; // panelH?
          } else {
            calc.height = transparent ? (slide.h + tab.h) : slide.h - offset - padding;
          }

          // panel positions
          calc.width = '100%';
          calc.position = { top : (transparent ? 0 : tab.h), left : 0 };
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },


      /**
       * Set individual panel widths, heights, positions
       */

      setPanelDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },


      /**
       * Set all panel widths, heights, positions
       */

      setPanelsDimensions : function() {
        var _this = this;

        panels.each(function(index) {
          var calc = _this.calcPanelDimensions(index);
          _this.setPanelDimensions.call($(this), calc);
        });
      },


      /**
       * Set custom tab images
       */

      setCustomTabImages : function() {
        var imgs = [],
            sheet = document.styleSheets[0];

        if (settings.tab.icon !== 'custom') return;
        if (!settings.tab.customIcons.length) return;

        // short ref to image array
        imgs = settings.tab.customIcons;

        // create styles for icons
        tabs.each(function(index) {
          if (sheet && sheet.insertRule) {
            sheet.insertRule('.accordionPro .slide-' + (index + 1) + ' > :first-child:after { background-image: url(' + imgs[index % imgs.length] + ') }', sheet.cssRules.length);
          }
        });
      },


      /**
       * Set custom tab colours
       */

      setCustomTabColours : function() {
        var colours = [],
            sheet = document.styleSheets[0];

        if (!settings.tab.customColours.length) return;

        // short ref to colours array
        colours = settings.tab.customColours;

        // create styles for custom colours (so no need to remove style attr on destroy())
        tabs.each(function(index) {
          if (sheet && sheet.insertRule) {
            sheet.insertRule('.accordionPro .slide-' + (index + 1) + ' > :first-child { background: ' + colours[index] + ' !important }', sheet.cssRules.length);
            sheet.insertRule('.accordionPro.stitch .slide-' + (index + 1) + ' > :first-child { background-image: url("data:image/png;base64,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") !important }', sheet.cssRules.length);
            sheet.insertRule('.accordionPro .slide-' + (index + 1) + '.selected > :first-child:before { background-color: ' + colours[index] + ' !important }', sheet.cssRules.length);
          }
        });
      },


      /**
       * Set plugin width and height when closed on init
       */

      setClosedPluginDimensions : function() {
        if (!settings.startClosed) return;

        if (horizontal) {
          elem.css('width', (slide.l * tab.h) + border - padding);
        } else {
          elem.css('height', slide.l * tab.h + border);
        }
      },


      /**
       * Show plugin
       */

      setPluginVisible : function() {
        elem.css('visibility', 'visible');
      },


      /**
       * Additional fixes for Internet Explo(d|r)er
       */

      internetExploder : function() {
        var ua = navigator.userAgent,
            index = ua.indexOf('MSIE');

        // not ie
        if (index < 0) return;

        // ie
        if (index !== -1) {
          ua = ua.slice(index + 5, index + 7);
          ua = +ua;

          // ie 9+ doesn't need additional styles...
          if (ua >= 9) return;

          // ... but ie 8 does :(
          if (ua === 8) {

          }

          // ie 7 and below
          if (ua <= 7) {
            methods.destroy();
            throw new Error('This plugin supports IE8+ only.');
          }

          // add ie classes for css fallbacks
          elem.addClass('ie ie' + ua);
        }
      },


      /**
       * Init plugin setup
       */

      init : function() {
        var _this = this;

        // set plugin dimensions, plugin and slide classes
        this.backwardsCompatibility();
        this.setPluginDimensions();
        this.setPluginClasses();
        this.setSlideClasses();
        this.setTabClasses();
        this.setCustomTabImages();
        this.setCustomTabColours();

        // !!! FOR TESTING
          _this.calcBoxDimensions();
          _this.setSlidesDimensions();
          _this.setTabsDimensions();
          _this.setPanelsDimensions();

          _this.setClosedPluginDimensions();
          _this.setPluginVisible();
          // _this.internetExploder();


        // check images are loaded before setting up slide positions
        imagesLoaded(elem, function() {

        });
      }
    };


    /**
     * BIND EVENTS
     */

    var events = {

      /**
       * Bind click and touchstart
       */

      click : function() { // +touchstart
        if (settings.activateOn === 'click') {
          // trigger animation cycle
          tabs.on('click.accordionPro touchstart.accordionPro', core.trigger);

          if (settings.startClosed) {
            tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Bind mouseover
       */

      mouseover : function() {
        if (settings.activateOn === 'mouseover') {
          // trigger animation cycle
          tabs.on('click.accordionPro touchstart.accordionPro mouseover.accordionPro', core.trigger);

          // fire start closed event once
          if (settings.startClosed) {
            tabs.on('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Pause on hover
       */

      hover : function() {
        if (settings.pauseOnHover && settings.autoPlay) {
          elem
            .on('mouseover.accordionPro', function() {
              if (!elem.hasClass('closed')) {
                core.timer && methods.stop();
              }
            })
            .on('mouseout.accordionPro', function() {
              if (!elem.hasClass('closed')) {
                !core.timer && methods.play(core.currentSlide);
              }
            });
        }
      },


      /**
       * Bind swipe for touch enabled devices
       */

      swipe : function() {
        var startPos = {
              x : 0,
              y : 0
            };

        /**
         * Helper -> get position of client touch
         */

        function getTouchPos(e, maxTouches) {
          var x, y;

          if (touch && e.touches) {
            if (e.touches.length > maxTouches) return;
            x = e[maxTouches ? 'touches' : 'changedTouches'][0].clientX;
            y = e[maxTouches ? 'touches' : 'changedTouches'][0].clientY;
          } else {
            x = e.clientX;
            y = e.clientY;
          }

          return { x : x, y : y };
        }


        /**
         * Trigger swipe on touch enabled devices
         */

        if (touch) {
          // unbind existing events
          tabs.off('.accordionPro');

          // bind swipe events
          slides.on({
            touchstart : function(e) {
              startPos = getTouchPos(e.originalEvent, 1);
            },

            touchend : function(e) {
              var endPos = getTouchPos(e.originalEvent, 0);

              // calculate swipe direction
              var dx = endPos.x - startPos.x,
                  absDx = Math.abs(dx),
                  dy = endPos.y - startPos.y,
                  absDy = Math.abs(dy);

              // trigger slide
              core.triggerDirection(absDx > absDy ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
            }
          })
        }
      },


      /**
       * Bind hashchange
       */

      hashchange : function() {
        if (settings.linkable) {
          $window.on('load.accordionPro hashchange.accordionPro', core.triggerLink);
        }
      },


      /**
       * Bind resize and orientationchange
       */

      resize : function() { // +orientationchange
        var timer = 0;

        if (horizontal && settings.responsive) {
          $window.on('load.accordionPro resize.accordionPro orientationchange.accordionPro', function() {
            // approximates onresizeend
            clearTimeout(timer);

            // trigger scaling
            timer = setTimeout(function() {
              core.scalePlugin();
            }, 200);
          });
        }
      },


      /**
       * Init event binds
       */

      init : function() {
        for (var i in this) {
          if (this.hasOwnProperty(i)) {
            if (i !== 'init') this[i]();
          }
        }
      }
    };


    /**
     * PLUGIN CORE
     */

    var core = {
      // interval counter
      timer : 0,

      // animation flag
      isPlaying : false,

      // counter for autoPlay
      currentSlide : settings.tab.selected - 1,

      // previous slide
      previousSlide : null,

      // next slide index
      nextSlide : function() {
        core.currentSlide++;
        return core.currentSlide % slide.l;
      },


      /**
       *
       */

      fitToContent : function() {

      },


      /**
       * Animate single slide
       */

      // !!! need to pass fitToContent height in
      animateSlide : function(props) {
        // don't animate first slide
        if (typeof props.index === 'number' && !props.index) return;

        // set animate position for single selected slide
        if (props.selected) {
          props[props.position] = (props.index * tab.h) + (props.side ? 0 : slide[horizontal ? 'w' : 'h']);
        }

        // animate slide
        this
          .stop(true)
          .animate(
            props,
            settings.slideSpeed,
            function() {
              // set selected slide if single
              if (props.selected) {
                core.setSelectedSlide.call(slides.eq(props.index - 1 ));
              }
            }
          )
      },


      /**
       * Animate group of slides
       */

      animateSlides : function(props) {
        var index = props.index,
            position = props.position,
            side = props.side,
            expr = '';

        // build expression
        expr += side ? ':lt(' : ':gt(';
        expr += side ? index + 1 : index;
        expr += ')';

        // animate slides
        slides
          .filter(expr)
          .each(function() {
            var $this = $(this),
                index = slides.index($this),
                props = {};

            // side 0 = left/top, side 1 = bottom/right
            props[position] = (index * tab.h) + (side ? 0 : slide[horizontal ? 'w' : 'h']);

            // animate single slide
            core.animateSlide.call($this, props);
          });

        // set selected slide
        core.setSelectedSlide.call(this);
      },


      /**
       * Trigger slide animation
       */

      trigger : function(e) {
        var $slide = $(this).parent(),
            props = {
              index : slides.index($slide),
              position : horizontal ? (settings.rtl ? 'right' : 'left') : 'top',
              selected : $slide.hasClass('selected')
            };

        // side 0 = left/top, side 1 = bottom/right (flipped for rtl)
        props.side = parseInt($slide.css(props.position), 10) > props.index * tab.h;

        // animate single (currently selected) slide, or animate a group of slides
        core['animateSlide' + (props.selected ? '' : 's')].call($slide, props);
      },


      /**
       * Set currently selected slide class, update core.currentSlide
       */

      setSelectedSlide : function() {
        // remove selected class
        slides.removeClass('selected');

        // add selected class to selected slide
        this.addClass('selected');

        // update currentSlide ref
        core.currentSlide = slides.index(this);
      },


      /**
       * Should this be here? Not setup + event?
       */

      triggerFromClosed : function() {
        // start closed
      },


      /**
       * Trigger slide animation from a link
       */

      triggerLink : function(e) {
        var slide = slides.filter(function() {
          return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
        });

        // if slide name exists, trigger slide
        if (slide) methods.trigger(slides.index(slide));
      },

      triggerDirection : function(dir) {
        console.log(dir);

/*

        slides.swipe({
          left : function() {
            if (orientation) {
              if (settings.rtl) {
                // don't select previous slide if current slide is index zero
                if (core.currentSlide) methods.prev();
              } else {
                methods.next();
              }
            }
          },
          right : function() {
            if (orientation) {
              if (settings.rtl) {
                methods.next();
              } else {
                if (core.currentSlide) methods.prev();
              }
            }
          },
          up : function() {
            if (!orientation) methods.next();
          },
          down : function() {
            if (!orientation && core.currentSlide) methods.prev();
          },
          threshold: { x: 80, y: 80 }
        });
 */

      },

      scalePlugin : function() {
        // var scale = Math.min(elem.parent().outerWidth(true) / settings.horizontalWidth); // linear scale
        // var ieOl;

        // // limit max scale to 1
        // // scale = ().toFixed(2);
        // scale = Math.min(scale, 1);

        // // css3 scaling not supported in ie8
        // if (!elem.hasClass('ie8')) {
        //   elem.css(Modernizr.prefixed('transform'), 'scale(' + scale + ')');

        //   if (orientation) { // horizontal?
        //     elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)).toFixed(2));
        //   }
        // } else {
        //   elem.css('zoom', scale);
        // }
      },

      init : function() {
        // init autoplay
        // if (!settings.startClosed && settings.autoPlay) methods.play();
        if (settings.autoPlay) methods.play();
      }
    };


    /**
     * PUBLIC METHODS
     */

    var methods = {
      trigger : function(index) {
        tabs.eq(index).trigger('click.accordionPro');
      },

      play : function(index) {
        var next;
        if (core.timer) return;

        // start autoplay
        core.timer = setInterval(function() {
          methods.trigger(core.nextSlide());
        }, settings.cycleSpeed);
      },

      stop : function() {
        clearInterval(core.timer);
        core.timer = 0;
      },

      next : function() {
        methods.trigger(core.nextSlide());
      },

      prev : function() {
        methods.trigger(core.currentSlide - 1);
      },

      destroy : function() {
        // stop autoplay
        methods.stop();

        // remove hashchange and resize events bound to window
        $(window).off('.accordionPro');

        // remove generated styles, classes, data, events
        this
          .off('.accordionPro')
          .removeData('accordionPro')
          .removeAttr('style')
          .removeClass();

        slides
          .removeClass()
          .removeAttr('style')
          .removeAttr('data-slide-name')
          .children()
          .removeAttr('style');

        tabs
          .off('.accordionPro')
          .removeClass();
      }
    };


    /**
     * Init plugin
     */

    setup.init();
    events.init();
    core.init();


    /**
     * Return methods
     */

    methods._settings = settings;
    return methods;
  }


 /**
   * PLUGIN DEFAULTS
   */

  AccordionPro.prototype.defaults = {
    /* layout */
    orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
    startClosed : false,                    // start in a closed position

    /* aesthetics */
    theme : 'basic',                        // basic, bordered, stitch or transparent
    colour : {
      scheme : null,                        // colour scheme, none set by default
      style : 'flat'                        // choose from 'flat' or 'gradient'
    },
    rounded : false,                        // square or rounded corners
    rtl : false,                            // right to left layout

    /* horizontal accordion options */
    responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
    horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
    horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value

    /* vertical accordion options */
    verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
    verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
    verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

    /* tabs */
    tab : {
      size : 48,                            // set tab size
      fontSize : 16,                        // set tab font size
      font : 'Arial',                       // set tab font family
      icon : 'none',                        // set tab icon -> none, number, chevron, disc, square, custom
      customIcons : [],                     // set a custom image for each icon
      customColours : [],                   // set a custom colour for each tab
      textOrientation : 'normal',           // set text orientation -> normal, vertical
      selected : 1                          // displays slide (n) on page load
    },

    /* panels */
    panel : {
      scrollable : false,                   // trigger scrollbar on vertical overflow
      scaleImages : false                   // scales images to fit slide width and height
    },

    /* events */
    activateOn : 'click',                   // click or mouseover
    onSlideOpen : function() {},            // callback on slide open
    onSlideClose : function() {},           // callback on slide animation complete

    /* animations */
    autoPlay : false,                       // automatically cycle through slides
    cycleSpeed : 6000,                      // time between slide cycles
    slideSpeed : 800,                       // slide animation speed

    /* miscellaneous */
    pauseOnHover : true,                    // pause on hover
    linkable : false                        // link slides via hash
  };


  /**
   * ADD PLUGIN TO $.fn
   */

  $.fn.accordionPro = function(method, param) {
    var elem = this,
        instance = elem.data('accordionPro');

    // if creating a new instance
    if (typeof method === 'object' || !method) {
      return elem.each(function() {
        // if plugin already instantiated, return
        if (instance) return;

        // otherwise create a new instance
        elem.data('accordionPro', new AccordionPro(elem, method));
      });

    // otherwise, call method on current instance
    } else if (typeof method === 'string' && instance[method]) {
      // zero-based index for trigger method
      if (method === 'trigger' && typeof param === 'number') param -= 1;

      // chainable methods
      instance[method].call(elem, param);
      return elem;
    }
  };

})(jQuery);