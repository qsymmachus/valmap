# valmap

`ValueMap` is a drop-in replacement for `Map` that considers object and array keys equal if they have the same value.

## Examples

A `ValueMap` has the same interface as ordinary an `Map`:

```typescript
import { ValueMap } from 'valmap';

const valueMap = new ValueMap();

valueMap.set('wow', 'neat');
valueMap.get('wow'); // => 'neat'
```

It differs from an ordinary `Map` in one important way – when you use an object or array as a key, key equality will be based on its _value_:

```typescript
valueMap.set({ foo: 'bar' }, 'this is stored with an object key');
valueMap.get({ foo: 'bar' }); // => 'this is stored with an object key';
```

Object and array keys will be considered equal if they contain the same data, regardless of property or element order.

Constrast this behavior with an ordinary map, where object and array keys are only considered equal if they have the same _reference_:

```typescript
const ordinaryMap = new Map();

ordinaryMap.set({ foo: 'bar' }, 'object key in ordinary map');
ordinaryMap.get({ foo: 'bar' }); // => undefined
```

## Installation

Depending on your preferred package manager:

```
npm install valmap
```

```
yarn add valmap
```
