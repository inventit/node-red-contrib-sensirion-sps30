/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const getErrorMessage = (error: number): string => {
  if (error == 0x00) return "No error";
  else if (error == 0x01)
    return "Wrong data length for this command (too much or little data)";
  else if (error == 0x02) return "Unknown command";
  else if (error == 0x03) return "No access right for command";
  else if (error == 0x04)
    return "Illegal command paraeter or parameter out of allowed range";
  else if (error == 0x28) return "Internal function argument out of range";
  else if (error == 0x43) return "Command not allowed in current state";

  throw new Error(`Unknown error code [${error}]`);
};
