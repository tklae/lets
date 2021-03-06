import * as tabtab from "tabtab";
import {CommandLibrary} from "./commandLibrary";

const internalCommands = ["help", "add-tab-completion", "remove-tab-completion"];

export async function handleTabCompletion(userInput: string, commandLibrary: CommandLibrary): Promise<void> {
  const env = tabtab.parseEnv(process.env);

  if (env.complete === true) {
    if (env.words < 2) {
      tabtab.log(internalCommands.concat(commandLibrary.getAllCommandNames()));
    }
    process.exit(0);
  }

  if (userInput === "add-tab-completion") {
    await tabtab.install({
      name: "lets",
      completer: "lets"
    }).catch((err) => console.error(err));
    process.exit(0);
  }

  if (userInput === "remove-tab-completion") {
    await tabtab.uninstall({
      name: "lets"
    }).catch((err) => console.error(err));
    process.exit(0);
  }
}
