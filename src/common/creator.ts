async function async_dispatch(
  dispatch: any,
  type: any,
  func: any,
  ...args: any
) {
  dispatch({ type: type + "_LOADING", args: args });
  let result = await func(...args);

  try {
    if (result.success) {
      return dispatch({ type, payload: result });
    } else if (result.payload) {
      return dispatch({ type, payload: result.payload });
    } else {
      return dispatch({
        type: type + "_ERROR",
        payload: { msg: result.errorMessage },
      });
    }
  } catch (err) {
    return dispatch({ type, payload: { msg: "Error " + type } });
  }
}

export default function actions(msg: any, func: any) {
  return function (...args: any) {
    return async function (dispatch: any) {
      await async_dispatch(dispatch, msg, func, ...args);
    };
  };
}
