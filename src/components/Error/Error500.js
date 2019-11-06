class Error401 {
  init = apply => apply();

  render = () => `<h2>Server error</h2>`;
}

window.Error401 = Error401;