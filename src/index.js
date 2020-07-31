import React from 'react';
import ReactDOM from 'react-dom';
import store from "./Slomux/Reducer/reducer";
import Provider from "./Slomux/Provider";
import TimerComponent from "./components/TimerComponent/TimerComponent";



// init
ReactDOM.render(
  <Provider store={ store }>
    <TimerComponent/>
  </Provider>,
  document.getElementById('root')
)
