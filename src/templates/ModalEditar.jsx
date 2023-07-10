import React from "react";
import { useState } from "react";
import "../styles/Modal.css";
import useQuiosco from "../hooks/useQuiosco";
import { FormControlLabel, Switch } from "@mui/material";

const ModalEditar = ({
  id,
  nombre,
  precio,
  imagen,
  categoria_id,
  stock,
  disponible,
  handleChange,
  cerrarModal,
  handleImagenChange,
}) => {
  const { handleClickEditarProducto, categorias } = useQuiosco();

  const [getCategoriaId, setCategoriaId] = useState(categoria_id);
  const [getNombre, setNombre] = useState(nombre);
  const [getPrecio, setPrecio] = useState(precio);
  const [getStock, setStock] = useState(stock);
  const [getDisponible, setDisponible] = useState(disponible);

  return (
    <div className="modal-content">
      <div className="form-container">
        <div className="form-field">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={(e) => handleImagenChange(e.target.files[0])}
          />
        </div>
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            defaultValue={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            defaultValue={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="categoria_id">Categoría</label>
          <select
            id="categoria_id"
            name="categoria_id"
            defaultValue={categoria_id}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            id="stock"
            name="stock"
            defaultValue={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="form-field">
          <FormControlLabel
            control={<Switch defaultChecked={disponible ? true : false} />}
            label="Disponibilidad"
            onChange={(e) => setDisponible(e.target.checked)}
          />
        </div>

        <button
          className="purple-button"
          onClick={() => {
            if (!getNombre || getPrecio < 0 || getStock < 0)
              return toast.error("Verifique los datos ingresados");
            handleClickEditarProducto(
              id,
              getNombre,
              getPrecio,
              getDisponible,
              getCategoriaId,
              getStock
            );
            cerrarModal();
          }}
        >
          Guardar cambios
        </button>
        <button className="purple-button" onClick={cerrarModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalEditar;
