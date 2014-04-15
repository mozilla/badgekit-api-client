exports.initModel = initModel;
exports.getContext = getContext;
exports.getAllOfModelType = getAllOfModelType;
exports.getInstanceOfModelType = getInstanceOfModelType;
exports.addInstanceOfModelType = addInstanceOfModelType;
exports.deleteInstanceOfModelType = deleteInstanceOfModelType;
exports.Generator = Generator;

/**
 *
 */
function initModel (constructor, pathPart, prototype, inherits) {
  if (typeof pathPart !== 'string') {
    inherits = prototype;
    prototype = pathPart;
    pathPart = null;
  }

  if (inherits) {
    constructor.prototype = Object.create(inherits.prototype);
    constructor.prototype.constructor = constructor;
  }

  Object.keys(prototype).forEach(function (method) {
    constructor.prototype[method] = prototype[method];
  });

  if (pathPart) {
    pathPart = '/' + (''+pathPart).replace(/^\/+|\/+$/g, '');

    Object.defineProperty(constructor, 'pathPart', {
      value: pathPart
    });

    if (!constructor.pathIdentifier) {
      Object.defineProperty(constructor, 'pathIdentifier', {
        value: 'slug'
      });
    }

    constructor.prototype._getPathPart = function getPathPart () {
      return pathPart + '/' + this[constructor.pathIdentifier];
    }
  }

  return constructor;
}

var models;

function loadModels () {
  if (models)
    return;

  models = {
    BaseModel: require('../models/_base'),
    System: require('../models/system'),
    Issuer: require('../models/issuer'),
    Program: require('../models/program'),
    Badge: require('../models/badge'),
    ClaimCode: require('../models/claimCode'),
    Application: require('../models/application'),
    Review: require('../models/review'),
    Instance: require('../models/instance'),
  };
}

/**
 *
 */
function getContext (context, client, requiredContextType, callback) {
  loadModels();

  function doError(err) {
    var err = new Error(err);
    Object.defineProperty(err, 'name', {value: 'ContextError'});
    throw err;
  }

  if (typeof requiredContextType === 'function') {
    callback = requiredContextType;
    requiredContextType = null;
  }

  var currentContext;

  try {
    if (context instanceof models.BaseModel) {
      currentContext = context;
    } else {
      if (!context.system)
        doError('Missing system');

      var currentContext = new models.System(context.system, client);

      if (context.issuer)
        currentContext = new models.Issuer(context.issuer, currentContext);

      if (context.program) {
        if (!(currentContext instanceof models.Issuer))
          doError('Missing issuer')

        currentContext = new models.Program(context.program, currentContext);
      }

      if (context.badge)
        currentContext = new models.Badge(context.badge, currentContext);

      if (context.claimCode) {
        if (!(currentContext instanceof models.Badge))
          doError('Claim Code requires Badge parent context');

        currentContext = new models.ClaimCode(context.claimCode, currentContext);
      }
      else if (context.email) {
        if (!(currentContext instanceof models.Badge))
          doError('Missing badge');

        currentContext = new models.Instance(context.email, currentContext);
      }

      if (context.application) {
        if (!(currentContext instanceof models.Badge))
          doError('Application requires Badge parent context');

        currentContext = new models.Application(context.application, currentContext);
      }

      if (context.review) {
        if (!(currentContext instanceof models.Application))
          doError('Review requires Application parent context');

        currentContext = new models.Review(context.review, currentContext);
      }
    }


    if (requiredContextType && currentContext.constructor.name.toLowerCase() !== requiredContextType.toLowerCase())
      doError('Context not of required type: ' + requiredContextType);

    callback(null, currentContext);
  } catch (err) {
    callback(err, null);
  }
}

/**
 *
 */
function getAllOfModelType (Model) {
  return function modelTypeLoader (callback) {
    const options = {
      path: this._path + Model.pathPart,
      filter: Model.name.toLowerCase() + 's',
      generator: new Generator(Model, this),
      default: []
    }

    this._remote.get(options, callback);
  }
}

/**
 *
 */
function getInstanceOfModelType (Model) {
  return function modelInstanceLoader (instance, callback) {
    instance = new Model(instance, this);
    instance.load(callback);
  }
}

/**
 *
 */
function addInstanceOfModelType (Model) {
  return function modelInstanceAdder (instance, callback) {
    instance = new Model(instance, this);
    instance.create(callback);
  }
}

/**
 *
 */
function deleteInstanceOfModelType (Model) {
  return function modelInstanceDeleter (instance, callback) {
    instance = new Model(instance, this);
    instance.delete(callback);
  }
}

/**
 *
 */
function Generator (constructor, parent, preformat) {
  if (typeof preformat !== 'function')
    preformat = constructor.parseResponse;

  if (typeof preformat !== 'function')
    preformat = function (data) { return data; };

  function generate (data) {
    if (!data)
      return null;

    if (data instanceof Array)
      return data.map(generate);

    return new constructor(data, parent);
  }

  generate.preformat = preformat;

  return generate;
}
