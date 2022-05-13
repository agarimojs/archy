const archy = require('../src');
const beep = require('./beep.json');
const otherBeep = require('./other-beep.json');

const beepResult = [
  'beep',
  '├── ity',
  '└─┬ boop',
  '  ├─┬ o_O',
  '  │ ├─┬ oh',
  '  │ │ ├── hello',
  '  │ │ └── puny',
  '  │ └── human',
  '  └── party!',
  '',
];

const beepResultNonUnicode = [
  'beep',
  '+-- ity',
  '`-- boop',
  '  +-- o_O',
  '  | +-- oh',
  '  | | +-- hello',
  '  | | `-- puny',
  '  | `-- human',
  '  `-- party!',
  '',
];

describe('archy', () => {
  it('should show the tree from an object', () => {
    const actual = archy(beep);
    expect(actual).toEqual(beepResult.join('\n'));
  });
  it('should show the tree from an object, non unicode', () => {
    const actual = archy(beep, undefined, { unicode: false });
    expect(actual).toEqual(beepResultNonUnicode.join('\n'));
  });
  it('should use a given prefix', () => {
    const actual = archy(beep, '^');
    expect(actual).toEqual(
      beepResult.map((line) => (line ? `^${line}` : line)).join('\n')
    );
  });
  it('should use a given label name and nodes name', () => {
    const actual = archy(otherBeep, undefined, {
      labelField: 'name',
      nodesField: 'children',
    });
    expect(actual).toEqual(beepResult.join('\n'));
  });
  it('The object can come without label', () => {
    const cloneBeep = { ...beep };
    delete cloneBeep.label;
    const actual = archy(cloneBeep);
    const cloneBeepResult = ['', ...beepResult.slice(1)];
    expect(actual).toEqual(cloneBeepResult.join('\n'));
  });
});
