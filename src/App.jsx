
// LIBRERIAS
import { useState } from "react";

// COMPONENTES
import { generarID } from "./helper";
import Header from "./components/Header"
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos"

//HOJAS DE ESTILO E IMAGENE
import IconoNuevoGasto from "./img/nuevo-gasto.svg"


const App = () => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false);
  const [modal,setModal]=useState(false); 
  const [animarModal,setAnimarModal]=useState(false);
  const [gastos,setGastos]=useState([]);

  const handleNuevoGasto = () => { 
    setModal(true);
    setTimeout(()=>{
      setAnimarModal(true);
    },500)
  }

  const guardarGasto = gasto =>{
    gasto.id = generarID()
    gasto.fecha=Date.now();
    setGastos([...gastos, gasto]);

    setAnimarModal(false);

    setTimeout(()=>{
        setModal(false);
    },500)

  }

  return (
    <div className={ modal ? 'fijar' : ''} >
        <Header 
          gastos={gastos}
          presupuesto={presupuesto} 
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
        { isValidPresupuesto 
              && (
                  <>
                      <main>
                        <ListadoGastos
                          gastos={gastos}
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
                  />
        }
        
    </div>
  )
}

export default App
