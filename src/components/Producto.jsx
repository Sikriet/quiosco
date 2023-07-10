import React from 'react';
import ModalPadre from '../views/ModalPadre';
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"
import ModalEditar from '../templates/ModalEditar';

class Producto extends ModalPadre {
  constructor(props) {
    super(props);
  }

  render() {
    const { producto, botonAgregar = false, botonEditarProducto = false } = this.props;
    const { nombre, precio, imagen, categoria_id, stock, disponible } = producto;
    // const { nombre: modalNombre, precio: modalPrecio } = this.state;

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
            {formatearDinero(precio)}
          </p>
          <p className="mt-5 font-black text-2xl">
            Stock Actual: {stock}
          </p>

          {botonAgregar && (
            <button
              type="button"
              className={`text-white w-full mt-5 p-3 uppercase font-bold ${stock === 0 ? 'bg-indigo-100 hover:cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800'}`}
              onClick={() => {
                this.handleClickModal();
                this.handleSetProducto(producto);
              }}
              disabled={stock === 0}
            >
              {stock === 0 ? 'Agotado' : 'Agregar'}
            </button>
          )}

          {botonEditarProducto && (
            <button
              type="button"
              className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
              onClick={() => {
                this.abrirModal();
                // this.handleClickModal();
                // this.handleSetProducto(producto);
              }}
            >
              Editar Producto
            </button>
          )}

        </div>

        {this.state.showModal && (
          <div className="modal-overlay">
            <ModalEditar
                id={producto.id}
                nombre={nombre}
                precio={precio}
                imagen={imagen}
                categoria_id={categoria_id}
                stock={stock}
                disponible={disponible}
                handleChange={this.handleChange}
                guardarCambios={this.guardarCambios}
                cerrarModal={this.cerrarModal}
                handleImagenChange={this.handleImagenChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Producto;
