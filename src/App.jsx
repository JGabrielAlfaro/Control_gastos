

// LIBRERIAS
import { useState,useEffect } from "react";

// COMPONENTES
import { generarID } from "./helper";
import Header from "./components/Header"
import Filtros from "./components/Filtros"
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos"

//HOJAS DE ESTILO E IMAGENE
import IconoNuevoGasto from "./img/nuevo-gasto.svg"


const App = () => {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );

  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false);
  const [modal,setModal]=useState(false); 
  const [animarModal,setAnimarModal]=useState(false);

  const [gastos,setGastos]=useState(
    //Se inicia como arreglo.
    localStorage.getItem("gastos") 
      ? JSON.parse(localStorage.getItem("gastos")) 
      : []
  );
  const [gastoEditar,setGastoEditar]=useState({});
  const [filtro,setFiltro]=useState('');
  const [gastosFiltrados,setGastosFiltrados]=useState([]);




  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0 ){
      setModal(true);
      
      setTimeout(()=>{
        setAnimarModal(true);
      },500)
    }
  },[gastoEditar])


  useEffect(() =>{
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  },[presupuesto])


  useEffect(() =>{
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? [])
  },[gastos])


  useEffect(() =>{
    if (filtro){
      // console.log("Filtrando...", filtro);
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      console.log(gastosFiltrados)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])


  useEffect(() =>{
    //const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuesto>0){
      setIsValidPresupuesto(true);
    }
  },[])


  const handleNuevoGasto = () => { 
    setModal(true);
    setGastoEditar({});
    setTimeout(()=>{
      setAnimarModal(true);
    },500)
  }

  const guardarGasto = gasto =>{
    if (gasto.id){
      //Actualizar
      const gastoActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados)
      setGastoEditar({});
    } else {
      //Nuevo gasto
      gasto.id = generarID()
      gasto.fecha=Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(()=>{
        setModal(false);
    },500)

  }

  const eliminarGato = id => {
    // console.log("Elimiando", id)
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={ modal ? 'fijar' : ''} >
        <Header 
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto} 
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          
         
        />
        { isValidPresupuesto 
              && (
                  <>
                      <main>
                        <Filtros
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGato={eliminarGato}
                            gastosFiltrados={gastosFiltrados}
                            filtro={filtro}
                        />
                      </main>
                      <div className="nuevo-gasto">
                          <img
                            src={IconoNuevoGasto}
                            alt="Icono nuevo gasto"
                            onClick={handleNuevoGasto}
                          />
                      </div>
                  </>
              )
        }

        {/* Mostrar el modal. */}
        {modal && < Modal 
                      setModal={setModal}
                      animarModal={animarModal}
                      setAnimarModal={setAnimarModal}
                      guardarGasto={guardarGasto}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}
                  />
        }
        
    </div>
  )
}

export default App
