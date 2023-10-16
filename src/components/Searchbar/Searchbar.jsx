import { Component } from 'react';

import css from './Searchbar.module.css';


export class Searchbar extends Component {
  state = {
name: ''
  }

  handlChange = (input) =>{
    this.setState({
      [input.name]: ''
    });
    
    this.setState({
      [input.name]: input.value
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmitSearchbar(this.state.name);
    }
 
  render(){
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={this.handlerSubmit} >
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}></span>
        </button>

        <input
          name = 'name'
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value = {this.state.name}
          onChange={(e)=>this.handlChange(e.target)}
        />
      </form>
    </header>
  );}
};
