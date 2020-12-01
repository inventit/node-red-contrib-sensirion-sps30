/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Inventit Inc. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NodeProperties, Red, Node } from "node-red";
import { Sps30NodeIn } from "./types";
import { encode } from "./encode";

export = (RED: Red): void => {
  RED.nodes.registerType("SPS30 Out", function(
    this: Node,
    props: NodeProperties
  ) {
    RED.nodes.createNode(this, props);
    this.on("input", (msg: Sps30NodeIn) => {
      this.send(encode(msg));
    });
  });
};
