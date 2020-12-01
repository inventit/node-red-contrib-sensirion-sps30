/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface Version {
  farmware: string;
  hardware: string;
  shdlc: string;
}

export const parseVersion = (rx_data: Array<number>): Version => {
  const version: Version = {
    farmware: rx_data[0].toString() + "." + rx_data[1].toString(),
    hardware: rx_data[3].toString(),
    shdlc: rx_data[5].toString() + "." + rx_data[6].toString()
  };
  return version;
};
