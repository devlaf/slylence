var ignoreMe = ['user_a', 'user_b'];

function shouldHideMessage (message_sender) {
  return ignoreMe.includes(message_sender.textContent);
}

function removeNode (node) {
  node.parentNode.removeChild(node);
}

function findParentMessage (current) {
    while ((current = current.parentElement) && !current.classList.contains("message"));
    return current;
}

function onNodesChanged(nodes) {
  var messages = [].slice.call(document.getElementsByClassName('message_sender'));
  var messageToHide = messages.find(shouldHideMessage);

  if (messageToHide)
    removeNode(findParentMessage(messageToHide));
}

var nodeAddedObserver = new MutationObserver(onNodesChanged);
nodeAddedObserver.observe(document.getElementById('msgs_div'), {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});
