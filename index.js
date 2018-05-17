SVIFT.vis.pie = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);

  module.d3config = {
    // ease:d3.easeQuadOut, 
    // yInterpolate:[], 
    // hInterpolate:[],
    // oInterpolate:[],
    // steps:data.data.data.length,
    // animation:{
    //   duration: 3000,
    //   barPartPercent: .8
    // }
  };

  //Initialisation e.g. creat svg object
  module.setup = function () {

    module.d3config.pieContainer = module.vizContainer.append("g");

    module.d3config.pie  = d3.pie()
      .value(function(d) {console.log(d.data[0]);return d.data[0]; })
      .sort(null)
      .padAngle(.1);

    module.d3config.pieContainer.datum(data.data.data).selectAll("path")
        .data(module.d3config.pie)
      .enter().append("g").classed("arcContainer",true).append("path")
        .attr("fill","red")
        .attr("stroke", "red")
        .attr("opacity",1)
        .classed("arc",true);

    module.d3config.pieText = d3.selectAll(".arcContainer").append("text");

  };

  //Data Processing, after module.data is set, module.process() should process the data
  module.process = function () {
  };

  //Update should do the drawing, similar to Bostock's general update pattern
  module.update = function () {
  };

  //After window resize events this is being called, in most cases, this should call the update event after setting width and height
  module.resize = function () {

    var width = module.vizSize.width;
    var height = module.vizSize.height;
    var maxSize = Math.min(width,height);

    var arc = d3.arc()
        .innerRadius(maxSize / 5)
        .outerRadius(maxSize / 2)
        .cornerRadius(15);

    module.d3config.pieContainer
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //move circle to the middle

    d3.selectAll(".arc")
        .attr("d", arc)
        // .each(function(d) {this._current = d;})

    module.d3config.pieText
          .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) {return d.data.label[0] + ": " + d.data.data[0] })
          .style("text-anchor","middle")
          .style("fill","white")
          // .style("text-shadow","-1px -1px 1px #ffffff, -1px 0px 1px #ffffff, -1px 1px 1px #ffffff, 0px -1px 1px #ffffff, 0px 1px 1px #ffffff, 1px -1px 1px #ffffff, 1px 0px 1px #ffffff, 1px 1px 1px #ffffff")
          .attr('class', 'labelText') 


  };

  module.timeline = {};

  return module;
 });