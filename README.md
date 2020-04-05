# standard-node

Standard operations in nice wrappers.

* string
* list
* file
* directory

## Import

Import specific functions:

```typescript
import { functionName } from "@wandyezj/standard-node";
```

Import everything under a namespace:

```typescript
import * as standard from "@wandyezj/standard-node";
```

If using webpack add the following to the config file:

```text
node: { global: true, fs: 'empty' },
```

## About

Zero external dependencies.

Node Types and TypeScript are the only dependencies.

## Standard Parameter Names

* path
* string
* list
* directory - full directory path
* file - full file path

## Philosophy

### deterministic

Every run of the program with the same inputs should produce the same result.

In some cases external dependencies may have some variation (for example order of files in a directory), care should be taken to sanitize the input where possible so that it appears deterministic.

determinism makes testing and reproducing issues substantially easier.

### complete

An action should never be in a partial state.

The action should complete fully or throw an error.

Ideally actions would be part of a transaction where all actions would succeed or nothing would happen.

An error indicates that the action could not complete and the program may now be in an unknown state.

In some cases complete is not possible due to the way that dependency APIs such as the file system are structured.

### intuitive

Short descriptive memorable names are preferred over longer names.

The same words should be used for the same action, patterns should be applicable as far as possible.

