# Pigeon Light Fast Transformer

## 1.0.1 Version

- [x] Substitution matched variable
- [x] Transform matched variable

## Get started

### Basic using

```javascript
const { formatMessageWithValues } = require('pigeon-lft');

let message = 'hello, my name is {{name}} this library name is {{lib}}';

const variables = {
  name: 'Victor',
  lib: 'pigeon-lft',
};

message = formatMessageWithValues(item, variables);
// hello, my name is Victor this library name is pigeon-lft
```

### Using with transform

```javascript
const { formatMessageWithValues } = require('pigeon-lft');

let message = 'hello, my name is {{name}} this library name is {{lib}}';

const variables = {
  name: '  Victor  ',
  lib: 'PIGEON-LFT',
};

const transforming = {
  name: (text) => text.trim(),
  lib: (text) => text.toLowerCase(),
};

message = formatMessageWithValues(item, variables, transforming);
// hello, my name is Victor this library name is pigeon-lft
```

### Next step's

- Class instance
- Custom regex variables
- Validation / Default Values
