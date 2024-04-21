import React, { useState, useEffect } from "react";
import SearchInput from "./Search.js";
import ReactFamilyTree from 'react-family-tree'
import FamilyNode from "./FamilyNode.js";
import JSONFileInput from "./JSONFileInput.js";
import RawDataDisplay from "./RawDataDisplay.js";
import initData from "../configs/initData.json";
import ErrorBoundary from "./ErrorBoundary.js";
import checkValidTree from "../configs/CalcTree.js";
import NodeModal from "./NodeModal.js";
import {addChild, addSpouse} from "../configs/TreeHelper.js"

const WIDTH = 150;
const HEIGHT = 100;

const FamilyTree = () => {

    const data = initData
    const myID = data[0].id;
    const [treeData, setTreeData] = useState(data)
    const [highlightedNode, setHighlightedNode] = useState(null);
    const [rootId, setRootId] = useState(myID);
    const [fileData, setFileData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedNode, setEditedNode] = useState(null);

    const handleSearchSubmit = (birthdate) => {
      setHighlightedNode(birthdate);
      setTimeout(()=> {
        setHighlightedNode(null)
      }, 2000)
    };

    const handleFileChange = (jsonData) => {
      setFileData(jsonData);
    };

    const handleChangeTreeData = (jsonData) => {
      checkValidTree(jsonData, {rootId: jsonData[0].id})
      setTreeData(jsonData)
      setRootId(jsonData[0].id)
    }

    const handleCloseModal = () => {
      setEditedNode(null)
      setIsModalOpen(false)
    }

    const handleOpenModal = () => {
      setIsModalOpen(true)
    }


    const handleSave = () => {
      try {

        let tmpTreeData = [...treeData]
        
        const index = tmpTreeData.findIndex((n) => n.id === editedNode.id);
        if (index !== -1) {
          tmpTreeData[index] = editedNode;
        }

        handleChangeTreeData(tmpTreeData)
        alert("Update Tree successfully!")
        handleCloseModal()

      } catch (error) {
        alert(`Wrong JSON format or Tree Data Structure
  All the id must be unique, all the relationship must be well-structured`)
      }
      
    };

    const handleAddChild = () => {
      try {

        let tmpTreeData = addChild(treeData, editedNode)
        handleChangeTreeData(tmpTreeData)

        alert("Add Child successfully!")
        handleCloseModal()
      } catch (error) {
        alert("Failed to add new Child")
      }
      
    }

    const handleAddSpouse = () => {
      try {

        let tmpTreeData = addSpouse(treeData, editedNode)
        handleChangeTreeData(tmpTreeData)

        alert("Add Spouse successfully!")
        handleCloseModal()

      } catch (error) {
        alert(error.message + "\nFailed to add new Spouse")
      }
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedNode({ ...editedNode, [name]: value });
    };

  
    const RenderTree = () => {
      
      return (
        <div className="flex justify-center p-10 align-middle">
          <div>
            <ReactFamilyTree
              nodes={treeData}
              rootId={rootId}
              width={WIDTH*2}
              height={HEIGHT*2}
              renderNode={(node) => (
                <FamilyNode
                  key={node.id}
                  node={node}
                  isRoot={node.id === rootId}
                  isSearchingFor={highlightedNode}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    position: `absolute`,
                    transition: "transform 0.3s ease-in-out",
                    transform: `translate(${node.left * WIDTH + WIDTH/2}px, ${node.top * HEIGHT + HEIGHT/2}px)`
                  }}
                  handleOpenModal={handleOpenModal}
                  setEditedNode = {setEditedNode}
                />
              )}
            />
          </div>
        </div>
      );

    };
  
    return (
      <div className="pt-6 flex align-middle">
        <div className="flex justify-center align-middle">

          <div className="p-2">
            <SearchInput onSubmit={handleSearchSubmit} />
            <JSONFileInput onFileChange={handleFileChange} />
            <RawDataDisplay initialData={fileData} defaultData={data} onSubmit={handleChangeTreeData}/>
          </div>
          

        </div>

        <ErrorBoundary onReset={() => handleChangeTreeData(data)}>
          <RenderTree />
          
          <NodeModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            editedNode={editedNode}
            onInputChange={handleInputChange} 
            onSave={handleSave} 
            onAddChild={handleAddChild}
            onAddSpouse={handleAddSpouse}
          />
        </ErrorBoundary>

      </div>
    );
};

export default FamilyTree;
  