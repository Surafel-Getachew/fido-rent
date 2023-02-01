/*
    Node is defined as
    var Node = function(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
*/


function preOrderTraverse(root) {
    if (root) {
        traversal.push(root.data)
        preOrderTraverse(root.left)
        preOrderTraverse(root.right)
    }
}

function preOrder(root) {
    preOrderTraverse(root)
    console.log(...traversal)
}

