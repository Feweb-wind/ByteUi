import {withInstall} from "@byte-ui/utils";
import Button from "./src/button.vue";
import ButtonGroup from "./src/button-group.vue";
export const ByteButton = withInstall(Button);
export const ByteButtonGroup = withInstall(ButtonGroup);

export default ByteButton;
export * from "./src/button";