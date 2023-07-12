import useQuiosco from "../hooks/useQuiosco";
import { useState } from "react";
import { TextField, FormControlLabel, Switch, Select, MenuItem, Button } from "@mui/material";

export default function ModalCrearProducto() {
  const { handleClickModal, handleClickCrearProducto, categorias } =
    useQuiosco();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState("");
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
        onChange={(e) => setPrecio(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stock"
        value={stock}
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
        <MenuItem value="">Seleccione una categoría</MenuItem>
        <MenuItem value="categoria1">Categoría 1</MenuItem>
        <MenuItem value="categoria2">Categoría 2</MenuItem>
        <MenuItem value="categoria3">Categoría 3</MenuItem>
      </Select>
      <div className="flex justify-end mt-4">
        <Button variant="contained" onClick={handleClickModal} className="mr-2">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={console.log("GUARDAR")}>
          Guardar
        </Button>
      </div>
    </div>
  );
}
