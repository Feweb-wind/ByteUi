import { withInstallFunction } from "@/utils";
import Message from "./src/method";

const ByteMessage = withInstallFunction(Message, "$message");

export default ByteMessage;
