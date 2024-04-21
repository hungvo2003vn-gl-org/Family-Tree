import calcTree from 'relatives-tree'


function checkValidTree(data, {rootId}) {
    calcTree(data, {rootId})
}

export default checkValidTree