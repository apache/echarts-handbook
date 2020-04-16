import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import config from '../../configs/config';

export async function getPostData(path: string, lang: string) {
  const md = new MarkdownIt({
    html: true
  })
  .use(highlightjs, {});

  path = path.split('_').join('/');
  const fileContent = await import(`~/contents/${lang}/${path}.md`);
  let content = fileContent.default;

  for (let attr in config) {
    content = content.split(`\${${attr}}`).join((config as any)[attr]);
  }

  const res = fm(content);
  return {
    attributes: res.attributes,
    content: md.render(res.body)
  };
}
