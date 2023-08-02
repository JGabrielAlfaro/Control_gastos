import Gasto from "./Gasto"

const ListadoGastos = ({gastos,setGastoEditar,eliminarGato,filtro,gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">
     
      {
        filtro 
          ? (
            <>
                <h2>{ gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
                {
                  gastosFiltrados.map( gasto => (
                      <Gasto 
                          key={gasto.id} 
                          gasto={gasto}
                          setGastoEditar={setGastoEditar}
                          eliminarGato={eliminarGato}
                      />
                  ))
                }
            </>
          )
          : (
            <>
                <h2>{ gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
                {
                    gastos.map( gasto => (
                    <Gasto 
                        key={gasto.id} 
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGato={eliminarGato}
                    />
                  ))
                }
            </>
          )
      }

    </div>
  )
}

export default ListadoGastos
