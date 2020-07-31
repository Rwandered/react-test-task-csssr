import React from "react";
import IntervalComponent from "../IntervalComponent/IntervalComponent";
import connect from "../../Slomux/Connect";

class TimerComponent extends React.PureComponent {

  state = {
    currentTime: 0
  }


  componentWillUnmount() {
    clearInterval(this.interval)
  }

  //методы handleStart handleStop перепишем через стрелочную функцию, так как использование обычной
  // будет приводить к потере контекста при вызове handleStop в render()
  // стрелочня функция получает контекст при объявлении - соответвенной сохранит при
  //вызове контекст классового компонента TimerComponent

  //в методе handleStart setTimeout заменим на setInterval - так как надо
  // изменять состояние через интервал.
  // так как новое состояние зависит от предыдущего в this.setState
  // передадим не объект, а функцию, которая принимает предыдущее состояние и
  // на его основании и модифицируем state

  // setInterval - в качестве второго аргумента принимается кол-во милисекунд, через
  // которые будет повторяться, поэтому переданные секунды в this.props.currentInterval
  // переведем в милисекунды, умножим на 1000
  handleStart = () => {
    const { currentInterval } = this.props
    console.log('currentInterval from handleStart: ', currentInterval)

    if (currentInterval > 0) {
      this.interval = setInterval( () => {
        this.setState( (state, props) => {
          return {
            currentTime: state.currentTime + props.currentInterval
          }
        })
      }, currentInterval * 1000)
    }
  }

// setInterval возвращает уникальный id - запишем его в this.interval
// и остановим интервал после нажатия на кнопку stop
  handleStop = () =>  {
    clearInterval(this.interval)
    this.setState({ currentTime: 0 } )
  }


  render() {

    const { currentTime } = this.state

    return (
      <div>
        <IntervalComponent/>
        <div>
          Секундомер: { currentTime } сек.
        </div>
        <div>
          <button onClick={ this.handleStart }>Старт</button>
          <button onClick={ this.handleStop }>Стоп</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentInterval: state.count
})


export default connect(mapStateToProps, null)(TimerComponent)