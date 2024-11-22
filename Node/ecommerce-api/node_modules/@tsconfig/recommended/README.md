### The recommended base for a TSConfig.

Add the package to your `"devDependencies"`:

```sh
npm install --save-dev @tsconfig/recommended
yarn add --dev @tsconfig/recommended
```

Add to your `tsconfig.json`:

```json
"extends": "@tsconfig/recommended/tsconfig.json"
```

---

The `tsconfig.json`: 

```jsonc
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "$schema": "https://json.schemastore.org/tsconfig"
}
```

You can find the [code here](https://github.com/tsconfig/bases/blob/master/bases/recommended.json).
