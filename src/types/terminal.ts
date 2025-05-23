
export interface TerminalOutput {
  command: string;
  response?: string[];
  error?: boolean;
  matrix?: boolean;
}

export type CommandResult = {
  output: string[];
  error?: boolean;
  matrix?: boolean;
};

// File system structure for commands like cat, ls, etc.
export interface FileSystemEntry {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileSystemEntry[];
}
