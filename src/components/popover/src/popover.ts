import { tooltipProps } from '@/components/tooltip'

export const popoverProps = {
  ...tooltipProps,
  effect: {
    type: String,
    values: ['dark', 'light'],
    default: 'light',
  },
  title: String,
  tabindex: Number,
}
