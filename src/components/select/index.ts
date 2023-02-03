import {withInstall, withNoopInstall} from "@byte-ui/utils";
import Select from "./src/select.vue";
import Option from "./src/option.vue";
import OptionGroup from "./src/option-group.vue";
export const ByteSelect = withInstall(Select, {Option, OptionGroup});

export default ByteSelect;
export const ByteOption = withNoopInstall(Option)
export const ByteOptionGroup = withNoopInstall(OptionGroup)