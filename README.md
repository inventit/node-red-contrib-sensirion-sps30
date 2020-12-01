# node-red-contrib-sensirion-sps30

Node-RED nodes to control SENSIRION SPS30, a particulate matter sensor.

## Usage

SPS30 supports both I2C interface and UART interface, but these nodes support
only UART interface. Also, these nodes have no feature to control a serial
port directly. Using `node-red-node-serialport` is expected.

SPS30 uses SHDLC [^1] protocol. It is a serial communication protocol based
on a master/slave architecture. SPS30 acts as the slave device.
`SPS30 Out` node translates SHDLC command to MOSI [^2] Frame. And `SPS30 In`
node translates MISO [^3] Frame to a human-readable object.

### Serial port settings

| Item | Setting |
|:-----|:--------|
| Baudrate | 115200 |
| Data bits | 8 |
| Parity | None |
| Stop bits | 8 |
| DTR | auto |
| RTS | auto |
| CTS | auto |
| DSR | auto |
| Split input | after a silence of 100 ms |
| Delivery type | binary buffers |
| Default response timeout | 10000 ms (leave default) |

### SPS30 Out

Set `msg.payload.command` to the command to be executed.

The following commands are supported as of now.

* `StartMeasurement`
  * If you want to read values with float IEEE754, set
    `msg.payload.readValueWithIEEE754` to `true`.
* `StopMeasurement`
* `ReadMeasuredValue`
* `ReadVersion`
* `Reset`

### SPS30 In

Input an output form `serial in` node or  `serial response` node as
a payload of a node messeage.

`msg.payload` from `SPS30 In` node has the follwing properties.

| Property  | Meaning |
|:----------|:--------|
| `cmd`       | Command code has been executed |
| `command`   | Command name has been executed |
| `error`     | Execution error code |
| `message`   | Meaning of error code |
| `values`    | Result of executed command |
| `rx_data`   | Raw data of MISO Frame |
| `timestamp` | Unix time with milliseconds |

This node has the following properties.

* `debug`: If it is set to true, the node stores a byte-stream of
  MOSI Frame to `msg.tx_data`.

## Contributing

Feel free to report any issue to this github repository.

## License

Apache License 2.0
