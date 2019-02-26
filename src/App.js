import React, { Component } from 'react';
import GameRules from './Components/Presentational/GameRules.js';
import Table from './Components/Table.js';
import ButtonsContainer from './Components/ButtonsContainer.js';
import ChipsContainer from './Components/ChipsContainer.js';
import RootReducer from './Reducers/RootReducer.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore(RootReducer);


class App extends Component{  

  componentDidMount(){
    const tooltip = document.getElementById('tooltip');
    
    const tooltipText = document.getElementById('tooltipText');
    tooltipText.style.visibility ='hidden';

    tooltip.addEventListener('click', (event)=>{
      event.stopPropagation();

      if(tooltipText.style.visibility === 'hidden'){
        tooltipText.style.visibility = 'visible';
      }else{
        tooltipText.style.visibility = 'hidden';
      }
    })
  }

  render(){
    return(
      <Provider store={store}>
        <GameRules/> {/* - tooltip text*/}
        
        <div className = 'tableContainer'>
          <Table/>
        </div> 

        <div className = 'wood'>
          <ButtonsContainer/>
          <ChipsContainer/>
        </div>      

        <div className = 'carpet'>

        </div>
      </Provider>
    )
  }
}

export default App;