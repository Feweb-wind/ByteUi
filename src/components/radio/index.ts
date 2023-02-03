import ByteRadio from "./src/radio.vue";
import RadioGroup from "./src/radio-group.vue";
import RadioButton from "./src/radio-button.vue";
import { withNoopInstall } from "@byte-ui/utils";

export default ByteRadio;
export const ByteRadioGroup = withNoopInstall(RadioGroup);
export const ByteRadioButton = withNoopInstall(RadioButton);

export * from "./src/radio";
export * from "./src/radio-group";
export * from "./src/radio-group.vue";
