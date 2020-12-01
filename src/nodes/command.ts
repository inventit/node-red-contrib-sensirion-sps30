/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export enum CMD {
  StartMeasurement = 0x00,
  StopMeasurement = 0x01,
  ReadMeasuredValue = 0x03,
  Sleep = 0x10,
  WakeUp = 0x11,
  StartFanCleaning = 0x56,
  ReadWriteAutoCleaningInterval = 0x80,
  DeviceInformation = 0xd0,
  ReadVersion = 0xd1,
  ReadDeviceStatusRegister = 0xd2,
  Reset = 0xd3
}

export const getCommandName = (cmd: number): string => {
  if (cmd == CMD.StartMeasurement) return "Start Measurement";
  else if (cmd == CMD.StopMeasurement) return "Stop Measurement";
  else if (cmd == CMD.ReadMeasuredValue) return "Read Measured Value";
  else if (cmd == CMD.Sleep) return "Sleep";
  else if (cmd == CMD.WakeUp) return "Wake-up";
  else if (cmd == CMD.StartFanCleaning) return "Start Fan Cleaning";
  else if (cmd == CMD.ReadWriteAutoCleaningInterval)
    return "Read/Write Auto Cleaning Interval";
  else if (cmd == CMD.DeviceInformation) return "Device Information";
  else if (cmd == CMD.ReadVersion) return "Read Version";
  else if (cmd == CMD.ReadDeviceStatusRegister)
    return "Read Device Status Register";
  else if (cmd == CMD.Reset) return "Reset";

  throw new Error(`Unknown CMD [${cmd}]`);
};
