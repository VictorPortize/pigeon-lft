# Pigeon Light Fast Transformer

[![semantic-release: javascript](https://img.shields.io/badge/semantic--release-javascript-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)


## Get started

### Basic using

```javascript
const { formatTextValues } = require('pigeon-lft');

let message = 'hello, my name is {{name}} this library name is {{lib}}';

const variables = {
  name: 'Victor',
  lib: 'pigeon-lft',
};

message = formatTextValues(message, {variables});
// hello, my name is Victor this library name is pigeon-lft
```

### Using with transform

```javascript
const { formatTextValues } = require('pigeon-lft');

let message = 'hello, my name is {{name}} this library name is {{lib}}';

const variables = {
  name: '  Victor  ',
  lib: 'PIGEON-LFT',
};

const transform = {
  name: (text) => text.trim(),
  lib: (text) => text.toLowerCase(),
};

message = formatTextValues(message, {variables, transform});
// hello, my name is Victor this library name is pigeon-lft
```

### Using custom regex  

```javascript
const { formatTextValues } = require('pigeon-lft');

let message1 = 'hello, my name is {{name}} this library name is {{lib}}';
let message2 = 'hello, my name is {[name]} this library name is {[lib]}';
let message3 = 'hello, my name is [name] this library name is [lib]';

const variables = {
  name: 'Victor',
  lib: 'pigeon-lft',
};

const match = /\[[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+\]/;

message1 = formatTextValues(message1, {variables, match});
// hello, my name is {{name}} this library name is {{lib}}
message2 = formatTextValues(message2, {variables, match});
// hello, my name is {Victor} this library name is {pigeon-lft}
message3 = formatTextValues(message3, {variables, match});
// hello, my name is Victor this library name is pigeon-lft
```

### Next step's

- Class instance
- Custom regex variables
- Validation / default values
- Tests
- Benchmark's
- RegExp custom variable prefix and suffix