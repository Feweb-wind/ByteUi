import { buildProp } from '@byte-ui/utils';

export const useSizeProp = buildProp({
    type: String,
    values: ['', 'default', 'small', 'large'],
    required: false,
} as const)