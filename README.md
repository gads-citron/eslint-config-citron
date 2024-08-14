# Eslint config Citron

Citron definition of beauty.

## Debugging

If you want to list all the rules that are enabled in your eslint configuration, you can run the following command 🧑‍💻:

```bash
npx eslint --print-config file.js
```

If you want to test your configuration, here a playground 🛝 that can help you [typescript-eslint.io](https://typescript-eslint.io/play/#ts=5.5.2&fileType=.ts)

## Registry change

This package has changed registry (from npm to github) so the name of the npm package has been changed.
Be careful to put `@gads-citron/eslint-config-citron` in your package.json **and your eslintrc**.

To install this package a `.npmrc` at the root of your project or user with the github registry and your access token is needed, more information [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package).

Versions prior to 1.1.0 are not available on the github registry.

## Code styling rules

### Citron config

Citron has its own configuration which can be found here :

[gads-citron/eslint-config-citron](https://github.com/gads-citron/eslint-config-citron)

This configuration is based on 3 majors standards :

**Airbnb JavaScript Style Guide**

[airbnb/javascript](https://github.com/airbnb/javascript)

**TypeScript ESLint**

[typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

With theses two sets of rules :

- [Recommend](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.ts)
- [Recommend requiring type checking](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts)

**Prettier**

[Prettier · Opinionated Code Formatter](https://prettier.io/)

We recommend to have looked to theses code styling rules.

## Citron rules

### [max-lines](https://eslint.org/docs/rules/max-lines)

Maximum number of lines per file set to **150**.
_Keep the code readable, force to split and organise your code_

### [max-lines-per-function](https://eslint.org/docs/rules/max-lines-per-function)

Maximum number of lines per function set to **25**.
You will hate it
_Keep the code readable, force to split and organise your code_

### [**max-depth**](https://eslint.org/docs/rules/max-depth)

Maximum block depth set to **4**.
_Keep the code readable_

- Example

  ```jsx
  // Bad
  function foo() {
    for (;;) {
      // Nested 1 deep
      while (true) {
        // Nested 2 deep
        if (true) {
          // Nested 3 deep
          if (true) {
            // Nested 4 deep
            if (true) {
              // Nested 5 deep
            }
          }
        }
      }
    }
  }

  // Good
  function foo() {
    for (;;) {
      // Nested 1 deep
      while (true) {
        // Nested 2 deep
        if (true) {
          // Nested 3 deep
          if (true) {
            // Nested 4 deep
          }
        }
      }
    }
  }
  ```

### [max-params](https://eslint.org/docs/rules/max-params)

Maximum number of parameters allowed in function definitions set to **3.**
_Keep the code readable_

- Example

  ```jsx
  // Bad (4 params)
  function foo(bar, baz, qux, qxx) {
    doSomething();
  }

  // Good (3 params)
  function foo(bar, baz, qux) {
    doSomething();
  }
  ```

### [max-nested-callbacks](https://eslint.org/docs/rules/max-nested-callbacks)

Maximum depth that callbacks set to **3**.
_Keep the code readable_

- Example

  ```jsx
  // Bad
  foo1(function () {
    foo2(function () {
      foo3(function () {
        foo4(function () {
          // Do something
        });
      });
    });
  });

  // Good
  foo1(function () {
    foo2(function () {
      foo3(function () {
        // Do something
      });
    });
  });
  ```

### [complexity](https://eslint.org/docs/rules/complexity)

Maximum cyclomatic complexity set to **10**. [Cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) is the number of decisions or path an algorithm can make.  
Reducing code complexity.

- Example

  ```jsx
  // Bad
  function a(x) {
    if (x === 1) {
      return x;
    } else if (x === 2) {
      return x - 1;
    } else if (x === 3) {
      return x - 23;
    } else if (x === 4) {
      return x + 9;
    } else if (x === 5) {
      return x + 42;
    } else if (x === 6) {
      return x + 42;
    } else if (x === 7) {
      return x + 42;
    } else if (x === 8) {
      return x + 42;
    } else if (x === 9) {
      return x + 42;
    } else if (x === 10) {
      return x + 42;
    } else {
      return 4; // 11 path
    }
  }

  // Good
  function a(x) {
    if (x === 1) {
      return x;
    } else if (x === 2) {
      return x - 1;
    } else if (x === 3) {
      return x - 23;
    } else if (x === 4) {
      return x + 9;
    } else {
      return 4; // 5 path
    }
  }
  ```

### [**import/extensions**](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md)

Omit the file extension only for typescript files (`.ts`).
_To avoid confusion on import._

- Example
  Given the following folder structure:
  ```
  ├── user
  │   ├── user.model.ts
  │   ├── user.database.json
  ```
  The import statement will be :
  ```jsx
  import { User } from './user/user.model';
  import users from './user/user.database.json';
  ```

### [**import/no-default-export**](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md)

Only named export are accepted.
_Name are consistent throughout all files._

- Example

  ```jsx
  // Bad
  const foo = 'bar';
  export default foo;

  // Good
  export const foo = 'bar';
  ```

### [@typescript-eslint/no-explicit-any](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md)

This rule doesn't allow any types to be defined.
_Using the any type defeats the purpose of using TypeScript._

- Example

  ```tsx
  // Bad
  const toto: any = 'toto';

  // Good
  const toto: string = 'toto';
  ```

### Disabled rules

- **[no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)**
- **[no-restricted-syntax](https://eslint.org/docs/rules/no-restricted-syntax)**
  This rule only apply on `LabeledStatement` and `WithStatement`
- **[@typescript-eslint/no-misused-promises](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md)**
  This rule only apply on `checksConditionals`
- **[no-await-in-loop](https://eslint.org/docs/rules/no-await-in-loop)**  
  Can be dangerous, force to use `Promise.All` on too large arrays.

- **[no-use-before-define](https://eslint.org/docs/rules/no-use-before-define)** - Only for functions  
  For more clarity, allow use of function before definition.

  In a file, where a function or a class is export who use others functions define in this file but not exported, those unexported functions can be define after the exported one for more clarity so when the file is open, the main exported function/class is shown in first.

- **[no-useless-constructor](https://eslint.org/docs/latest/rules/no-useless-constructor)**  
  Allows dependency injections into classes with empty constructors.

# Ressources

- [Eslint](https://eslint.org/) - Linter used
- [Citron eslint config](https://github.com/gads-citron/eslint-config-citron) - Citron Github repository with all the config
- [JavaScript Style Guide](https://airbnb.io/projects/javascript/) - A mostly reasonable approach to JavaScript
  By Harrison Shoff of AirBnb
