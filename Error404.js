class Error401 {
  init = apply => apply();

  render = () => `<h2>Resource not found</h2>`;
}

window.Error401 = Error401;