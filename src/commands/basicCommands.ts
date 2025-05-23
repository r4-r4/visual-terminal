
import { CommandResult } from "@/types/terminal";
import { getCommandState } from "./commandState";
import { getCurrentPath, getEntryByPath, normalizePath, resolvePath, setCurrentPath } from "./fileSystem";

export const helpCommand = (): CommandResult => {
  return {
    output: [
      "Available commands:",
      "  help       - Show this help menu",
      "  clear      - Clear the terminal",
      "  echo       - Echo a message back",
      "  ls         - List directory contents",
      "  cat        - Display file contents",
      "  cd         - Change directory",
      "  pwd        - Print working directory",
      "  date       - Display the current date and time",
      "  whoami     - Display current user",
      "  touch      - Create an empty file",
      "  mkdir      - Create a directory",
      "  rm         - Remove files or directories",
      "  cp         - Copy files or directories",
      "  mv         - Move/rename files or directories",
      "  grep       - Search for patterns in files",
      "  history    - Show command history",
      "  neofetch   - Display system information",
      "  matrix     - Display matrix animation",
      "  cowsay     - Display a cow saying your message",
      "  sudo       - Execute command as superuser",
      "  exit       - Exit sudo mode"
    ]
  };
};

export const echoCommand = (args: string[]): CommandResult => {
  return {
    output: [args.join(" ")]
  };
};

export const lsCommand = (args: string[] = []): CommandResult => {
  const path = args.length > 0 ? args[0] : getCurrentPath();
  const entry = getEntryByPath(path);
  
  if (!entry) {
    return {
      output: [`ls: cannot access '${path}': No such file or directory`],
      error: true
    };
  }
  
  if (entry.type === 'file') {
    return {
      output: [entry.name]
    };
  }
  
  // List directory contents
  if (!entry.children || entry.children.length === 0) {
    return {
      output: []
    };
  }
  
  const files = entry.children.map(child => {
    if (child.type === 'directory') {
      return child.name + '/';
    }
    return child.name;
  }).sort();
  
  return {
    output: files
  };
};

export const catCommand = (args: string[]): CommandResult => {
  if (args.length === 0) {
    return {
      output: ["cat: missing file operand"],
      error: true
    };
  }
  
  const filePath = args[0];
  const entry = getEntryByPath(filePath);
  
  if (!entry) {
    return {
      output: [`cat: ${filePath}: No such file or directory`],
      error: true
    };
  }
  
  if (entry.type === 'directory') {
    return {
      output: [`cat: ${filePath}: Is a directory`],
      error: true
    };
  }
  
  // Split content by newlines to output each line separately
  return {
    output: entry.content ? entry.content.split('\n') : []
  };
};

export const cdCommand = (args: string[]): CommandResult => {
  const newPath = args.length > 0 ? args[0] : '/home/user';
  const resolvedPath = resolvePath(newPath);
  const entry = getEntryByPath(resolvedPath);
  
  if (!entry) {
    return {
      output: [`cd: ${newPath}: No such file or directory`],
      error: true
    };
  }
  
  if (entry.type === 'file') {
    return {
      output: [`cd: ${newPath}: Not a directory`],
      error: true
    };
  }
  
  setCurrentPath(resolvedPath);
  return {
    output: []
  };
};

export const pwdCommand = (): CommandResult => {
  return {
    output: [getCurrentPath()]
  };
};

export const dateCommand = (): CommandResult => {
  return {
    output: [new Date().toString()]
  };
};

export const whoamiCommand = (): CommandResult => {
  const { sudoMode } = getCommandState();
  return {
    output: [sudoMode ? "root" : "user"]
  };
};

export const touchCommand = (args: string[]): CommandResult => {
  if (args.length === 0) {
    return {
      output: ["touch: missing file operand"],
      error: true
    };
  }
  
  // In a real implementation, this would create the file
  return {
    output: [`Created file: ${args[0]}`]
  };
};

export const mkdirCommand = (args: string[]): CommandResult => {
  if (args.length === 0) {
    return {
      output: ["mkdir: missing operand"],
      error: true
    };
  }
  
  // In a real implementation, this would create the directory
  return {
    output: [`Created directory: ${args[0]}`]
  };
};

export const rmCommand = (args: string[]): CommandResult => {
  if (args.length === 0) {
    return {
      output: ["rm: missing operand"],
      error: true
    };
  }
  
  // In a real implementation, this would remove the file or directory
  return {
    output: [`Removed: ${args[0]}`]
  };
};

export const cpCommand = (args: string[]): CommandResult => {
  if (args.length < 2) {
    return {
      output: ["cp: missing file operand"],
      error: true
    };
  }
  
  // In a real implementation, this would copy files
  return {
    output: [`Copied ${args[0]} to ${args[1]}`]
  };
};

export const mvCommand = (args: string[]): CommandResult => {
  if (args.length < 2) {
    return {
      output: ["mv: missing file operand"],
      error: true
    };
  }
  
  // In a real implementation, this would move or rename files
  return {
    output: [`Moved ${args[0]} to ${args[1]}`]
  };
};

export const grepCommand = (args: string[]): CommandResult => {
  if (args.length < 2) {
    return {
      output: ["Usage: grep PATTERN FILE"],
      error: true
    };
  }
  
  const pattern = args[0];
  const filePath = args[1];
  const entry = getEntryByPath(filePath);
  
  if (!entry) {
    return {
      output: [`grep: ${filePath}: No such file or directory`],
      error: true
    };
  }
  
  if (entry.type === 'directory') {
    return {
      output: [`grep: ${filePath}: Is a directory`],
      error: true
    };
  }
  
  if (!entry.content) {
    return {
      output: []
    };
  }
  
  const lines = entry.content.split('\n');
  const matches = lines.filter(line => line.includes(pattern));
  
  return {
    output: matches.length > 0 ? matches : [`No matches found for '${pattern}' in ${filePath}`]
  };
};

export const exitCommand = (): CommandResult => {
  const { sudoMode } = getCommandState();
  if (sudoMode) {
    return {
      output: ["Exited sudo mode. Running as standard user."]
    };
  } else {
    return {
      output: ["You can close the terminal with the window controls."]
    };
  }
};
