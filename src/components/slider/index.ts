import {withInstall, withNoopInstall} from "@byte-ui/utils";
import Slider from './src/slider.vue';
import SliderButton from './src/slider-button.vue';

export const ByteSlider = withInstall(Slider, {SliderButton});
export const ByteSliderButton = withNoopInstall(SliderButton);

export default ByteSlider;