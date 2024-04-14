import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-orange-600 px-5 py-3">
      <nav className="flex relative">
        <div className="absolute left-0 inset-y-0">
          <img
            alt="Lojado Mecanico"
            src="/public/logo.svg"
            className="h-6"
          ></img>
        </div>
        <ul className="flex gap-10 ml-10 text-white px-60">
          <li className="hover:bg-black hover:bg-opacity-10 p-2 rounded">
            <Link to="/cart">MEU CARRINHO</Link>
          </li>
          <li className="hover:bg-black hover:bg-opacity-10 p-2 rounded">
            <Link to="/shipping"> IDENTIFICACÃO</Link>
          </li>
          <li className="hover:bg-black hover:bg-opacity-10 p-2 rounded">
            <Link to="/payment">PAGAMENTOS</Link>
          </li>
          <li className="hover:bg-black hover:bg-opacity-10 p-2 rounded">
            <Link to="/confirmation">CONFIRMACÃO</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
