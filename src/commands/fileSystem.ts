
import { FileSystemEntry } from "@/types/terminal";

// Create a simple virtual file system
export const fileSystem: FileSystemEntry = {
  name: '/',
  type: 'directory',
  children: [
    {
      name: 'home',
      type: 'directory',
      children: [
        {
          name: 'user',
          type: 'directory',
          children: [
            {
              name: 'Documents',
              type: 'directory',
              children: [
                {
                  name: 'notes.txt',
                  type: 'file',
                  content: 'These are my important notes.\nRemember to learn more terminal commands!'
                },
                {
                  name: 'todo.txt',
                  type: 'file',
                  content: '1. Learn Linux commands\n2. Master the terminal\n3. Become a command line ninja'
                }
              ]
            },
            {
              name: 'Downloads',
              type: 'directory',
              children: []
            },
            {
              name: 'Pictures',
              type: 'directory',
              children: []
            },
            {
              name: '.bashrc',
              type: 'file',
              content: '# ~/.bashrc: executed by bash for non-login shells.\n\n# If not running interactively, don\'t do anything\n[ -z "$PS1" ] && return'
            },
            {
              name: 'welcome.txt',
              type: 'file',
              content: 'Welcome to the Web Terminal!\n\nThis is a virtual Linux environment running in your browser.\nTry using commands like ls, cat, pwd, and more.'
            }
          ]
        }
      ]
    },
    {
      name: 'etc',
      type: 'directory',
      children: [
        {
          name: 'hosts',
          type: 'file',
          content: '127.0.0.1 localhost\n::1 localhost'
        },
        {
          name: 'passwd',
          type: 'file',
          content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:Web User:/home/user:/bin/bash'
        }
      ]
    },
    {
      name: 'usr',
      type: 'directory',
      children: [
        {
          name: 'bin',
          type: 'directory',
          children: []
        },
        {
          name: 'share',
          type: 'directory',
          children: []
        }
      ]
    }
  ]
};

// Current path in the file system
let currentPath = '/home/user';

export const getCurrentPath = (): string => {
  return currentPath;
};

export const setCurrentPath = (path: string): void => {
  currentPath = path;
};

// Helper function to get a file or directory by path
export const getEntryByPath = (path: string): FileSystemEntry | null => {
  // Handle absolute vs relative paths
  const absolutePath = path.startsWith('/') ? path : `${currentPath}/${path}`;
  const normalizedPath = normalizePath(absolutePath);
  
  // Split path into segments
  const segments = normalizedPath.split('/').filter(Boolean);
  
  // Navigate from root
  let current: FileSystemEntry = fileSystem;
  
  // If this is the root path
  if (segments.length === 0) {
    return fileSystem;
  }
  
  // Navigate through path segments
  for (const segment of segments) {
    if (segment === '.') continue;
    
    if (!current.children) {
      return null;
    }
    
    const found = current.children.find(child => child.name === segment);
    if (!found) {
      return null;
    }
    
    current = found;
  }
  
  return current;
};

// Function to normalize a path (resolve ., .., etc)
export const normalizePath = (path: string): string => {
  const segments = path.split('/').filter(Boolean);
  const result: string[] = [];
  
  for (const segment of segments) {
    if (segment === '.') {
      continue;
    } else if (segment === '..') {
      result.pop();
    } else {
      result.push(segment);
    }
  }
  
  return '/' + result.join('/');
};

// Function to resolve a path (absolute or relative)
export const resolvePath = (path: string): string => {
  if (path.startsWith('/')) {
    return normalizePath(path);
  } else {
    return normalizePath(`${currentPath}/${path}`);
  }
};
