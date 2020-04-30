    const d3 = require("d3");

    const durr = 600;
    var nodes = [];
    var nodesTmp = [];
    var edges = [];
    var edgesTmp = [];
    var reverse = [];
    var targetId;
    var timeoutId;

    //initalizing the loader with text svg
    var svgText = undefined;
    //initalizing the loader with animation svg
    var svg = undefined;

    //target id is expected to be loader or mini-loader
    function hideLoading() {

      window.clearTimeout(timeoutId);
      document.getElementById("nav").classList.remove("no-display");
      document.getElementById("main-content").classList.remove("no-display");
      document.getElementById(targetId).classList.add("no-display");
      svg.selectAll("*").remove();
      svgText.selectAll("*").remove();
    }

    function showLoading(Id) {
      targetId = Id;
      document.getElementById("nav").classList.add("no-display");
      document.getElementById("main-content").classList.add("no-display");
      document.getElementById(targetId).classList.remove('no-display');

      startLoader();
    }

    //starts the loader
    function startLoader() {
      nodes.length = 0;
      nodesTmp.length = 0;
      edges.length = 0;
      edgesTmp.length = 0;
      reverse.length = 0;

      d3.select("#" + targetId).selectAll("*").remove();

      //initalizing the loader with text svg
      svgText = d3.select("#" + targetId)
        .append("svg")
        .attr("viewBox", "0 0 900 150")
        .attr("width", 900)
        .attr("height", 150);

      //initalizing the loader with animation svg
      svg = d3.select("#" + targetId)
        .append("svg")
        .attr("viewBox", "0 0 150 150")
        .attr("width", 150)
        .attr("height", 150);

      //append text
      svgText.append("text")
        .attr("font-size", "8em")
        .attr("x", 0)
        .attr("y", 120)
        .text("Network Learning");


      //initializing edges
      for (var i = 0; i < 4; i++) {
        var line = svg.append("line")
          .attr("fill", "black")
          .attr("stroke", "black")
          .attr("stroke-width", "5")
          .attr("x1", 70)
          .attr("y1", 30)
          .attr("x2", 70)
          .attr("y2", 30);
        edges.push(line);
        edgesTmp.push(line);
      }

      //initializing the circles to load
      for (var i = 0; i < 5; i++) {
        var circle = svg.append("circle")
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", "5")
          .attr("cx", 70)
          .attr("cy", 30)
          .attr("r", 15);
        nodes.push(circle);
        nodesTmp.push(circle);
      }
      //start stage 1 of amimation
      stage1();
    }

    //first set of branching
    function stage1() {
      //this is the static node. The Root node
      var staticNode = nodesTmp.pop();
      reverse.push({
        type: "s",
        el: staticNode,
        origX: 70,
        origY: 70
      });

      //this is the side transition node
      var sideNode = nodesTmp.pop();
      sideNode.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("cx", 120)
        .attr("cy", 60);
      reverse.push({
        type: "n",
        el: sideNode,
        origX: 70,
        origY: 30
      });

      //edge to go off to the side
      var sideEdge = edgesTmp.pop();
      sideEdge.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("x2", 120)
        .attr("y2", 60);
      reverse.push({
        type: "e",
        el: sideEdge,
        origX: 70,
        origY: 30
      });

      timeoutId = window.setTimeout(stage2, durr);
    }

    //transition node down  
    function stage2() {
      //transition node down  
      downNode = nodesTmp.pop();
      downNode.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("cy", 100);

      reverse.push({
        type: "n",
        el: downNode,
        origX: 70,
        origY: 30
      });


      //edge which faces down
      var downEdge = edgesTmp.pop();
      downEdge.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("x2", 70)
        .attr("y2", 100);

      reverse.push({
        type: "e",
        el: downEdge,
        origX: 70,
        origY: 30
      });


      timeoutId = window.setTimeout(stage3, durr);
    }

    //this is the transition right stage for last 2 nodes
    function stage3() {
      //move rest of the edges down  
      for (var i = 0; i < edgesTmp.length; i++) {
        edgesTmp[i]
          .attr("x1", 70)
          .attr("y1", 100)
          .attr("x2", 70)
          .attr("y2", 100);
      }

      //move rest of the nodes down  
      for (var i = 0; i < nodesTmp.length; i++) {
        nodesTmp[i]
          .attr("cx", 70)
          .attr("cy", 100);
      }

      //this side transitions right
      var side1 = nodesTmp.pop();
      side1.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("cx", 120)
        .attr("cy", 130);
      reverse.push({
        type: "n",
        el: side1,
        origX: 70,
        origY: 100
      });


      //edge for right node
      var edge1 = edgesTmp.pop();
      edge1.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("x2", 120)
        .attr("y2", 130);
      reverse.push({
        type: "e",
        el: edge1,
        origX: 70,
        origY: 100
      });

      timeoutId = window.setTimeout(stage4, durr);

    }

    //this side transitions left
    function stage4() {

      var side2 = nodesTmp.pop();
      side2.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("cx", 20)
        .attr("cy", 130);

      reverse.push({
        type: "n",
        el: side2,
        origX: 70,
        origY: 100
      });

      //edge for left node
      var edge2 = edgesTmp.pop();
      edge2.transition()
        .ease(d3.easePolyInOut)
        .duration(durr)
        .attr("x2", 20)
        .attr("y2", 130);

      reverse.push({
        type: "e",
        el: edge2,
        origX: 70,
        origY: 100
      });

      //reversal stage
      timeoutId = window.setTimeout(stage5, durr);
    }

    //Transitioning things back in place
    function stage5() {
      for (var i = 0; i < 2; i++) {
        obj = reverse.pop();
        if (obj == undefined)
          break;
        if (obj.type == "s") {
          continue;
        } else if (obj.type == "n") {
          obj.el.transition()
            .ease(d3.easePolyInOut)
            .duration(durr)
            .attr("cx", obj.origX)
            .attr("cy", obj.origY);
        } else {
          obj.el.transition()
            .ease(d3.easePolyInOut)
            .duration(durr)
            .attr("x2", obj.origX)
            .attr("y2", obj.origY)
        }

        timeoutId = window.setTimeout(() => obj.el.remove(), durr)
      }

      if (reverse.length != 0)
        timeoutId = window.setTimeout(stage5, durr);
      else
        timeoutId = window.setTimeout(startLoader, durr);

    }