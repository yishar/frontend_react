import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AnimalForm from './components/forms/AnimalForm.js';
import NavBar from './components/layouts/NavBar.js';

const url_api = 'http://localhost/api/animales/';

class App extends Component {


  constructor(){
    super();
    this.state = {
      done: false,
      animales: []
    };
    this.addNewAnimal = this.addNewAnimal.bind(this);
    this.editAnimal = this.editAnimal.bind(this);

  }

 /**
 * Esta funcion es usada para obtener todos los registros
 */
  componentDidMount() {
     fetch(url_api)
        .then((result) => {return result.json()})
        .then(
            (animales) => {
                this.setState({
                  done: true,
                  animales
                });
            }
        )
        .catch((error) => {
            // Retornar algún error ocurrido
            console.log(error.message);
        });
  }

  /**
   * Esta funcion es usada para crear u nuevo registro de animal.
   * Param @animal
  */
  addNewAnimal(animal) {
      fetch(url_api, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                nombre: animal.nombre,
                tipo: animal.tipo,
                edad: animal.edad
            })
          })
          .then((result) => {return result.json()})
          .then(
              animal => {
                  // Mostrar un mensaje al cliente
                  if (animal.message){
                      (document).getElementById('alerts-id').innerText = 'El animal no pudo ser registrado.';
                  }else{
                      this.componentDidMount();
                      (document).getElementById('alerts-id').innerText = 'El animal ' + animal.nombre + ' ha sido registrado.';
                  }

                  window.setTimeout(function () {
                      (document).getElementById('alerts-id').innerText = '';
                  }, 3000);
              }
          )
          .catch((error) => {
              // Retornar algún error ocurrido
              console.log(error.message);
          });
  }

    /**
     * Esta funcion es usada para actualizar un registro de animal.
     * Param @animal
     */
    editAnimal(animal) {
        fetch(url_api + animal.id, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: animal.id,
                nombre: animal.nombre,
                tipo: animal.tipo,
                edad: animal.edad
            })
        })
            .then((result) => {return result.json()})
            .then(
                animal => {
                    // Mostrar un mensaje al cliente
                    if (animal.message){
                        (document).getElementById('alerts-id').innerText = animal.message;
                    }
                    window.setTimeout(function () {
                        (document).getElementById('alerts-id').innerText = '';
                    }, 3000);
                    this.componentDidMount();

                    document.getElementById('animal-nombre').value = '';
                    document.getElementById('animal-tipo').value = '';
                    document.getElementById('animal-edad').value = '';
                }
            )
            .catch((error) => {
                // Retornar algún error ocurrido
                console.log(error.message);
            });
    }

    /**
     * Esta funcion es usada para seleccionar un registro de animal
     * Para su posterior actualizacion.
     * Param @id
     */
    getAnimal(id) {
        fetch(url_api + id, { method: "GET" })
            .then((result) => {return result.json()})
            .then(
                animal => {
                    // Mostrar un mensaje al cliente
                    if (animal.message){
                        (document).getElementById('alerts-id').innerText = animal.message;
                    }else{
                        // Carga datos en el formulario
                        document.getElementById('animal-id').value = animal.id;
                        document.getElementById('animal-nombre').value = animal.nombre;
                        document.getElementById('animal-tipo').value = animal.tipo;
                        document.getElementById('animal-edad').value = animal.edad;
                    }
                }
            )
            .catch((error) => {
                // Retornar algún error ocurrido
                console.log(error.message);
            });
    }

  /**
   * Esta funcion es usada para eliminar un registro de animal
   * Si el id es encontrado entonces el registro correspondiente no aparecerá más.
   * Param @id
  */
  removeAnimal(id) {
      fetch(url_api + id, { method: "DELETE" })
          .then((result) => {return result.json()})
          .then(
              (animales) => {
                  // Mostrar un mensaje al cliente
                  (document).getElementById('alerts-id').innerText = animales.message;
                  window.setTimeout(function () {
                      (document).getElementById('alerts-id').innerText = '';
                  }, 4000);
                  this.componentDidMount();
              }
          )
          .catch((error) => {
              // Retornar algún error ocurrido
              console.log(error.message);
          });
  }

  render() {
    const existingAnimal = this.state.animales.map((animal, index) => {
      return (
        <tr>
          <th scope="row">{index+1}</th>
          <th>{animal.id}</th>
          <td>{animal.nombre}</td>
          <td>{animal.tipo}</td>
          <td>{animal.edad}</td>
          <td>{animal.createdAt}</td>
          <td>{animal.updatedAt}</td>
          <td>
              <button type="button" className="btn" onClick={this.getAnimal.bind(this, animal.id)} title="Editar">
                  <i className="fas fa-edit" aria-hidden="true"></i>
              </button>
              <button type="button" className="btn" onClick={this.removeAnimal.bind(this, animal.id)} title="Eliminar">
                  <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
          </td>
        </tr>
      )
    });

    return (
      <div className="App">
          {/* Top NavBar */}
          <NavBar />

          <div className="container">
            <div className="row mt-8">
              {/* Formulario de registro de animales */}
              <div className="col-md-12">
                {/* Imagen */}
                <img src={logo} className="App-logo" alt="logo" />

                <AnimalForm  onAddAnimal={this.addNewAnimal} onEditAnimal={this.editAnimal}/>
              </div>
              {/* Tabla para mostrar Animales */}
              <div className="col-md-12">
                  <div id="alerts-id" className="margin-top-5p"></div>
                <table className="table table-hover margin-top-5p">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Edad</th>
                      <th scope="col">Fecha de Creado</th>
                      <th scope="col">Fecha de Actuaizado</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {existingAnimal}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <br/>

      </div>
    );
  }
}

export default App;
