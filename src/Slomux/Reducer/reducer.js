// reducers
import {CHANGE_INTERVAL} from "../Action/actionTypes";
import createStore from "../Store/Store";

// в reducer не задано начальное состояние state
// зададаим значение initialState
// в case CHANGE_INTERVAL - меняется состояние state - reducer - должен быть чистой функцией
// и не должен менять состоянии. можно переписать так:
// return {
//   ...state,
//   count: state.count + action.payload
// } вернув новый объект, развернув в нем предыдущее состояние с помощью spread оператора
// значение switch default - возвращает пустой объект - лучше вернуть state иначе произойдет смена состояни на пустой
// объект и произойдет ререндер

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case CHANGE_INTERVAL:
      return {
        ...state,
        count: state.count + action.payload
      }
    default:
      return state
  }
}

// метод создания store импортируем сюда
const store = createStore(reducer, initialState)

export default store