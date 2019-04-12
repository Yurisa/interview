import React, { Component } from 'react';
import basicMiddlewares  from './middlewares'

class Component1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      isVisible: true
    }

    this.applyMiddlewares(basicMiddlewares);

    this.init();
  }

  applyMiddlewares(mdws) {
    const middlewares = [].concat(mdws.reverse())
    let dispatchAction = this.dispatchAction.bind(this);
    middlewares.forEach(mdw => {
      mdw && (this.dispatchAction = dispatchAction = ((dispatch, fn) => (action) => fn.bind(this)(action, dispatch))(dispatchAction, mdw))
    });
  }

  dispatchAction(action) {
    let props = this.props;
    let reducers = [props.reducer];

    let runReducer = (preState) => {
      return reducers.reduce((previous, current) => {
        return typeof current === 'function' && (current(props, previous, action) || previous)
      }, {...preState, action: action.type})
    }
    if (action.type === 'init') {
      this.state = runReducer(this.state);
      return action;
    }

    this.setState(runReducer, () => {
      this.dispatchEvent(action.type,  {...action.payload, action: action.type}, {...this.state})
    })

    return action;
  }

    /**
   * 触发事件
   * @method dispatchEvent
   * @param {String} name 事件名称
   * @param {Array} payloads 回调对象（多个）
   */
  dispatchEvent(name, ...payloads) {
    let props = this.props;
    let eventName = 'on' + name;
    let _eventName = '_' + eventName;
    let eventHandler = props[eventName];
    let _eventHandler = props[_eventName];
    let __eventHandler = this[_eventName];

    __eventHandler && __eventHandler.apply(this, payloads);
    _eventHandler && _eventHandler.apply(this, payloads);
    eventHandler && eventHandler.apply(this, payloads);
  }


  init() {
    this.dispatchAction({
      type: 'init',
      payload: {
        name: 'yellow'
      }
    })
  }

  _onClick = () => {
    const action = {type: 'select', payload: {event: 'click'}};
    this.dispatchAction(action)
  }

  render() {
    return (
      <div onClick={this._onClick}>123</div>
    )
  }
}

export default Component1;