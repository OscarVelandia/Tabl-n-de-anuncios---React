import React, {Component} from 'react'
//Con esto importo el componente de iconos instalado con NPM
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FAFloppyO from 'react-icons/lib/fa/floppy-o'

class Nota extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.randomBetween = this.randomBetween.bind(this)
    }
    
    //Con los 'props' se pasa la información de 'componente padre' a 'componente hijo'
                    
    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg') })`
        }
    }
    
                //'s' es la unidad de medida
    randomBetween(x, y, s){
        return x + Math.ceil(Math.random() * (y - x)) + s
    }

    componentDidUpdate(){
        var textArea

        if(this.state.editing){
            textArea = this._textoAgregado
            textArea.focus()
            textArea.select()
        }
    }

    shouldComponenUpdate(nextProps, nextState) {
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
    }

    edit() {
		this.setState({
			editing: true
		})
	}

    remove() {
		this.props.onRemove(this.props.index)
	}

    save(e) {
		e.preventDefault()
        //Variables that start with an underscore generally refer to private properties and methods

                //el 'value' al que hace referencia es al ingresado en el input referenciado con el REF al this.
        this.props.onChange(this._textoAgregado.value, this.props.index)
        this.setState({
			editing: false
		})
        
        // //El texto de entrada fué referenciado con el REF al this. y por esto se puede obtener este texto.
        // alert(this._textoAgregado.value)
    }

    renderForm(){
        return (
            <div className="note" style={this.style}>
                    {/*Con on submit se activa el metodo save.*/}
                <form onSubmit={this.save}>
                     {/*The REF attribute makes possible to reference a DOM node in order to access it and to interact with it. */}
                    <textarea ref={input => this._textoAgregado = input} defaultValue={this.props.children} />
                    <button id="save"><FAFloppyO /></button>
                </form>
            </div>
        )
    }
    
    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                {/*Esto hace referencia al componente padre, de forma dinámica renderizará las notas, */}
                <p>{this.props.children}</p>
                <form>
                    <button onClick={this.edit} id="edit"><FaPencil /></button>
                    <button onClick={this.remove} id="remove"><FaTrash /></button>
                </form>
            </div>
        )
    }
    // Este método manejará toda la lógica
    render() {
        //Si se da click en editar renderiza el form, si no la nota que está en renderDisplay()
		return this.state.editing ? this.renderForm() : this.renderDisplay()
    }
}

export default Nota