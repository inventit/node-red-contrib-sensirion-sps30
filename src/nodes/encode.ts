/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Sps30NodeIn, MOSIFrame } from "./types";
import { CMD } from "./command";

const buildMOSIFrame = (command: number, args?: Array<number>): Buffer => {
  let l = [0x00];

  l.push(command);
  if (args !== undefined && args.length) {
    l.push(args.length);
    if (args) {
      l = l.concat(args);
    }
  } else {
    l.push(0x00);
  }

  const sum = l.reduce((acc, cur) => acc + cur);
  const checksum = ~sum;
  l.push(checksum);

  l.unshift(0x7e);
  l.push(0x7e);

  return Buffer.from(l);
};

export const encode = (msg: Sps30NodeIn): MOSIFrame => {
  const frame: MOSIFrame = { payload: null };

  switch (msg.payload.command) {
    case "StartMeasurement": {
      const args = ((isIEEE754: boolean): Array<number> => {
        if (isIEEE754) {
          return [0x01, 0x03];
        }
        return [0x01, 0x05];
      })(msg.payload.readValueWithIEEE754);
      frame.payload = buildMOSIFrame(CMD.StartMeasurement, args);
      break;
    }

    case "StopMeasurement":
      frame.payload = buildMOSIFrame(CMD.StopMeasurement);
      break;

    case "ReadMeasuredValue":
      frame.payload = buildMOSIFrame(CMD.ReadMeasuredValue);
      break;

    case "ReadVersion":
      frame.payload = buildMOSIFrame(CMD.ReadVersion);
      break;

    case "DeviceReset":
      frame.payload = buildMOSIFrame(CMD.Reset);
      break;

    default:
      throw new Error(`Unknown command [${msg.payload.command}].`);
  }
  return frame;
};
