
import { CommandResult } from "@/types/terminal";
import { getCommandState, setSudoMode } from "./commandState";
import { 
  helpCommand, 
  echoCommand, 
  lsCommand, 
  catCommand,
  cdCommand,
  pwdCommand, 
  dateCommand, 
  whoamiCommand,
  touchCommand,
  mkdirCommand,
  rmCommand,
  cpCommand,
  mvCommand,
  grepCommand,
  exitCommand 
} from "./basicCommands";
import { matrixCommand, cowsayCommand, neofetchCommand, blackirisCommand } from "./advancedCommands";
import { sudoCommand } from "./sudoCommand";

// Mock command processor - this would connect to a backend in a real application
export const processCommand = (command: string): CommandResult => {
  const cmd = command.trim();
  const parts = cmd.split(" ");
  const commandName = parts[0].toLowerCase();
  
  // Check if this is a sudo command
  if (commandName === "sudo") {
    return sudoCommand(parts.slice(1));
  }
  
  // Basic command handling
  switch (commandName) {
    case "help":
      return helpCommand();
    
    case "clear":
      // The clear command is handled by the hook
      return { output: [] };
    
    case "echo":
      return echoCommand(parts.slice(1));
    
    case "ls":
      return lsCommand(parts.slice(1));
    
    case "cat":
      return catCommand(parts.slice(1));
      
    case "cd":
      return cdCommand(parts.slice(1));
    
    case "pwd":
      return pwdCommand();
    
    case "date":
      return dateCommand();
    
    case "whoami":
      return whoamiCommand();
      
    case "touch":
      return touchCommand(parts.slice(1));
      
    case "mkdir":
      return mkdirCommand(parts.slice(1));
      
    case "rm":
      return rmCommand(parts.slice(1));
      
    case "cp":
      return cpCommand(parts.slice(1));
      
    case "mv":
      return mvCommand(parts.slice(1));
      
    case "grep":
      return grepCommand(parts.slice(1));
      
    case "history":
      // This will be handled by the component
      return { output: ["Command history will be displayed here"] };
    
    case "matrix":
      return matrixCommand();
    
    case "cowsay":
      return cowsayCommand(parts.slice(1));
    
    case "neofetch":
      return neofetchCommand();
    
    case "blackiris":
      return blackirisCommand();

    case "exit":
      const result = exitCommand();
      if (getCommandState().sudoMode) {
        setSudoMode(false);
      }
      return result;
      
    case "":
      return { output: [] };
    
    default:
      return {
        output: [`Command not found: ${parts[0]}`],
        error: true
      };
  }
};
