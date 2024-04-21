// Function to generate a unique ID of a specific length
const generateUniqueId = (treeData) => {
  const idLength = 4; // Set the desired length of the ID
  let newId;
  do {
    newId = Math.random().toString(36).slice(2, idLength); // Generate ID of specified length
  } while (treeData.some(node => node.id === newId));
  return newId;
};

const newNode = (treeData) => {
  return {
    id: generateUniqueId(treeData),
    name: "null",
    yearOfBirth: 'null',
    spouses: [],
    parents: [],
    children: [],
    siblings: []
  }
}

const findById = (treeData, nodeId) => {
  const index = treeData.findIndex((n) => n.id === nodeId);
  return index
}

// Function to add a child to a node
export const addChild = (treeData, currentNode) => {

  const updatedTreeData = [...treeData];
  const childNode = newNode(updatedTreeData);
  childNode.yearOfBirth = new Date().getFullYear()

  // Add the current node as a parent to the child
  childNode.parents.push({
    id: currentNode.id,
    type: "blood"
  });

  // Add the child to the current node's children
  const currentIndex = findById(updatedTreeData, currentNode.id);
  updatedTreeData[currentIndex].children.push({
    id: childNode.id,
    type: "blood"
  });

  // If the current node has spouses, add them as parents to the child
  currentNode.spouses.forEach(spouseObj => {

    if (spouseObj.type !== "married") return;

    // Add spouse as parent to the child
    childNode.parents.push({
      id: spouseObj.id,
      type: "blood"
    });

    // Add the child to the spouse's children
    const spouseIndex = findById(updatedTreeData, spouseObj.id);
    updatedTreeData[spouseIndex].children.push({
      id: childNode.id,
      type: "blood"
    });
  });

  // Add the child node to the treeData
  updatedTreeData.push(childNode);

  return updatedTreeData;
};


// Function to add a spouse to a node
export const addSpouse = (treeData, currentNode) => {
  
  const updatedTreeData = [...treeData]
  const spouseNode = newNode(updatedTreeData)

  // Add currentNode as a spouse to spouseNode
  spouseNode.spouses.push({
    id: currentNode.id,
    type: "married"
  })

  // Add the spouse to the currentNode's spouse
  const currentIndex = findById(updatedTreeData, currentNode.id);

  //Cant have 2 married spouses
  const hasMarriedSpouse = updatedTreeData[currentIndex].spouses.some(spouse => spouse.type === "married");
  if (hasMarriedSpouse) {
    throw new Error("Cannot married two peoples at the same time")
  }

  updatedTreeData[currentIndex].spouses.push({
    id: spouseNode.id,
    type: "married"
  });

  // Add all the child of currentNode to spouseNode
  currentNode.children.forEach(childObj => {    

    // Add the spouse to the child's parent
    const childIndex = findById(updatedTreeData, childObj.id);
    updatedTreeData[childIndex].parents.push({
      id: spouseNode.id,
      type: "adopted" //Warning error
    });

    // Add the children to the spouse
    spouseNode.children.push({
      id: childObj.id,
      type: "adopted" //Warning error
    })

  });

  updatedTreeData.push(spouseNode)

  return updatedTreeData;
};

// Function to delete a node with no children (except the root node)
// export const deleteNode = (treeData, currentNode) => {
  
//     return updatedTreeData;
// }