/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Version } from "./version";
import { ParticulateMatter } from "./measured-value";

export interface ShdlcCommand {
  command: string;
  readValueWithIEEE754?: boolean;
}

export interface ShdlcResponse {
  cmd: number;
  command: string;
  error: number;
  message: string;
  values?: Version | ParticulateMatter;
  rx_data?: Array<number>;
  timestamp: number;
}

export interface Sps30NodeIn {
  payload: ShdlcCommand;
}

export interface Sps30NodeOut {
  payload: ShdlcResponse;
}

export interface MISOFrame {
  payload: Buffer;
}

export interface MOSIFrame {
  payload: Buffer;
}
