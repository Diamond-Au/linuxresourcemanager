let str = `Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:  253072    2422    0    0    0     0          0         0   253072    2422    0    0    0     0       0          0
enp3s0: 15106676   20192    0   74    0     0          0        87  3841915   21096    0    0    0     0       0          0
  wlo1:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
docker0:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
xdroid0:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
`
str = str.split('\n')
let newArr = []
newArr.push(str[2]),
  newArr.push(str[3]);
newArr = newArr.map(item => {
  return item.replace(/\s+/g, ' ').split(":")[1].trim()
})
let localnetInfo = newArr[0].split(" ");
let ennetInfo = newArr[1].split(' ');
let receiveBytes = localnetInfo[0] + ennetInfo[0];
let receivePacks = localnetInfo[1] + ennetInfo[1];
let sendBytes = localnetInfo[8] + ennetInfo[8];
let sendPacks = localnetInfo[9] + ennetInfo[9];