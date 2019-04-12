
export function middleware1(action, next) {
  console.log('中间件1');
  if (action.type === 'action1') {
    console.log('action1');
    next(action);
  } else {
    next(action);
  }
}

export function middleware2(action, next) {
  console.log('中间件2');
  if (action.type !== 'init') {
    console.log('action2');
    window.console && console.info && console.info(action);
    next(action);
    this.setState(function(preState) {
      window.console && console.info && console.info({
        ...preState,
        action: action.type
      });
    });
  } else {
    next(action);
  }
}

export default [
  middleware1,
  middleware2
];