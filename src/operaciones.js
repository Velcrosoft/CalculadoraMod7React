import Big from "big.js"
import operacion from "./operacion"
import esNumero from "./esNumero"

export default function operaciones(estado, nombreDeBoton) {

    if (nombreDeBoton === "AC") {
      return {
        total: null,
        siguiente: null,
        operador: null,
      };
    }
    
    //si es numero
    if (esNumero(nombreDeBoton)) {
      console.log('es numero')
      if (nombreDeBoton === "0" && estado.siguiente === "0") return {data:"ninguna"}
      
      if (estado.operador) {
  
        if (estado.siguiente) return { siguiente: estado.siguiente + nombreDeBoton }
        
        return { siguiente: nombreDeBoton }
      }
      
      if (estado.siguiente) {
  
        const siguiente = estado.siguiente === "0" ? nombreDeBoton : estado.siguiente + nombreDeBoton;
  
        return {
          siguiente,
          total: null,
        }
  
      }
  
      return {
        siguiente: nombreDeBoton,
        total: null,
      }
    }
    //fin es numero
  
    if (nombreDeBoton === "%") {
  
      if (estado.operador && estado.siguiente) {
  
        const result = operacion(estado.total, estado.siguiente, estado.operador)
  
        return {
          total: Big(result)
            .div(Big("100"))
            .toString(),
          siguiente: null,
          operador: null,
        }
  
      }
  
      if (estado.siguiente) {
        return {
          siguiente: Big(estado.siguiente)
            .div(Big("100"))
            .toString(),
        }
      }
  
      return {};
  
    }
    if (nombreDeBoton === "Sin") {

      if (estado.siguiente) return { siguiente: (Math.sin(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.sin(estado.siguiente)).toString() }
  
      return {}
  
    }
    if (nombreDeBoton === "ASin") {

      if (estado.siguiente) return { siguiente: (Math.asin(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.asin(estado.siguiente)).toString() }
  
      return {}
  
    }
    if (nombreDeBoton === "Cos") {

      if (estado.siguiente) return { siguiente: (Math.cos(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.cos(estado.siguiente)).toString() }
  
      return {}
  
    }
    if (nombreDeBoton === "ACos") {

      if (estado.siguiente) return { siguiente: (Math.acos(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.acos(estado.siguiente)).toString() }
  
      return {}
  
    }

    if (nombreDeBoton === "Tan") {

      if (estado.siguiente) return { siguiente: (Math.tan(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.tan(estado.siguiente)).toString() }
  
      return {}
  
    }
    if (nombreDeBoton === "Log") {

      if (estado.siguiente) return { siguiente: (Math.log(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.log(estado.siguiente)).toString() }
  
      return {}
  
    }

    if (nombreDeBoton === "Exp") {

      if (estado.siguiente) return { siguiente: (Math.pow(estado.siguiente, 2)).toString() }
  
      if (estado.total) return { total: (Math.pow(estado.siguiente, 2)).toString() }
  
      return {}
  
    }
    if (nombreDeBoton === "Raiz") {

      if (estado.siguiente) return { siguiente: (Math.sqrt(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.sqrt(estado.siguiente)).toString() }
  
      return {}
  
    }

    if (nombreDeBoton === "Tru") {

      if (estado.siguiente) return { siguiente: (Math.trunc(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (Math.trunc(estado.siguiente)).toString() }
  
      return {}
  
    }


    
    if (nombreDeBoton === ".") {
  
      if (estado.siguiente) {
        
        if (estado.siguiente.includes(".")) return {}
  
        return { siguiente: estado.siguiente + "." }
      }
  
      return { siguiente: "0." }
  
    }
  
    if (nombreDeBoton === "=") {
  
      if (estado.siguiente && estado.operador) {
  
        return {
          total: operacion(estado.total, estado.siguiente, estado.operador),
          siguiente: null,
          operador: null,
        }
  
      } else return {}
  
    }
  
    if (nombreDeBoton === "+/-") {
  
      if (estado.siguiente) return { siguiente: (-1 * parseFloat(estado.siguiente)).toString() }
  
      if (estado.total) return { total: (-1 * parseFloat(estado.total)).toString() }
  
      return {}
  
    }
  
    if (estado.operador) {
  
      return {
        total: operacion(estado.total, estado.siguiente, estado.operador),
        siguiente: null,
        operador: nombreDeBoton,
      }
  
    }
  
    if (!estado.siguiente) return { operador: nombreDeBoton }
    
    return {
      total: estado.siguiente,
      siguiente: null,
      operador: nombreDeBoton,
    }
  
  }