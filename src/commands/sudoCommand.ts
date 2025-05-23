
import { CommandResult } from "@/types/terminal";
import { getCommandState, setSudoMode } from "./commandState";
import { processCommand } from "./commandProcessor";

export const sudoCommand = (args: string[]): CommandResult => {
  // If no command is provided after sudo
  if (args.length === 0) {
    return {
      output: ["sudo: a command is required"],
      error: true
    };
  }
  
  // Simulate password check (in a real app, this would be a secure process)
  const { sudoMode } = getCommandState();
  if (!sudoMode) {
    setSudoMode(true);
    return {
      output: ["[sudo] password for user: ", "Password accepted", "You now have sudo privileges."],
    };
  }
  
  // Execute the command with sudo privileges
  const sudoCommand = args.join(" ");
  const result = processCommand(sudoCommand);
  
  // Add sudo prefix to indicate elevated privileges
  return {
    output: ["Running with sudo privileges:"].concat(result.output),
    error: result.error
  };
};
