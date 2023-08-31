export function removeAllChildren(node: Node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild)
    }
}