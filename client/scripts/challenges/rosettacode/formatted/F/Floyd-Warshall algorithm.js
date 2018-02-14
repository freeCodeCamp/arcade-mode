
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Floyd-Warshall algorithm
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// benchmark:


/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">The <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Floyd–Warshall_algorithm" title="wp: Floyd–Warshall_algorithm">Floyd–Warshall algorithm</a> is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights.</p>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task</dt></dl>
/// <p class="rosetta__paragraph">Find the lengths of the shortest paths between all pairs of vertices of the given directed graph. Your code may assume that the input has already been checked for loops, parallel edges and negative cycles.</p>
/// <p class="rosetta__paragraph">Write a function that takes an array and a number as parameters. The array will contain 3 elements : the third element in the array is the weight of the edge between the vertices denoted by the first and second element. For example: [1,2,3] = The weight of the edge between vertices 1 and 2 is 3. The number parameter denotes the total number of vertices in the graph. The function should return an array of length equal to the number of vertices. Each array element should also be an array that contains the shortest distances to the other vertices. For example: Let's assume that the function returns [ [5,3] , [5,3] , [4,6] ]. The first element is [5,3] which have the shortest distances from the vertex 1 to the other vertices. The shortest distance between 1 and 2 is 5. The shortest distance between 1 and 3 is 3. Similarly the second element represent the shortest distance from vertex 2 to other vertices, i.e. From 2 to 1 shortest distance is 5 and From 2 to 3 it is 3.</p>
/// </div>

/// challengeSeed:
function floydWarshall (weights,numVertices) {
  // Good luck!
}

/// solutions:
function floydWarshall(weights,numVertices) {
  var dist = new Array(numVertices);
  for(var i=0;i<numVertices;i++){
    dist[i]=new Array(numVertices);
    dist[i].fill(9999999);
  }

  weights.forEach(function(w){
      dist[w[0] - 1][w[1] - 1] = w[2];
  })

  var next = new Array(numVertices);
  for(var i=0;i<numVertices;i++)
    next[i]=new Array(numVertices);

  for (var i = 0; i < next.length; i++) {
      for (var j = 0; j < next.length; j++)
          if (i != j)
              next[i][j] = j + 1;
  }

  for (var k = 0; k < numVertices; k++)
      for (var i = 0; i < numVertices; i++)
          for (var j = 0; j < numVertices; j++)
              if (dist[i][k] + dist[k][j] < dist[i][j]) {
                  dist[i][j] = dist[i][k] + dist[k][j];
                  next[i][j] = next[i][k];
              }

  for(var i=0;i<dist.length;i++){
    dist[i].splice(i,1)
  }
  return dist;
}

/// tail:
let tests=[
  [[1,2,2],[1,3,1],[2,3,4],[3,1,1]],
  [[1,2,2],[2,1,2],[1,3,1],[3,1,1],[2,3,4],[3,2,4]],
  [[1,2,1],[2,3,2],[3,1,3]],
  [[1,2,6],[1,3,2],[2,4,1],[3,4,4],[4,1,2]],
  [[1, 3, 2], [2, 1, 4], [2, 3, 3], [3, 4, 2], [4, 2, 1]]
]
let results=[
  [ [ 2, 1 ], [ 5, 4 ], [ 1, 3 ] ],
  [ [ 2, 1 ], [ 2, 3 ], [ 1, 3 ] ],
  [ [ 1, 3 ], [ 5, 2 ], [ 3, 4 ] ],
  [ [ 6, 2, 6 ], [ 3, 5, 1 ], [ 6, 12, 4 ], [ 2, 8, 4 ] ],
  [ [ 5, 2, 4 ], [ 4, 3, 5 ], [ 7, 3, 2 ], [ 5, 1, 4 ] ],
]

/// tests:
assert(typeof floydWarshall=='function','message: <code>floydWarshall</code> should be a function.');
assert(Array.isArray(floydWarshall(tests[0].slice(),3)),'message: <code>floydWarshall('+JSON.stringify(tests[0])+',3)</code> should return an array.');
assert.deepEqual(floydWarshall(tests[0].slice(),3),results[0],'message: <code>floydWarshall('+JSON.stringify(tests[0])+',3)</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(floydWarshall(tests[1].slice(),3),results[1],'message: <code>floydWarshall('+JSON.stringify(tests[1])+',3)</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(floydWarshall(tests[2].slice(),3),results[2],'message: <code>floydWarshall('+JSON.stringify(tests[2])+',3)</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(floydWarshall(tests[3].slice(),4),results[3],'message: <code>floydWarshall('+JSON.stringify(tests[3])+',4)</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
assert.deepEqual(floydWarshall(tests[4].slice(),4),results[4],'message: <code>floydWarshall('+JSON.stringify(tests[4])+',4)</code> should return <code>'+JSON.stringify(results[4])+'</code>.');
/// id: 5a76c2ab6c8a050b6221d8bc
