# @agarimo/archy

Render nested hierarchies `npm ls` style with unicode pipes.
Based on https://github.com/substack/node-archy

## Installation

```sh
npm install @agarimo/archy
```

## API: archy(obj, prefix='', opts={})

Return a string representation of `obj` with unicode pipe characters like how
`npm ls` looks.

`obj` should be a tree of nested objects with `'label'` and `'nodes'` fields. `'label'` is a string of text to display at a node level and `'nodes'` is an array of the descendents of the current node. 
These names `'label'` and `'nodes'` are the default ones but can be changed using opts.

If a node is a string, that string will be used as the `'label'` and an empty array of `'nodes'` will be used.

`prefix` gets prepended to all the lines and is used by the algorithm to recursively update.

If `'label'` has newlines they will be indented at the present indentation level with the current prefix.

To disable unicode results in favor of all-ansi output set `opts.unicode` to `false`.
To change the `'label'` field set `opts.labelField` to the new value.
To change the `'nodes'` field set `opts.nodesField` to the new value.

## example

```javascript
const archy = require('@agarimo/archy');
const result = archy({
  label : 'beep',
  nodes : [
    'ity',
    {
      label : 'boop',
      nodes : [
        {
          label : 'o_O',
          nodes : [
            {
              label : 'oh',
              nodes : [ 'hello', 'puny' ]
            },
            'human'
          ]
        },
        'party\ntime!'
      ]
    }
  ]
});
console.log(result);
```

Output:

```
beep
├── ity
└─┬ boop
  ├─┬ o_O
  │ ├─┬ oh
  │ │ ├── hello
  │ │ └── puny
  │ └── human
  └── party
      time!
```

## example changing the label and nodes fields to name and children.

```javascript
const archy = require('@agarimo/archy');
const result = archy({
  name : 'beep',
  children : [
    'ity',
    {
      name : 'boop',
      children : [
        {
          name : 'o_O',
          nodes : [
            {
              name : 'oh',
              children : [ 'hello', 'puny' ]
            },
            'human'
          ]
        },
        'party\ntime!'
      ]
    }
  ]
},
undefined,
{
  labelField: 'name',
  nodesField: 'children'
});

console.log(result);
```

Output:

```
beep
├── ity
└─┬ boop
  ├─┬ o_O
  │ ├─┬ oh
  │ │ ├── hello
  │ │ └── puny
  │ └── human
  └── party
      time!
```


# license

MIT