import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CreditCardInput from 'react-credit-card-input';
const countries = require('country-list')();
const paises = countries.getNames();

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tipo: '',
      nombreyapellido: '',
      email: '',
      pais: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
    }

  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isCompleteName', (value) => {
        if (value.indexOf(' ') === -1){
          return false;
        }
        return true;
      }
    );
  }

  handleClick = (e) =>  {
    e.preventDefault();
    
    fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(this.enviar)
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.handleSubmit();
			})
			.catch((error) => {
				console.log(error, 'catch the hoop');
			});
	};
  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(event) {
    alert('formulario enviado');
    event.preventDefault();
    
  }
  

  render() {
    const {tipo,nombreyapellido,email,pais,cardNumber,expiry,cvc}=this.state;
    // console.log(this.state.tipo);
    // console.log(this.state.nombre);
    // console.log(this.state.email);
    // console.log(this.state.pais);
    this.enviar = {
      tipo:tipo,
      nombreyapellido:nombreyapellido,
      email:email,
      pais:pais,
      cardNumber:cardNumber,
      expiry:expiry,
      cvc:cvc
    }

    
  
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Suscribirse aqui</h1>
        </header> */}
        <h1>Formulario de suscripción</h1>
        <div><h2>Seleccione el tipo de cuenta</h2></div>
        <div>
        <FormControl className="formControl">
          <InputLabel htmlFor="age-simple"><h3>Tipo</h3></InputLabel>
          <Select
            value={this.state.tipo}
            onChange={this.handleChange}
            input={<Input name= 'tipo'/>}
            
          >
            <MenuItem value="">
              <em>Seleccione tipo de cuenta</em>
            </MenuItem>
            <MenuItem value="premium"><h4>Premium</h4></MenuItem>
            <MenuItem value="free"><h5>Free</h5></MenuItem>
          </Select>
          <p></p>
        </FormControl>
        </div>
        <div><h6>Ingrese su pais</h6></div>
        <div>
        <FormControl className="formControl">
          <InputLabel htmlFor="age-simple">Pais</InputLabel>
          <Select
            value={this.state.pais}
            onChange={this.handleChange}
            input={<Input name = 'pais' id = 'age-simple'/>}
          >
          {paises.map((pais) => (<MenuItem value={pais}>{pais}</MenuItem>))}
            <MenuItem value="pais">
              <em>Seleccionar pais</em>
            </MenuItem>
          </Select>
        </FormControl>
        </div>
        <div>
          <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
                
            >
                <TextValidator
                    label="Ingrese nombre y apellido"
                    onChange={this.handleChange}
                    name="nombreyapellido"
                    value={nombreyapellido}
                    validators={['required', 'isCompleteName']}
                    errorMessages={['Este campo es requerido', 'Nombre y apellido no valido']}
                />
               
            </ValidatorForm>
        </div>
          <div>
            <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                    
                >
              <TextValidator
                  label="Ingrese email"
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={['Este campo es requerido', 'Email no valido']}
              />
               
            </ValidatorForm>
          </div>
       {tipo === "premium" &&
        <CreditCardInput
        
          cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
            <input
              {...props}
              onChange={handleCardCVCChange(e =>
                this.setState({ cvc: e.target.value })
                // console.log('cvc change', e)
            )}
            />
          )}
          cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
            <input
              {...props}
              onChange={handleCardExpiryChange(e =>
                this.setState({ expiry: e.target.value })
                // console.log('expiry change', e)
              )}
            />
          )}
          cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
            <input
              {...props}
              onChange={handleCardNumberChange(e =>
                this.setState({ cardNumber: e.target.value })
                // console.log('number change', e)
              )}
            />
          )}
        />
      }

      
        <p></p>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Enviar
        </Button>
        
        
        
        
      </div>
      
      
      
    );
  }
}

export default App;
