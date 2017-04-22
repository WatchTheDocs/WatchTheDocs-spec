const component = () => {
  var element = document.createElement('div');
  element.innerHTML = '<h1>Your presentation goes here...</h1>';
  return element;
}

document.body.appendChild(component());

