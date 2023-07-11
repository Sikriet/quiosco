import { useState } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
import {
  InputAdornment,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { toast } from "react-toastify";

export default function ModalEditarProducto() {
  // "producto" es la variable que contiene toda la información de él en forma de objeto
  const { producto, handleClickModal, handleClickEditarProducto, categorias } =
    useQuiosco();

  console.log(producto);
  const [nombre, setNombre] = useState(producto.nombre || "");
  const [precio, setPrecio] = useState(producto.precio || 0);
  const [categoria, setCategoriaId] = useState(producto.categoria_id);
  const [disponible, setDisponible] = useState(producto.disponible || 0);
  const [stock, setStock] = useState(producto.stock || 1);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="w-full flex justify-end">
        <button
          onClick={handleClickModal}
          className="flex bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white font-bold uppercase rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
  
      <div className="w-full flex justify-center">
        <img
          src={`/img/${producto.imagen}.jpg`}
          alt={`Imagen producto ${producto.nombre}`}
          className="w-48 h-48"
        />
      </div>
  
      <div className="w-full">
        <form className="space-y-4">
          <div>
            <TextField
              error={nombre.trim() === "" ? true : false}
              helperText={nombre.trim() === "" ? "Campo Requerido" : ""}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              defaultValue={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
  
          <div>
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              defaultValue={precio}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
  
          <div>
            <TextField
              id="outlined-basic"
              label="Stock"
              variant="outlined"
              defaultValue={stock}
              type="number"
              onChange={(e) => setStock(e.target.valueAsNumber)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </div>
  
          <div>
            <FormControlLabel
              control={
                <Switch defaultChecked={producto.disponible === 1 ? true : false} />
              }
              label="Disponibilidad"
              defaultValue={disponible}
              onChange={(e) => setDisponible(e.target.checked ? 1 : 0)}
            />
          </div>
  
          <div>
            <FormControl className="form-field">
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                id="categoria"
                name="categoria"
                value={categoria}
                onChange={(e) => setCategoriaId(e.target.value)}
                defaultValue={categoria}
              >
                <MenuItem value="">
                  <em>Seleccione una categoría</em>
                </MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
  
          <div className="flex justify-end">
            <button
              type="button"
              className="flex bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white font-bold uppercase rounded"
              onClick={() => {
                if (!nombre || precio < 0 || stock < 0)
                  return toast.error("Verifique los datos ingresados");
                handleClickEditarProducto(
                  producto.id,
                  nombre,
                  precio,
                  categoria,
                  disponible,
                  stock
                );
                handleClickModal();
              }}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}
