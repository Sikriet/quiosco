// Este es un componente de React llamado "Alerta" que se exporta como predeterminado
// La función de componente recibe un objeto de propiedades (props) llamado "children"
export default function Alerta({children}) {
  return (
    <div className="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
        {/* El contenido dentro de la etiqueta de apertura y cierre del componente se renderizará dentro del elemento div */}
        {children}
    </div>
  )
}
