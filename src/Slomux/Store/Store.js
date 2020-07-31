class Store {

  constructor(reducer, initialState) {
    this.reducer = reducer
    this.currentState = initialState
    this.listeners = []
  }

  getState = () => this.currentState

  dispatch = action => {
    this.currentState = this.reducer(this.currentState, action)
    this.listeners.forEach(listener => listener() )
  }

  // также можно предусмотреть отписку от подписчика
  // чтобы исбежать возможной учетки памяти.
  subscribe = (listener) => {
    this.listeners.push(listener)
    return () => {
      this.listeners.splice( this.listeners.findIndex(listener), 1)
    }
  }
}

const createStore = (reducer, initialState) => {
  return new Store(reducer, initialState)
}

export default createStore