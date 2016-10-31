import api from '../api/index'
import * as types from './mutation-types'

export const getInTheaters = (ctx, opts) => {
  api.getInTheaters().then((res) => {
    ctx.commit('GET_IN_THEATERS', types.GET_IN_THEATERS)
  })
}
