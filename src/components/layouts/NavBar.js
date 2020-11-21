import React, {Component} from 'react';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      animales: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/animales/")
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
          console.log(error.message);

        });
  }

  render(){
    return(
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Zoológico AC
            </a>
          </li>
        </ul>
    );
  }
}

export default NavBar;
