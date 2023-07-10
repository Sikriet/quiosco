import React, { Component, useState } from "react";
import ModalEditar from "../templates/ModalEditar";
import "../styles/Modal.css";

class ModalPadre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Infinity,
      nombre: "",
      precio: "",
      categoria_id: "",
      stock: "",
      imagen: "",
      disponible: "",
      showModal: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImagenChange = (file) => {
    // Aquí puedes realizar las operaciones necesarias con la imagen seleccionada
    // por ejemplo, subirla a un servidor o procesarla en el lado del cliente.
    // Puedes utilizar librerías o servicios específicos para esto.

    // En este ejemplo, simplemente mostraremos el nombre de la imagen seleccionada.
    console.log("Imagen seleccionada:", file.name);
  };
  guardarCambios = () => {
    // Lógica para guardar los cambios
    // Puedes acceder a los valores en this.state
  };

  abrirModal = () => {
    this.setState({ showModal: true });
  };

  cerrarModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      id,
      nombre,
      precio,
      categoria_id,
      stock,
      imagen,
      disponible,
      showModal,
    } = this.state;

    return (
      <div className="modal-container">
        <button className="open-modal-button" onClick={this.abrirModal}>
          Abrir Modal
        </button>
        {showModal && (
          <div className="modal-overlay">
            <ModalEditar
              id={id}
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

export default ModalPadre;
