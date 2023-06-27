import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Producto({producto, botonAgregar = false, botonEditarProducto = false}) {

    const { handleClickModal, handleClickModalEditar, handleSetProducto, handleClickEditarProducto } = useQuiosco();
    const { nombre, imagen, precio, stock } = producto

    return (
        <div className="border p-3 shadow bg-white">
            <img 
                className="w-full"
                src={`/img/${imagen}.jpg`} 
                alt={`imagen ${nombre}`} 
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    { formatearDinero(precio)}
                </p>
                <p className="mt-5 font-black text-2xl">
                    Stock Actual: {stock}
                </p>

                {botonAgregar && (
                <button
                    type="button"
                    className={`bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold ${stock === 0 ? 'cursor-not-allowed' : ''}`}
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                    disabled={stock === 0}
                >
                    Agregar
                </button>
                )}

                {botonEditarProducto && (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                    Editar Producto
                </button>
                )}

            </div>

        </div>
    )
}
