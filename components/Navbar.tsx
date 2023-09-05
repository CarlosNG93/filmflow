
import Link from 'next/link';



const Navbar = () => {
  return (
    <nav className="flex bg-blue-500 p-4 text-white">
      <Link href="/Peliculas" className="mx-2 hover:underline">
        <h1 className="mx-2 hover:underline">Inicio</h1>
      </Link>
      <Link href="/Directores" className="mx-2 hover:underline">
        Directores
      </Link>
      <Link href="/Reparto" className="mx-2 hover:underline">
        Reparto
      </Link>
    </nav>
  );
};

export default Navbar;
