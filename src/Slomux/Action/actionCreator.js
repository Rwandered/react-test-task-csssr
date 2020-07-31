// action creators
import {CHANGE_INTERVAL} from "./actionTypes";

export const changeInterval = (value) => {
   return {
    type: CHANGE_INTERVAL,
    payload: value,
  }
}