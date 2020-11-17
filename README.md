# About

This project is part of the source of [The Apache ECharts (incubating) Official Website](https://echarts.apache.org/). See [incubator-echarts-website](https://github.com/apache/incubator-echarts-website) for more details of the building process.

## Init

```bash
npm install
```

## Dev

```bash
npm run dev
```

Open in browser: http://localhost:3000/echarts-handbook/dist/

## Release

```bash
# Update contributors
npm run prepare

# Generate to `dist`
npm run generate
```

## Writing

### Create a new article

Add `.md` files under `contents/zh/` or `contents/en/`, and fill in the info in `contents/zh/posts.js` and `contents/en/posts.js`.


### Reference to Apache ECharts Doc

Do it like this:
```md
xxxx [series.encode](${optionPath}#series.encode) xxxx
```

Note: if you want it to work in development environment, you may need to edit the config file `configs/config.dev.js`: make the value of `optionPath` point to a running environment of `incubator-echarts-doc`.


### Reference to an example

Suppose `area-basic` is one of the example names in `incubator-echarts-examples`.

Just add a link of the example:
```md
[this case](${exampleEditorPath}area-basic&edit=1&reset=1)
```

Embed the live example into the page:
```md
<iframe width="600" height="300" src="${exampleViewPath}area-basic&edit=1&reset=1"></iframe>
```

Note: if you want it to work in development environment, you may need to edit the config file `configs/config.dev.js`: make the value of `exampleViewPath` and `exampleEditorPath` point to a running environment of `incubator-echarts-examples`.

