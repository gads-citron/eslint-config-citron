# Eslint config Citron

Citron definition of beauty.

## Philosophy

You will suffer, you will hate, but at the end you will pray the norm.

_`Patere legem quam ipse fecisti`_

### **Why impose a standard?**

A programming standard is a game changer for long term project with multiple developers for two main reasons :

1. It format and standardise the code so that anyone can read and understand easily and rapidly.
2. It guide you in writing short and simple code.

### **How apply a standard?**

The most important thing, no matter what your preferred javascript style is, is to be consistent when working with a team or a large codebase that will have to be maintained in the future.

Understand each rules and not try to _hack_ them. Theses conventions are set to push you to write cleaner code.

These rules are not cast in stone, question them, discuss them around you, this is the best way to understand and improve this standard.

## Getting started

### Setup EsLint

- First install eslint and eslint-config-citron
  ```bash
  npm i -D eslint eslint-config-citron
  ```
- Then create your `.eslintrc.json` and extend with `eslint-config-citron`

  ```json
  {
    "env": {
  		"es2021": true,

  		// If front (javascript)
  		"browser": true,

  		// If back (nodejs)
  		"node": true
    },
    **"extends": ["eslint-config-citron"]**
  }

  // For more information on eslint config see https://eslint.org/docs/user-guide/configuring/
  ```

- [Add EsLint to your IDE](https://eslint.org/docs/user-guide/integrations)

### Setup Prettier

- First install prettier dependency
  ```bash
  npm i -D --save-exact prettier
  ```
- Then create your `.prettierrc.json` with this configuration :
  ```json
  {
    "trailingComma": "all",
    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": true,
    "printWidth": 80
  }
  ```
- [Add prettier to your IDE](https://prettier.io/docs/en/editors.html)

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

Maximum cyclomatic complexity set to **10**. \***\*[Cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) is the number of decisions or path an algorithm can make.
\*\*\***Reducing code complexity\*

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

- [**no-underscore-dangle**](https://eslint.org/docs/rules/no-underscore-dangle)
- [\*\*no-restricted-syntax](https://eslint.org/docs/rules/no-restricted-syntax)\*\*
  This rule only apply on `LabeledStatement` and `WithStatement`
- [\*\*@typescript-eslint/no-misused-promises](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md)\*\*
  This rule only apply on `checksConditionals`

# Ressources

- [Eslint](https://eslint.org/) - Linter used
- [Citron eslint config](https://github.com/gads-citron/eslint-config-citron) - Citron Github repository with all the config
- [JavaScript Style Guide](https://airbnb.io/projects/javascript/) - A mostly reasonable approach to JavaScript
  By Harrison Shoff of AirBnb
