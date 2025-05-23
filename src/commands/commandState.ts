
// Track global command state
let sudoMode = false;
let failedAttempts = 0;

export const getCommandState = () => ({
  sudoMode,
  failedAttempts
});

export const setSudoMode = (value: boolean) => {
  sudoMode = value;
};

export const incrementFailedAttempts = () => {
  failedAttempts++;
};

export const resetFailedAttempts = () => {
  failedAttempts = 0;
};
