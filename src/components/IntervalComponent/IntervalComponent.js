import React from "react";
import { changeInterval } from "../../Slomux/Action/actionCreator";
import connect from "../../Slomux/Connect";


class IntervalComponent extends React.Component {

  render() {
    const {currentInterval, changeInterval } = this.props
    console.log('currentInterval: ', currentInterval)

    return (
      <div>

        <span>Интервал обновления секундомера: { currentInterval } сек.</span>
        <span>
          <button onClick={ () => changeInterval(-1) }>-</button>
          <button onClick={ () => changeInterval(1) }>+</button>
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentInterval: state.count
})

const mapDispatchToProps = (dispatch) => ({
  changeInterval: (value) => dispatch(changeInterval(value)),
})
// тут поменял порядок передачи аргументов в connect, connect - должен принимать сначала
// mapStateToProps, вторым - mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(IntervalComponent)