/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ShdlcResponse } from "./types";
import { getErrorMessage } from "./error-message";
import { getCommandName } from "./command";

const reverseByteStuffing = (origin: Buffer): Array<number> => {
  const frame = [];

  for (let i = 0; i < origin.length; i++) {
    if (origin[i] == 0x7d) {
      if (origin[i + 1] == 0x5e) {
        frame.push(0x7e);
        i = i + 1;
      } else if (origin[i + 1] == 0x5d) {
        frame.push(0x7d);
        i = i + 1;
      } else if (origin[i + 1] == 0x31) {
        frame.push(0x11);
        i = i + 1;
      } else if (origin[i + 1] == 0x33) {
        frame.push(0x13);
        i = i + 1;
      }
    } else {
      frame.push(origin[i]);
    }
  }
  return frame;
};

export const decode = (buffer: Buffer): ShdlcResponse => {
  const frame: Array<number> = reverseByteStuffing(buffer);

  if (frame[0] !== 0x7e) {
    throw new Error("MISO Frame must be started with 0x7E.");
  } else if (frame[1] !== 0x00) {
    throw new Error("ADR must be zero.");
  } else if (frame.slice(-1)[0] !== 0x7e) {
    throw new Error("MISO Frame must be ended with 0x7E.");
  }

  const rx_data_len = frame[4];
  const frame_content = frame.slice(1, 4 + rx_data_len + 1);
  const sum = frame_content.reduce((acc, cur) => acc + cur);

  if (((~sum >>> 0) & 0xff) != frame.slice(-2)[0]) {
    throw new Error("Checksum error.");
  }

  const response: ShdlcResponse = {
    cmd: frame[2],
    command: getCommandName(frame[2]),
    error: frame[3],
    message: getErrorMessage(frame[3]),
    rx_data: frame_content.slice(4),
    timestamp: Date.now()
  };

  return response;
};
