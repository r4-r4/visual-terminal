import { CommandResult } from "@/types/terminal";
import { getCommandState } from "./commandState";

export const matrixCommand = (): CommandResult => {
  // Set up the initial matrix display
  const matrixOutput: string[] = [];
  const screenWidth = 80;
  const screenHeight = 15;
  
  // Create initial matrix "rain" screen
  for (let i = 0; i < screenHeight; i++) {
    let line = "";
    for (let j = 0; j < screenWidth; j++) {
      // Create a sparse initial display with more spaces
      if (Math.random() < 0.8) {
        line += " ";
      } else {
        const charSet = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,./<>?";
        line += charSet[Math.floor(Math.random() * charSet.length)];
      }
    }
    matrixOutput.push(line);
  }
  
  // Add a message at the end
  matrixOutput.push("");
  matrixOutput.push("Press any key to exit the Matrix...");
  
  return {
    output: matrixOutput,
    matrix: true // Special flag for matrix animation
  };
};

export const cowsayCommand = (args: string[]): CommandResult => {
  // Get the message to display
  const message = args.join(" ") || "Moo!";
  const messageLength = message.length;
  
  // Create the speech bubble
  const topBorder = " " + "_".repeat(messageLength + 2);
  const bottomBorder = " " + "-".repeat(messageLength + 2);
  const messageLine = "< " + message + " >";
  
  // ASCII cow
  const cow = [
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||"
  ];
  
  // Combine everything
  return {
    output: [
      topBorder,
      messageLine,
      bottomBorder,
      ...cow
    ]
  };
};

export const neofetchCommand = (): CommandResult => {
  const { sudoMode } = getCommandState();
  const memoryUsage = 128; // Default fallback value
  
  return {
    output: [
      "         _nnnn_                             " + (sudoMode ? "root" : "user") + "@web-terminal",
      "        dGGGGMMb                           ------------------",
      "       @p~qp~~qMb                          OS: Web Terminal v1.0",
      "       M|@||@) M|                          Host: Browser Environment",
      "       @,----.JM|                          Kernel: JavaScript ES2020",
      "      JS^\\__/  qKL                         Uptime: " + Math.floor(performance.now()/1000/60) + " mins",
      "     dZP        qKRb                       Packages: React + TypeScript",
      "    dZP          qKKb                       Shell: Web Shell v1.0",
      "   fZP            SMMb                      Terminal: Virtual Web Terminal",
      "   HZM            MMMM                      CPU: Browser Runtime",
      "   FqM            MMMM                      Memory: " + memoryUsage + "MB / 1024MB",
      " __| \".        |\\dS\"qML                    Privileges: " + (sudoMode ? "Superuser" : "Standard User"),
      " |    `.       | `' \\Zq                    ",
      "_)      \\.___.,|     .'                    ",
      "\\____   )MMMMMP|   .'                     ",
      "     `-'       `--' hjm                   "
    ]
  };
};

export const blackirisCommand = (): CommandResult => {
  // ASCII art for the black iris flower
  const blackIrisArt = `
 ____  _        _    ____ _  __  ___ ____  ___ ____  
| __ )| |      / \  / ___| |/ / |_ _|  _ \|_ _/ ___| 
|  _ \| |     / _ \| |   | ' /   | || |_) || |\___ \ 
| |_) | |___ / ___ \ |___| . \   | ||  _ < | | ___) |
|____/|_____/_/   \_\____|_|\_\ |___|_| \_\___|____/ `;
  
  // Split the ASCII art into separate lines for the terminal
  const outputLines = blackIrisArt.split('\n');
  
  return {
    output: outputLines
  };
};
