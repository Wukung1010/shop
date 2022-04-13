import { OrderState } from '../types'

export default function getStateTitle (state: OrderState) {
  if (state === OrderState.PRE_PAY) {
    return '待支付'
  } else if (state === OrderState.PRE_SEND) {
    return '待发货'
  } else if (state === OrderState.SENDED) {
    return '已发货'
  } else if (state === OrderState.DONE) {
    return '已完成'
  } else if (state === OrderState.PRE_CANNEL) {
    return '待退单'
  } else if (state === OrderState.CANNEL) {
    return '已退单'
  } else if (state === OrderState.DEL) {
    return '已删除'
  }
}