const major = parseInt(process.versions.node.split('.')[0], 10);

if (major < 20) {
  console.error(
    `\n❌ This package requires Node.js 20+ to run reliably.\n` +
    `   You are using Node.js ${process.versions.node}.\n` +
    `   Please upgrade to Node.js 20+ to proceed.\n`
  );
  process.exit(1);
}

const heapLimit = require('v8').getHeapStatistics().heap_size_limit;
const oneGB = 1024 * 1024 * 1024;
if (heapLimit > 0 && heapLimit < 2 * oneGB) {
  const heapGB = (heapLimit / oneGB).toFixed(1);
  console.warn(
    `\n⚠️  Warning: Node.js heap limit is ${heapGB}GB.\n` +
    `   For memory-intensive operations (build, test, WAProto), use:\n` +
    `   npm run build:tsc  or  npm test\n` +
    `   (these scripts include --max-old-space-size=4096 automatically)\n` +
    `   To set it manually: NODE_OPTIONS="--max-old-space-size=4096"\n`
  );
}