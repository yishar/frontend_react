import React, {Component} from 'react';

class AnimalForm extends Component {
  constructor(){
    super();
    this.state = {
          nombre: '',
          tipo: '',
          edad: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emptyInput = this.emptyInput.bind(this);
  }

  handleInput(e){
    const {value, name} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    e.preventDefault();

    var id = document.getElementById('animal-id').value;
    var nombre = document.getElementById('animal-nombre').value;
    var tipo = document.getElementById('animal-tipo').value;
    var edad = document.getElementById('animal-edad').value;

    if (id != ""){
        console.log('id: ' + id);
        console.log('Nombre: ' + document.getElementById('animal-nombre').value);
        this.props.onEditAnimal({
            id: id,
            nombre: nombre,
            tipo: tipo,
            edad: edad
        });
    }else{
        this.props.onAddAnimal({
            nombre: nombre,
            tipo: tipo,
            edad: edad
        });
    }
  }

  emptyInput(e){
      document.getElementById('animal-id').value = null;
      document.getElementById('animal-nombre').value = null;
      document.getElementById('animal-tipo').value = null;
      document.getElementById('animal-edad').value = null;
  }

  render(){
    return(
      <div className="card">
        <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input
                    id="animal-id"
                    type="hidden"
                    name="id"
                    className="form-control"
                    value={null}
                />
            </div>
            <div className="form-group">
              <input
                id="animal-nombre"
                required = {true}
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre del Animal"
                //onChange={this.handleInput}
                value={null}
              />
            </div>
            <div className="form-group">
              <input
                id="animal-tipo"
                type="text"
                name="tipo"
                className="form-control"
                placeholder="Tipo de Animal"
                //onChange={this.handleInput}
                value={null}
              />
            </div>
            <div className="form-group">
              <select id="animal-edad" name="edad" className="form-control" /*onChange={this.handleInput}*/>
                <option selected>Select Edad</option>
                <option value="0 a 1">0 a 1 Año</option>
                <option value="1 a 3">1 a 3 Años</option>
                <option value="3 a 5">3 a 5 Años</option>
                <option value="5 o mas">5 o más Años</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-dark">Guardar</button>
              <button type="button" className="btn btn-warning separe-buttons-5px" onClick={this.emptyInput.bind(this)}>Cancelar</button>
            </div>
        </form>
      </div>
    );
  }
}

export default AnimalForm;
