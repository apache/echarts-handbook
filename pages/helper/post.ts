import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import config from '../../configs/config';
import contributors from './contributors';

export async function getPostData(path: string, lang: string) {
  const md = new MarkdownIt({
    html: true
  })
  .use(highlightjs, {});

  const filePath = path.split('_').join('/');
  const fileContent = await import(`~/contents/${lang}/${filePath}.md`);
  let content = fileContent.default;

  for (let attr in config) {
    content = content.split(`\${${attr}}`).join((config as any)[attr]);
  }

  const res = fm(content);
  return {
    attributes: res.attributes,
    content: md.render(res.body),
    contributors: contributors[`contents/${lang}/${filePath}.md`] || [],
    sourcePath: `https://github.com/${config.gitRepo}/tree/master/contents/${lang}/${filePath}.md`
  };
}
