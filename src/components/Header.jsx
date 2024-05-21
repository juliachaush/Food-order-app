import Logo from "../assets/logo.jpg";

export default function Header({ onCartClick, onCartItemChange }) {
  return (
    <header id="main-header">
      <title id="title">
        <img src={Logo} />
        <h1>Reactfood</h1>
      </title>
      <button className="text-button" onClick={onCartClick}>
        Cart({onCartItemChange})
      </button>
    </header>
  );
}
