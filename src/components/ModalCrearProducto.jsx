import useQuiosco from "../hooks/useQuiosco";
import { useState } from "react";
import { TextField, FormControlLabel, Switch, Select, MenuItem, Button, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";

export default function ModalCrearProducto() {
  const { handleClickModal, handleClickCrearProducto, categorias } =
    useQuiosco();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [categoria, setCategoria] = useState("");

  return (
    <div className="bg-white p-4 mx-auto w-96">
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Precio"
        value={precio}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
        onChange={(e) => setPrecio(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stock"
        value={stock}
        type="number"
        onChange={(e) => setStock(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            defaultChecked={false}
          />
        }
        label="Disponibilidad"
        defaultValue={0}
        className="mt-4"
        onChange={(e) => setDisponible(e.target.checked ? 1 : 0)}
      />
      <Select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
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
      <div className="flex justify-end mt-4">
        <Button variant="contained" onClick={() => handleClickModal(false)} className="mr-2">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={() => {
          if (!nombre || precio < 0 || stock <0) return toast.error("Verifique los datos ingresados");
          handleClickCrearProducto(
            nombre,
            precio,
            categoria,
            disponible,
            stock
          );
          handleClickModal(false);
        }}>
          Crear
        </Button>
      </div>
    </div>
  );
}
