import React, { Component } from 'react'
import api from './Api'

import { Redirect } from 'react-router-dom'

const statuscar = {
    'busy': 'Ocupado',
    'available': 'Disponível'
}

class EditCar extends Component {

  constructor(props){
    super(props)
    this.state = {
      brands: [],
      isLoading: false,
      redirect: false,
      cars: {}     
    }
    this.saveCar = this.saveCar.bind(this)
  }

  componentDidMount(){
    this.setState({ isLoading: true })
    api.loadCarsById(this.props.match.params.id)
      .then((res)=> {
        this.setState({ cars: res.data })
        this.refs.name.value = this.state.cars.name
        this.refs.brand.value = this.state.cars.brand
        this.refs.status.value = this.state.cars.status
        this.refs.valueday.value = this.state.cars.valueday
      })
    api.loadBrands()
      .then((res)=>{
        this.setState({
          isLoading: false,
          brands: res.data
        })
      }) 
    }

  saveCar(){
    const newCar = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      brand: this.refs.brand.value,
      status: this.refs.status.value,
      valueday: this.refs.valueday.value
    }
  api.updateCar(newCar)
    .then((res)=>{
      this.setState({
        redirect: '/cars/'+this.refs.brand.value
      })
    })
  }

  render(){
    return(
      <section id="intro" className="intro-section">
        <div className="container">
          <div className="col-lg-4"></div>
            <div className="row col-lg-4 col-md-12 col-sm-12">
            {
              this.state.redirect &&
              <Redirect to={this.state.redirect} /> 
            }
            <h1>Editar veículo</h1>
            <form>
              Nome:
              <input type="text" ref='name' className="form-control" /><br />
              Marca: 
              <select ref='brand'>
                { 
                  this.state.brands
                    .map( key => <option key={key} value={key}>{ key }</option>) 
                }
              </select><br />
              Disponibilidade: 
              <select ref='status'>
                { 
                  Object
                    .keys(statuscar)
                      .map( key => <option key={key} value={key}>{statuscar[key]}</option>) 
                }
              </select><br />
              Valor:
              <input ref='valueday' type="text" className="form-control" /><br />
              <button type="button" onClick={this.saveCar} >Atualizar</button>
            </form>
          </div>
        </div>            
      </section>
      )
  }
}

export default EditCar
