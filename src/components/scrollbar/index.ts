import {withInstall, withNoopInstall} from "@byte-ui/utils";
import Scrollbar from './src/scrollbar.vue';
import Bar from './src/bar.vue';
import Thumb from './src/thumb.vue';

export const ByteScrollbar = withInstall(Scrollbar, {Bar, Thumb});
export const ByteScrollBar = withNoopInstall(Bar);
// export const ByteSliderButton = withNoopInstall(Thumb);

export default ByteScrollbar;