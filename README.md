## Тестовое задание CSSSR
Slomux — упрощённая, сломанная реализация Flux.
Перед вами небольшое приложение, написанное на React + Slomux.
Это нерабочий секундомер с настройкой интервала обновления.

Исправьте ошибки и потенциально проблемный код, почините приложение и прокомментируйте своё решение.

При нажатии на "старт" должен запускаться секундомер и через заданный интервал времени увеличивать свое значение на значение интервала
При нажатии на "стоп" секундомер должен останавливаться и сбрасывать свое значение

```const createStore = (reducer, initialState) => {
  let currentState = initialState
  const listeners = []

  const getState = () => currentState
  const dispatch = action => {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = listener => listeners.push(listener)

  return { getState, dispatch, subscribe }
}

const connect = (mapStateToProps, mapDispatchToProps) =>
  Component => {
    class WrappedComponent extends React.Component {
      render() {
        return (
          <Component
            {...this.props}
            {...mapStateToProps(this.context.store.getState(), this.props)}
            {...mapDispatchToProps(this.context.store.dispatch, this.props)}
          />
        )
      }

  componentDidUpdate() {
    this.context.store.subscribe(this.handleChange)
  }

  handleChange = () => {
    this.forceUpdate()
  }
}

WrappedComponent.contextTypes = {
  store: PropTypes.object,
}

return WrappedComponent
  }

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    }
  }
  
  render() {
    return React.Children.only(this.props.children)
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
}

// APP

// actions
const CHANGE_INTERVAL = 'CHANGE_INTERVAL'

// action creators
const changeInterval = value => ({
  type: CHANGE_INTERVAL,
  payload: value,
})


// reducers
const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_INTERVAL:
      return state += action.payload
    default:
      return {}
  }
}

// components

class IntervalComponent extends React.Component {
  render() {
    return (
      <div>
        <span>Интервал обновления секундомера: {this.props.currentInterval} сек.</span>
        <span>
          <button onClick={() => this.props.changeInterval(-1)}>-</button>
          <button onClick={() => this.props.changeInterval(1)}>+</button>
        </span>
      </div>
    )
  }
}

const Interval = connect(dispatch => ({
  changeInterval: value => dispatch(changeInterval(value)),
}),
state => ({
  currentInterval: state,
}))(IntervalComponent)

class TimerComponent extends React.Component {
  state = {
    currentTime: 0
  }

  render() {
    return (
      <div>
        <Interval />
        <div>
          Секундомер: {this.state.currentTime} сек.
        </div>
        <div>
          <button onClick={this.handleStart}>Старт</button>
          <button onClick={this.handleStop}>Стоп</button>
        </div>
      </div>
    )
  }

  handleStart() {
    setTimeout(() => this.setState({
      currentTime: this.state.currentTime + this.props.currentInterval,
    }), this.props.currentInterval)
  }
  
  handleStop() {
    this.setState({ currentTime: 0 })
  }
}

const Timer = connect(state => ({
  currentInterval: state,
}), () => {})(TimerComponent)

// init
ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <Timer />
  </Provider>,
  document.getElementById('app')
)
```

### Ссылка на песочницу
https://codesandbox.io/s/clever-ritchie-1xm7t
### Комментарии
1) в reducer не задано начальное состояние state
2) в case CHANGE_INTERVAL - меняется состояние state - reducer - должен быть чистой функцией
и не должен менять состоянии. можно переписать так:
`return {
  ...state,
  count: state.count + action.payload
}`
вернув новый объект, развернув в нем предыдущее состояние с помощью spread оператора
3) значение switch default - возвращает пустой объект - лучше вернуть state иначе произойдет смена состояния на пустой объект и произойдет ререндер всех компонентов, которые на него подписаны
4)  
5) Не создан контекст для провайдера
6) В компоненте Interval в HOC connect аргументы передаются в другом порядке
7) В компоненты Timer в методе handleStart используется setTimeout вместо setInterval
8) setInterval - в качестве второго аргумента принимает кол-во милисекунд, через которые будет повторяться, поэтому переданные секунды в this.props.currentInterval переведем в милисекунды, умножив на 1000
9) В методе handleStart в метод setState передается объект, так как новое состояние зависит от предыдущего в this.setState
  нужно передать не объект, а функцию, которая принимает предыдущее состояние и на его основании и модифицируем state
10) В методе handleStop необходимо выполнить остановку setInterval
