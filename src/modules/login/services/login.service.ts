import cookieCutter from '@boiseitguru/cookie-cutter'
import CustomFetch from "../../customFetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/users"

const loginSrv = async (ctx: any, phone: string, code: number, name: string) => {
  const path = BASE_URL + "/login"
  try {
    debugger
    const data = await post(ctx, path, { code, phone, name });
    const { token, uid } = data.data
    cookieCutter.set('X-Auth-Token', token)
    cookieCutter.set('User-ID', uid)
    return data
  }
  catch (err) {
    return {
      data: null,
      status: 400,
      message: "Error al iniciar sesión",
    }
  }
}

export {
  loginSrv
}
