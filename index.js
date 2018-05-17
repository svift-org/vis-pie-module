SVIFT.vis.pie = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  //Initialisation e.g. creat svg object
  module.setup = function () {
  };

  //Data Processing, after module.data is set, module.process() should process the data
  module.process = function () {
  };

  //Update should do the drawing, similar to Bostock's general update pattern
  module.update = function () {
  };

  //After window resize events this is being called, in most cases, this should call the update event after setting width and height
  module.resize = function () {
  };

  module.timeline = {};

  return module;
 });