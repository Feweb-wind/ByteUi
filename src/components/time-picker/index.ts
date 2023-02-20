import TimePicker from './src/time-picker.vue'
import TimePickPanel from './src/time-panel.vue'
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils'

const _TimePicker = TimePicker as SFCWithInstall<typeof TimePicker>

_TimePicker.install = (app: App) => {
  app.component(_TimePicker.name, _TimePicker)
}
export { TimePickPanel }
export default _TimePicker
export const ByteTimePicker = _TimePicker
