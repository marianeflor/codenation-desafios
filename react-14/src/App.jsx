import React from 'react';
import './App.scss';

import Topbar from './components/Topbar';
import Filters from './components/Filters';
import Contacts from './components/Contacts';

import './App.scss';

class App extends React.Component {
  constructor(props) {
		super(props);
	 
		this.state = {
      items: [],	
      isSelected: '',
			textFilter: ''	
		};
	}
	 
	componentDidMount() {
		fetch('https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts')
		  .then(response => response.json())
		  .then(items => this.setState({ items }));
  }

  filter = () => {
    const textFilter = this.state.textFilter;
    const isSelected = this.state.isSelected === '' ? 'name' : this.state.isSelected;
    let itemsFiltered = [];
  
    if(textFilter === ''){
      itemsFiltered = this.state.items.sort((a,b) => a[isSelected] > b[isSelected]);
    } else {
      itemsFiltered = this.state.items.filter(item => item[isSelected].toLowerCase().startsWith(textFilter.toLowerCase()))
                        .sort((a,b) => a[isSelected] > b[isSelected]);
    }
    
    this.setState({
			items: itemsFiltered
    })
  }

  handleClick = (buttonName) => {
		this.setState({
			isSelected: this.state.isSelected !== buttonName ? buttonName : ''
		}, () => this.filter())
	}
	
	handleChange = e => {
		this.setState({
			textFilter: e.target.value
    }, () => this.filter())   
  }
  
  render() {
    const itemsFiltered = this.state.items
    return (
      <div data-testid='app' className='app'>
        
        <Topbar/>

        <Filters isSelected={this.state.isSelected} handleClick={this.handleClick} handleChange={this.handleChange}/>

        <Contacts data={itemsFiltered} />

      </div>
    )
  }
}

export default App;
