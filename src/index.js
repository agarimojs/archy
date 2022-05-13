const chars = {
  '│': '|',
  '└': '`',
  '├': '+',
  '─': '-',
  '┬': '-',
};

function archy(srcObj, prefix = '', opts = {}) {
  const chr = (s) => (opts.unicode === false ? chars[s] : s);
  const labelField = opts.labelField || 'label';
  const nodesField = opts.nodesField || 'nodes';
  const obj = typeof srcObj === 'string' ? { [labelField]: srcObj } : srcObj;
  const nodes = obj[nodesField] || [];
  const lines = (obj[labelField] || '').split(/\r?\n/);
  const splitter = `\n${prefix}${nodes.length ? chr('│') : ' '} `;
  const nodesmap = nodes.map((node, ix) => {
    const last = ix === nodes.length - 1;
    const more = node[nodesField] && node[nodesField].length;
    const newPrefix = `${prefix}${last ? ' ' : chr('│')} `;
    return `${prefix}${last ? chr('└') : chr('├')}${chr('─')}${
      more ? chr('┬') : chr('─')
    } ${archy(node, newPrefix, opts).slice(prefix.length + 2)}`;
  });
  return `${prefix}${lines.join(splitter)}\n${nodesmap.join('')}`;
}

module.exports = archy;
