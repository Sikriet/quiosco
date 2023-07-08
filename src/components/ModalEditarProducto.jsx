import { useState } from 'react'
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers";
import { InputAdornment, TextField, FormControlLabel, Switch } from "@mui/material";
import { toast } from 'react-toastify';

export default function ModalEditarProducto() {

    // "producto" es la variable que contiene toda la información de él en forma de objeto
    const { producto, handleClickModal, handleClickEditarProducto } = useQuiosco();
    const [ nombre, setNombre ] = useState(producto.nombre || '');
    const [ precio, setPrecio ] = useState(producto.precio || 0);
    const [ disponible, setDisponible ] = useState(producto.disponible || 0);
    const [ stock, setStock ] = useState(producto.stock || 1);

    return (
        <div className="md:flex items-center gap-10 relative">
            {/* md:w-1/3 Es para que abarque 1 de 3 columnas */}
            <div className="md:w-1/3">
                <img 
                    src={`/img/${producto.imagen}.jpg`} 
                    alt={`Imagen producto ${producto.nombre}`} 
                />
            </div>

            <div className="md:w-2/3">
                <div className="absolute top-0 right-0 mt-2 mr-2">
                    <button 
                        onClick={handleClickModal}
                        className='flex bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded w-full md:w-auto md:mt-0 md:mr-0'    
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

                <TextField 
                    error={nombre.trim() === '' ? true : false}
                    helperText={nombre.trim() === '' ? 'Campo Requerido' : ''}
                    id="outlined-basic" 
                    label="Nombre" 
                    variant="outlined" 
                    defaultValue={nombre}
                    onChange={(e) => setNombre(e.target.value)} />

                <TextField 
                    id="outlined-basic" 
                    label="Precio" 
                    variant="outlined" 
                    defaultValue={precio}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    onChange={(e) => setPrecio(e.target.value)} />

                <TextField 
                    id="outlined-basic" 
                    label="Stock" 
                    variant="outlined" 
                    defaultValue={stock}
                    type="number"
                    onChange={(e) => setStock(e.target.valueAsNumber)}
                    InputProps={{ inputProps: { min: 0 } }} />

                <FormControlLabel 
                    control={<Switch defaultChecked={producto.disponible === 1 ? true : false} />} 
                    label="Disponibilidad"
                    defaultValue={disponible}
                    onChange={(e) => setDisponible(e.target.checked ? 1 : 0)}
                     />

                <button
                    type="button"
                    className="flex bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                    onClick={() => {
                        if(!nombre || precio < 0 || stock < 0) return toast.error('Verifique los datos ingresados');
                        handleClickEditarProducto(producto.id, nombre, precio, disponible, stock);
                        handleClickModal();
                    }}
                >
                    Guardar Cambios
                </button>

            </div>
        </div>
    )
}
