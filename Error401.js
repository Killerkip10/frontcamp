class Error401 {
  init = apply => apply();

  render = () => `<h2>Your API KEY is not valid</h2>`;
}

window.Error401 = Error401;