import useSWR from "swr";
import clienteAxios from "../../config/axios";
import Producto from "../components/Producto";
import { useState } from "react";
import unidecode from "unidecode";

export default function Productos() {
  const [filtro, setFiltro] = useState("");

  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((datos) => datos.data);

  const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading)
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-black">Productos</h1>
      <p className="text-2xl my-10">Maneja la disponibilidad desde aquí.</p>

      <input
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar producto"
        className="border border-black text-lg mr-2"
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data.data
          .filter((producto) => {
            // Obten el nombre del producto en minúsculas
            const productName = unidecode(producto.nombre.toLowerCase());
            // Divide el filtro en palabras individuales
            const searchTerms = unidecode(filtro.toLowerCase()).split(" ");
            // Verifica si todas las palabras del filtro están presentes en el nombre del producto
            return searchTerms.every((term) => productName.includes(term));
          })
          .map((producto) => (
            <Producto
              key={producto.imagen}
              producto={producto}
              botonEditarProducto={true}
            />
          ))}
      </div>
    </div>
  );
}
