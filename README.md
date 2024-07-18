
To illustrate the bug in e2e testing teardown:

```bash
yarn test:e2e
```

![screenshot](./images/screenshot.png)

You can see the test doesn't tear down, nor show helpful debug info with `--detectOpenHandles`.