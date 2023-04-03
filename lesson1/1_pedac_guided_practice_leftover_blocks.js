/*
1.Understandd the problem
  -Input
    -A number representing the amount of cubes that can be used in a structure
  -Output
    -The number of leftover blocks after building the tallest valid structure
  -Rules
    -Building blocks are cubes
    -structture is built in layers
    -top layer is a single block
    -A block in an upper layer must be supported by four blocks in a lower layer
    -A block in a lower layer can support more than one block in an upper layer
    -You cannot leave gaps between blocks
    -Implicit
      -Layer nummber correlates with blocks in a layer
        -Layer number x layer  number = number of blocks in layer
  -Questions
    -How should we handle single layer structures? Would a single cube be the tallest
     structure for arguments of 1 through 4? Is a single layer structure valid?

2.Examples and test cases
  -The test cases show us, that when 6 blocks are avaialble for a structure, 1 
   is the expected value to be left over. Thus, additional blocks not supporting
   any upper layer blocks are not considered valid parts of a structure / layer
  -A single layer structure is a valid structure. It contains only one block and
   any additional blocks between 1 and 5 would result in left over blocks
   
   14 - layer 1 - 1 block, layer 2 = 4 blocks, layer 3 = 9 blocks = 14 total blocks
  -The test cases affirm my assumptions about how each layer works and that each
   layer number correspondds to the number of blocks, squared, in that layer. 
   
3.Data Structure
  -I don't think any complex data structure ould be beneficial in solving this problem.
  -Perhaps use nested array's to visualize each layer of blocks? 
  
4.Algorithm
  -declare a layerCount variable and initialize it to zero
  -declare a currentLayerBlockCount variable and initialize it to zero
  -declare a nextLayerBlockCount variable and initialize it to 1

  -while true
    -if currentLayerBlockCount is less than or equal to the argument blocks and 
     nextLayerBlockCount is greater than argument blocks
      -return blocks - currentLayerBlockCount
    -else 
      -increment layerCount
      -reassign currentLayerBlockCount to the value of nextLayerBlockCount
      -reassign nextLayerBlockCount to its current value + layerCount + 1 squared
*/

function calculateLeftoverBlocks (blocks) {
  let layerCount = 0;
  let currentLayerBlockCount = 0
  let nextLayerBlockCount = 1
  
  while(true) {
    if(currentLayerBlockCount <= blocks && nextLayerBlockCount > blocks) {
      return blocks - currentLayerBlockCount;
    } else {
      layerCount += 1;
      currentLayerBlockCount = nextLayerBlockCount;
      nextLayerBlockCount += (layerCount + 1) ** 2;
    }
  }
}

console.log(calculateLeftoverBlocks(0) === 0); //true
console.log(calculateLeftoverBlocks(1) === 0); //true
console.log(calculateLeftoverBlocks(2) === 1); //true
console.log(calculateLeftoverBlocks(4) === 3); //true
console.log(calculateLeftoverBlocks(5) === 0); //true
console.log(calculateLeftoverBlocks(6) === 1); //true
console.log(calculateLeftoverBlocks(14) === 0); //true