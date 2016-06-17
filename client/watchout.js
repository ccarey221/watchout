// start slingin' some d3 here.
var updateScore = function(start) {
  var score = start;
  setInterval(function() {
    d3.select('body').select('.current').text('Current score: ' + score);
    score++;
  }, 100);
  console.log(d3.select('body').select('.current'));
};

var asteroids = function() {
  var xPos = Math.random();
  console.log(d3.select('body'));
  d3.selectAll("asteroid")
    .data(data)
  .enter().append("asteroid")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 2.5);
}


updateScore(0);
asteroids();
