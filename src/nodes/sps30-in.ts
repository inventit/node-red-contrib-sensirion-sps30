/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Red, Node } from "node-red";
import { Sps30NodeOut, MISOFrame } from "./types";
import { decode } from "./decode";
import { parseVersion } from "./version";
import { parseMeasuredValue } from "./measured-value";
import { CMD } from "./command";
import { Sps30InNodeProperties } from "./properties";

export = (RED: Red): void => {
  RED.nodes.registerType("SPS30 In", function(
    this: Node,
    props: Sps30InNodeProperties
  ) {
    RED.nodes.createNode(this, props);
    this.on("input", (msg: MISOFrame) => {
      const result: Sps30NodeOut = {
        payload: decode(msg.payload)
      };

      if (result.payload.cmd === CMD.ReadVersion) {
        result.payload.values = parseVersion(result.payload.rx_data);
      } else if (result.payload.cmd === CMD.ReadMeasuredValue) {
        result.payload.values = parseMeasuredValue(result.payload.rx_data);
      }

      if (!props.debug) {
        delete result.payload.rx_data;
      }

      this.send(result);
    });
  });
};
