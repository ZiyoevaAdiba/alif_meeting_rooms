import { errorType } from "./interfaces";

export const axiosErrorCatch = () => {
  return {
    type: errorType.OPEN_DIALOG,
    payload: {}
  }
}
