// [arg] -> string
const formatArgs = (args) => {
  return args.map((i) => {
    const name = i.name === '' ? '' : ' ' + i.name;
    return `${i.type}${name}`;
  }).join(', ');
};

const isWrite = (m) => {
  return m.type === 'function' && m.stateMutability !== 'view';
};

const isRead = (m) => {
  return m.type === 'function' && m.stateMutability === 'view';
};

exports.showAll = (abiJSON, filter) => {
  const methods = abiJSON.abi;
  const matches = methods.filter(filter);
  return matches.map((m) => {
    return `${m.name}(${formatArgs(m.inputs)}) returns (${formatArgs(m.outputs)})`;
  });
};

// abiJSON -> [string]
exports.showAllWrites = (abiJSON) => {
  return exports.showAll(abiJSON, isWrite);
};

// abiJSON -> [string]
exports.showAllReads = (abiJSON) => {
  return exports.showAll(abiJSON, isRead);
};

// abiJSON -> method?
exports.showConstructor = (abiJSON) => {
  return abiJSON.abi.find((m) => m.type === 'constructor');
};

// abiJSON -> string -> method?
exports.findMethod = (abiJSON, methodName) => {
  return abiJSON.abi.filter((method) => {
    return method.name === methodName;
  })[0];
};

// Note: assuming there is at least one write method
// abiJSON -> string
exports.firstWriteName = (abiJSON) => {
  return abiJSON.abi.find(isWrite).name;
};

// Note: assuming there is at least one read method
// abiJSON -> string
exports.firstReadName = (abiJSON) => {
  return abiJSON.abi.find(isRead).name;
};
