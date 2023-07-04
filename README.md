# Pigeon Light Fast Transformer

[![semantic-release: javascript](https://img.shields.io/badge/semantic--release-javascript-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
![GitHub CI](https://github.com/victorportize/pigeon-lft/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/VictorPortize/pigeon-lft/branch/main/graph/badge.svg?token=UH94ASW3Q6)](https://codecov.io/gh/VictorPortize/pigeon-lft)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)



## Get started

### Why? 

pigeon is an alias for a message-delivering microservice we build at work, so since we need a replacement text for variables with formatter... we need a Pigeon-LFT

![meme what originated the name of the library](https://media.tenor.com/xBk3W_f99MIAAAAC/is-this-a-pigeon-butterfly.gif)
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

### Using default values ( version: +1.3.0 )

```javascript
const { formatTextValues } = require('pigeon-lft');

let message = 'hello, my name is {{name}} this library name is {{lib}}';

const variables = {
  name: 'Victor',
  lib: 'pigeon-lft',
};

const defaultValues = {
  lib: 'pigeon-lft',
};

const match = /\[[^\d!"#$%&'()*+,\-.\/:;<=>?@[\]^`{|}~][\w]+\]/;

message = formatTextValues(message, {variables, defaultValues});
// hello, my name is Victor this library name is pigeon-lft
message = formatTextValues(message, {defaultValues: 'default'});
// hello, my name is default this library name is default
message = formatTextValues(message, {defaultValues: {name: 'Pigeon-LFT', lib: "Victor"}});
// hello, my name is Pigeon-LFT this library name is Victor
```

### Next step's

- Class instance ??
- Validation
- Benchmark's

### looking for performance gaps, if you find one, email me