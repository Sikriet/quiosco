import React from 'react';
import ModalPadre from '../views/ModalPadre';

class CrearProducto extends ModalPadre {
  agregarProducto = () => {
    // Lógica para agregar un producto
    // Puedes acceder a los valores en this.state
  }
  
  render() {
    return (
      <div>
        <h2>Crear Producto</h2>
        {/* Agrega más campos de entrada o elementos según tus necesidades */}
        <button onClick={this.agregarProducto}>Agregar</button>
        
        {super.render()}
      </div>
    );
  }
}

export default CrearProducto;
