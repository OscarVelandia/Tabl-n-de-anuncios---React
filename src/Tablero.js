import React, {Component} from 'react'
//Con esto importo el componente NOTA (ahora hijo) y el componente TABLERO será un componente PADRE.
import Nota from './Nota'
import FaPlus from 'react-icons/lib/fa/plus'


class Tablero extends Component {
    constructor(props){
        super(props)
        this.state = {
            notas: []
        }
        this.add = this.add.bind(this)
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.generadorDeID = this.generadorDeID.bind(this)
    }


    componentWillMount(){
        var self = this
        if(this.props.count) {
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
                .then(response => response.json())
                .then(json => json[0]
                            .split('. ')
                            .forEach(sentence => self.add(sentence.substring(0,25))))
        }
    }

    add(texto) {
        this.setState(prevState => ({
            notas: [
                //Con el spread operator tomo todas las notas
                ...prevState.notas, 
                {
                    id: this.generadorDeID(),
                    nota: texto
                }
            ]
        }))
    }

    generadorDeID(){
        this.idUnico = this.idUnico || 0
        return this.idUnico++
    }

    update(textoAgregado, i){
        console.log('Item actualizado', i, textoAgregado)
        this.setState(prevState => ({
            notas: prevState.notas.map( //Con el MAP evaluo cada objeto del array que vendria a ser la memoria

    //Si el id de la nota es igual a i, renderizarla, si no, agrega la nota guardada en [textoAgregado] y sale del método,                 
                nota => (nota.id !== i) ? nota : {...nota, nota: textoAgregado} 
            )                         //'nota' es el id, y 'nota:' es la clave de la propiedad cuyo valor será lo que está en textoAgregado
        }))                           //Para agregar las notas de forma dinámica al principio del array se usa el spread operator  
    }

    remove(id){
        console.log('removiendo', id)
        this.setState(prevState => ({
            notas: prevState.notas.filter(nota => nota.id !== id)
        }))
    }               


    eachNote(nota, i) {
        return (
            <Nota key={nota.id} 
                index={nota.idi}
                    /*Con onChange se enlaza el input con el metodo update y renderiza la nota*/
                onChange={this.update}
                onRemove={this.remove}>
                {nota.nota}
            </Nota>
        )
    }

    render(){
        return (
            <div className="board">
            {/*Esto es usado para mostrar dinámicamente cada nota y se usa map para iterar el array de notas.*/}
                {this.state.notas.map(this.eachNote)}
                <button onClick={this.add.bind(null, 'Nueva Nota!')} id="add"><FaPlus /></button>
            </div>
        )
    }
}

export default Tablero