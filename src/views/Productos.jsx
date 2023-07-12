import useSWR from "swr";
import clienteAxios from "../../config/axios";
import Producto from "../components/Producto";
import { useState } from "react";
import unidecode from "unidecode";
import useQuiosco from "../hooks/useQuiosco";

export default function Productos() {
  const { handleClickModal, handleSetProducto } = useQuiosco();
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

      <div className="flex justify-between items-center m-1">
        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Buscar producto"
          className="border border-black text-lg p-2 mb-1 pr-8 placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-500"
        />
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white font-bold uppercase rounded"
          onClick={() => {
            handleClickModal();
            handleSetProducto(producto);
          }}
        >
          Nuevo Producto
        </button>
      </div>

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
