import React from "react";
import PropTypes from 'prop-types'
import Context from "./Context";

// в основе Provider лежит React context api -
// создание контеста можно вынести в отдельный файл
// на базе React.context.provider можно переписать Provider так
// экспортируем компонент Provider - при вызове ему передадим проп store и.
// в Provider обернем другой компонент - он попадет в проп - children
// вернем компонент из children, обернутый в Context.Provider,
//тем самым передадим контекст дерево компонентов, привезав его к контексту.
class Provider extends React.Component {

  render() {
    // console.log('this props: ', this.props.children)
    const { children, store } = this.props

    return <Context.Provider value={store}> { children } </Context.Provider>
  }
}

export default Provider