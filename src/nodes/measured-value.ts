/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as os from "os";

interface Reading {
  value: number;
  unit: string;
}

interface MassConcentration {
  PM1p0: Reading;
  PM2p5: Reading;
  PM4p0: Reading;
  PM10: Reading;
}

interface NumberConcentration {
  PM0p5: Reading;
  PM1p0: Reading;
  PM2p5: Reading;
  PM4p0: Reading;
  PM10: Reading;
}

export interface ParticulateMatter {
  MassConcentration: MassConcentration;
  NumberConcentration: NumberConcentration;
  TypicalParticleSize: Reading;
}

const readAsFloat = (data: Array<number>): number => {
  const buffer = new ArrayBuffer(4);
  const f32 = new Float32Array(buffer);
  const ui8 = new Uint8Array(buffer);

  if (os.endianness() === "LE") {
    ui8[0] = data[3];
    ui8[1] = data[2];
    ui8[2] = data[1];
    ui8[3] = data[0];
  } else {
    ui8[0] = data[0];
    ui8[1] = data[1];
    ui8[2] = data[2];
    ui8[3] = data[3];
  }

  return f32[0];
};

const readAsUint16 = (data: Array<number>): number => {
  const buffer = new ArrayBuffer(2);
  const ui16 = new Uint16Array(buffer);
  const ui8 = new Uint8Array(buffer);

  if (os.endianness() === "LE") {
    ui8[0] = data[1];
    ui8[1] = data[0];
  } else {
    ui8[0] = data[0];
    ui8[1] = data[1];
  }

  return ui16[0];
};

const parseIEEE754 = (rx_data: Array<number>): ParticulateMatter => {
  const value: ParticulateMatter = {
    MassConcentration: {
      PM1p0: {
        value: readAsFloat(rx_data.slice(0, 4)),
        unit: "ug/m3"
      },
      PM2p5: {
        value: readAsFloat(rx_data.slice(4, 8)),
        unit: "ug/m3"
      },
      PM4p0: {
        value: readAsFloat(rx_data.slice(8, 12)),
        unit: "ug/m3"
      },
      PM10: {
        value: readAsFloat(rx_data.slice(12, 16)),
        unit: "ug/m3"
      }
    },
    NumberConcentration: {
      PM0p5: {
        value: readAsFloat(rx_data.slice(16, 20)),
        unit: "#/cm3"
      },
      PM1p0: {
        value: readAsFloat(rx_data.slice(20, 24)),
        unit: "#/cm3"
      },
      PM2p5: {
        value: readAsFloat(rx_data.slice(24, 28)),
        unit: "#/cm3"
      },
      PM4p0: {
        value: readAsFloat(rx_data.slice(28, 32)),
        unit: "#/cm3"
      },
      PM10: {
        value: readAsFloat(rx_data.slice(32, 36)),
        unit: "#/cm3"
      }
    },
    TypicalParticleSize: {
      value: readAsFloat(rx_data.slice(36, 40)),
      unit: "um"
    }
  };
  return value;
};

const parseUint16 = (rx_data: Array<number>): ParticulateMatter => {
  const value: ParticulateMatter = {
    MassConcentration: {
      PM1p0: {
        value: readAsUint16(rx_data.slice(0, 2)),
        unit: "ug/m3"
      },
      PM2p5: {
        value: readAsUint16(rx_data.slice(2, 4)),
        unit: "ug/m3"
      },
      PM4p0: {
        value: readAsUint16(rx_data.slice(4, 6)),
        unit: "ug/m3"
      },
      PM10: {
        value: readAsUint16(rx_data.slice(6, 8)),
        unit: "ug/m3"
      }
    },
    NumberConcentration: {
      PM0p5: {
        value: readAsUint16(rx_data.slice(8, 10)),
        unit: "#/cm3"
      },
      PM1p0: {
        value: readAsUint16(rx_data.slice(10, 12)),
        unit: "#/cm3"
      },
      PM2p5: {
        value: readAsUint16(rx_data.slice(12, 14)),
        unit: "#/cm3"
      },
      PM4p0: {
        value: readAsUint16(rx_data.slice(14, 16)),
        unit: "#/cm3"
      },
      PM10: {
        value: readAsUint16(rx_data.slice(16, 18)),
        unit: "#/cm3"
      }
    },
    TypicalParticleSize: {
      value: readAsUint16(rx_data.slice(18, 20)) / 1000,
      unit: "um"
    }
  };
  return value;
};

export const parseMeasuredValue = (
  rx_data: Array<number>
): ParticulateMatter => {
  if (rx_data === undefined || rx_data.length === 0) {
    throw new Error("Unexpected rx_data.");
  }

  if (rx_data.length == 40) {
    return parseIEEE754(rx_data);
  } else if (rx_data.length == 20) {
    return parseUint16(rx_data);
  }

  throw new Error("Unexpected data length.");
};
