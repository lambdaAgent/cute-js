exports.createClickEvent = () => new window.MouseEvent("click", {
  "view": window,
  "bubbles": true,
  "cancelable": false
});
