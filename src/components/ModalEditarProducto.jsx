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
  Select,
  Button
} from "@mui/material";
import { toast } from "react-toastify";

export default function ModalEditarProducto() {
  // "producto" es la variable que contiene toda la información de él en forma de objeto
  const { producto, handleClickModal, handleClickEditarProducto, categorias } =
    useQuiosco();

  const [nombre, setNombre] = useState(producto.nombre || "");
  const [precio, setPrecio] = useState(producto.precio || 0);
  const [categoria, setCategoriaId] = useState(producto.categoria_id);
  const [disponible, setDisponible] = useState(producto.disponible || 0);
  const [stock, setStock] = useState(producto.stock || 0);

  return (
    <div className="bg-white p-4 mx-auto w-96">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <div className="w-full flex justify-center">
        <img
          src={`/img/${producto.imagen}.jpg`}
          alt={`Imagen producto ${producto.nombre}`}
          className="w-48 h-48"
        />
      </div>

      <TextField
        error={nombre.trim() === "" ? true : false}
        helperText={nombre.trim() === "" ? "Campo Requerido" : ""}
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        defaultValue={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        id="outlined-basic"
        label="Precio"
        variant="outlined"
        defaultValue={precio}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(e) => setPrecio(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        id="outlined-basic"
        label="Stock"
        variant="outlined"
        defaultValue={stock}
        type="number"
        onChange={(e) => setStock(e.target.valueAsNumber) }
        InputProps={{ inputProps: { min: 0 } }}
        fullWidth
        margin="normal"
      />

      {console.log(stock)}

      <FormControlLabel
        control={
          <Switch defaultChecked={producto.disponible === 1 ? true : false} />
        }
        label="Disponibilidad"
        defaultValue={disponible}
        onChange={(e) => setDisponible(e.target.checked ? 1 : 0)}
      />

      <FormControl fullWidth>
        <InputLabel id="categoria-label">Categoría</InputLabel>
        <Select
          labelId="categoria-label"
          id="categoria"
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoriaId(e.target.value)}
          defaultValue={categoria}
          fullWidth
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

      <div className="flex justify-end mt-4">
        <Button variant="contained" onClick={() => handleClickModal(false)} className="mr-2">
          Cancelar
        </Button>
        <Button
          variant="contained"
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
            handleClickModal(false);
          }} >
          Guardar
        </Button>
      </div>
    </div>
  );
}
