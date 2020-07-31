import React from "react";
import Context from "./Context";


const connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  class Connect extends React.Component {
    store = this.context

    // подписываемся на события изменения стора
    componentDidMount() {
      this.subscribe = this.store.subscribe(this.handleChange)
    }

    //удаляем подписку на изменение стора
    componentWillUnmount() {
      this.subscribe && this.subscribe()
    }

    handleChange = () => this.forceUpdate()

    render() {
      // проверим, чтобы  mapStateToProps и mapDispatchToProps
      // были функциями, если нет, что сделаем их функциями
      typeof mapStateToProps !== 'function' && (mapStateToProps = () => {})
      typeof mapDispatchToProps !== 'function' && (mapDispatchToProps = () => {})

      return (
        <Component
          {...mapStateToProps(this.store.getState(), this.props)}
          {...mapDispatchToProps(this.store.dispatch, this.props)}
          ы{...this.props}
        />
      );
    }
  }

  // не забудем привязать в connect, созданный контекст
  Connect.contextType = Context;

  return Connect;
}

export default connect