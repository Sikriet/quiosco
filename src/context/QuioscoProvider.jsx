import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../../config/axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [editarProducto, setEditarProducto] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0 )
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data) {
                setCategorias(data.data);
                if (data.data && data.data.length > 0) {
                    setCategoriaActual(data.data[0]);
                } else {
                    console.log("data.data Vacío");
                }
            } else {
                console.log("data Vacío");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = (editar) => {
        setModal(!modal);
        setEditarProducto(editar);
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    // Elimina "categoria_id" del objeto de producto
    const handleAgregarPedido = ({categoria_id, ...producto}) => { 
        
        if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState )
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        } else {
            // Toma una copia de lo que hay en pedido y agregale este producto nuevo
            setPedido([...pedido, producto]) 
            toast.success('Agregado el Pedido')
        }
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del Pedido')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios.post('/api/pedidos',
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);

            // Cerrar la sesión del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickEditarProducto = async (id, nombre, precio, categoria_id, disponible, stock) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, {
                nombre,
                precio,
                categoria_id,
                disponible,
                stock,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Editado Correctamente')
        } catch (error) {
            console.log(error)
            toast.error('Error al editar')
        }
    }

    const handleClickActualizarStock = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
          pedido.map(async producto => {
            const nuevoStock = producto.stock - producto.cantidad;

            await clienteAxios.put(
                `/api/productos/${producto.id}`,
                {
                    stock: nuevoStock,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          })

          console.log('Stock actualizado correctamente');
        } catch (error) {
          console.log(error);
          toast.error('Error al actualizar el stock');
        }
      };
      

    const handleClickCrearProducto = async (nombre, precio, categoria_id, disponible, stock) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.post(`/api/productos`, {
                nombre,
                precio,
                categoria_id,
                disponible,
                stock,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Creado Correctamente')
        } catch (error) {
            console.log(error)
            toast.error('Error al crear')
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickEditarProducto,
                handleClickCrearProducto,
                editarProducto,
                handleClickActualizarStock
            }}
        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext