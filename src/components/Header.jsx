import Logo from "../assets/logo.jpg";

export default function Header({ onCartClick }) {
  return (
    <header id="main-header">
      <title id="title">
        <img src={Logo} />
        <h1>Reactfood</h1>
      </title>
      <button className="text-button" onClick={onCartClick}>
        Cart(3)
      </button>
    </header>
  );
}
