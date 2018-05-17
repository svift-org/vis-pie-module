SVIFT.vis.pie = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);

  module.d3config = {
    ease:d3.easeCubicInOut, //https://github.com/d3/d3-ease
    easeExp:d3.easeExpIn,
    textInterpol: d3.interpolate(0,1)
    // interpolate: d3.interpolate(0,1)
  };

  //Initialisation e.g. creat svg object
  module.setup = function () {

    module.d3config.pieContainer = module.vizContainer.append("g");

    module.d3config.pie  = d3.pie()
      .value(function(d) {return d.data[0]; })
      .sort(null)
      .padAngle(.1);

    module.d3config.pieContainer.datum(data.data.data).selectAll("path")
        .data(module.d3config.pie)
      .enter().append("g").classed("arcContainer",true).append("path")
        .attr("fill",function(d,i){return data.style.color.dataColors[i]})
        // .attr("stroke", "red")
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
    module.d3config.maxSize = Math.min(width,height);

    module.d3config.pieContainer
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //move circle to the middle

  };


  module.animatePie = function(t){

    var visPadding = 15;

    var innerRadiusFixed = module.d3config.maxSize/4;
    // var innerRadiusInt = d3.interpolate(0,(module.d3config.maxSize/5));
    var outerRadiusInt = d3.interpolate(innerRadiusFixed,((module.d3config.maxSize/2)-visPadding));

    var innerRadius = innerRadiusFixed;
    var outerRadius = outerRadiusInt(module.d3config.ease(t));
    // module.d3config.count
    //   .text(interpolation)
    //   .attr("opacity",1)


    module.d3config.arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .cornerRadius(5);

    d3.selectAll(".arc")
        .attr("d", module.d3config.arc)


    d3.selectAll(".arc")
        .attr("d", module.d3config.arc)
        .each(function(d) {this._current = d;})

  };

  module.animatetext = function(t){

    module.d3config.pieText
          .attr("transform", function(d) {return "translate(" + module.d3config.arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) {return d.data.label[0] + ": " + d.data.data[0] })
          .style("text-anchor","middle")
          .style("fill","white")
          // .style("text-shadow","-1px -1px 1px #ffffff, -1px 0px 1px #ffffff, -1px 1px 1px #ffffff, 0px -1px 1px #ffffff, 0px 1px 1px #ffffff, 1px -1px 1px #ffffff, 1px 0px 1px #ffffff, 1px 1px 1px #ffffff")
          .attr('class', 'labelText')
          .attr('opacity',module.d3config.textInterpol(module.d3config.ease(t)))

  };



  module.timeline['pie'] = {start:0, end:2000, func:module.animatePie};
  module.timeline['text'] = {start:2000, end:3000, func:module.animatetext};


  return module;
 });


