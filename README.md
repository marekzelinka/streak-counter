# `@marekzelinka/streak-counter`

This is a basic streak counter inspired by Duolingo. It is written in TypeScript and meant for the browser (uses `localStorage`).

## Install

If you're using npm:

```shell
# for npm:
npm install @marekzelinka/streak-counter
```

Or, if you're using pnpm:

```shell
pnpm add @marekzelinka/streak-counter
```

### Usage

```typescript
import { streakCounter } from "@marekzelinka/streak-counter";

const today = new Date();
const streak = streakCounter(localStorage, today);
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```

[![Edit streak-counter-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/streak-counter-demo-d3fg5l)

## Credits

- [Build a TypeScript Project From Scratch](https://www.typescriptcourse.com/tutorials/build-a-typescript-project-from-scratch)
- [How To Create An NPM Package](https://www.totaltypescript.com/how-to-create-an-npm-package)
- [Bunchee](https://github.com/huozhi/bunchee) - bundler for ECMAScript and TypeScript packages
