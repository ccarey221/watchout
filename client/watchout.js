// start slingin' some d3 here.
var enemies = [];
var collisions = 0;
var highScore = 0;
var score = 0;

var updateScore = function(start) {
  score = start;
  var counterInterval = setInterval(function() {
    d3.select('body').select('.current').text('Current score: ' + score);
    score++;
    if (score > highScore) {
      highScore = score;
    }
  }, 200);

};

var asteroids = function() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var xPos = Math.floor(Math.random() * windowWidth);
  var yPos = Math.floor(Math.random() * windowHeight);
  console.log(d3.select('.ass1'));
  // d3.select('body')
};

var svg = d3.select('body')
      .append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight);

var placeAsteroids = function(n) {

  for (var i = 0; i < n; i++) {
    var xPos = Math.floor(Math.random() * window.innerWidth);
    var yPos = Math.floor(Math.random() * window.innerHeight);

    var asteroid = svg.append('circle')
      .attr('class', 'asteroid' + i)
      .attr('cx', xPos)
      .attr('cy', yPos)
      .attr('fill', 'red')
      .attr('r', 30);
    enemies = enemies.concat(asteroid);
  }
};


var moveAsteroids = function() {

  for (var i = 0; i < 10; i++) {
    var yPos = Math.floor(Math.random() * window.innerHeight);
    var xPos = Math.floor(Math.random() * window.innerWidth);

    d3.select('.asteroid' + i)
      .transition()
      .duration(1000)
      .attr('cx', xPos)
      .attr('cy', yPos)
      .tween('collision', collisionDetection)
      .each('end', moveAsteroids);
  }
};

// dragging the spaceShip


var drag = d3.behavior.drag()
    .on("dragstart", function() {
      draggableCircle.style('fill', 'blue');
    })
    .on("drag", function() {
      draggableCircle.attr('x', d3.event.x).attr('y', d3.event.y);
    })
    .on("dragend", function() { draggableCircle.style('fill', 'white'); });


var draggableCircle = svg
    .append('rect')
    .attr('class', 'spaceship rotate')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 25)
    .attr('height', 25)
    .attr('fill', 'yellow')
    .call(drag);

var checkCollision = function() {
  var spaceShip = d3.select('.spaceship');
  for (var asteroid = 0;  asteroid < enemies.length; asteroid++) {
    var spaceShipx = spaceShip[0][0].x.animVal.value;
    var spaceShipy = spaceShip[0][0].y.animVal.value;
    var xPosition = enemies[asteroid][0].cx.animVal.value;
    var yPosition = enemies[asteroid][0].cy.animVal.value;
    var radius = enemies[asteroid][0].r.animVal.value;
    var size = 25;

    if ((spaceShipx > xPosition && spaceShipx < xPosition + radius) && (spaceShipy > yPosition && spaceShipy < yPosition + radius) && (spaceShipx + size > xPosition && spaceShipx + size < xPosition + radius) && (spaceShipy + size > yPosition && spaceShipy + size < yPosition + radius)) {
      collisions++;
      d3.select('.collisions').text('Collisions: ' + collisions);
      d3.select('.highscore').text('High Score: ' + highScore);
    }
  }
};

var collisionDetection = function() {

  return function() {
    var spaceship = d3.select('.spaceship');

    enemies.forEach(function(enemy) {
      //console.log(enemy[0].cx);
      var otherCircle = enemy[0];
      console.log(spaceship.attr('x'));
      var dx = +spaceship.attr('x') - +otherCircle.cx.animVal.value;
      var dy = +spaceship.attr('y') - +otherCircle.cy.animVal.value;

      var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

      //console.log('dx = ' + dx + 'dy =' + dy);

      if (distance < +spaceship.attr('width') + +otherCircle.r.animVal.value) {
        collisions++;
        score = 0;
        d3.select('.collisions').text('Collisions: ' + Math.floor(collisions/100));
        d3.select('.highscore').text('High Score: ' + highScore);
      }
    });
  };
};

placeAsteroids(10);
asteroids();
moveAsteroids();
updateScore(0);
//console.log(enemies);
// setInterval(checkCollision, 50);
