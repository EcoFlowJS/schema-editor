import { atomWithStorage } from "jotai/utils";

const isRestartingServer = atomWithStorage("serverStatusRestart", false);
const isClosedServer = atomWithStorage("serverStatusClose", false);

export { isClosedServer, isRestartingServer };
