export const divideCommandLine = (commandLine) => {
    const commandLineSplited = commandLine.split(/ +/);
    const commandName = commandLineSplited[0];
      commandLineSplited.shift();
    return [commandName.trim(), commandLineSplited.join(' ')];
  };
