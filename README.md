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

Add `.md` files under `contents/zh/` or `contents/en/`, and fill in the info in `contents/zh/posts.js` and `contents/en/posts.js`.
