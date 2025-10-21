# 安全指南

## 概述

ECharts 旨在提供丰富而灵活的可视化能力。虽然其绝大多数 API 不需要额外的安全考虑，但有几个例外。例如，`tooltip.formatter` 允许输入 HTML 字符串，从而完全控制组件的内容与布局；`title.link` 直接使用输入的 URL 字符串而不进行自动的净化处理（sanitization）。这种灵活性虽然强大，但当输入来自“不受信任”的来源时，可能带来安全风险。本文档列出了这些 API，并提供了如何安全使用这些特性的建议。

任何潜在安全问题，可依照 [ASF 安全](https://echarts.apache.org/zh/security.html) 中的渠道进行报告。


## 安全边界与检查清单 [[[#security_boundaries_and_checklist]]]

ECharts 专注于可视化逻辑，一般假定输入内容是可信任的，因此不会自动对输入进行净化处理。其实 ECharts 自身也不知如何合适地做净化处理，因为不存在适用于所有使用场景的通用处理规则。然而，ECharts 应该明确哪些 API（尤其是 ECharts options）在哪些场景下须在输入前进行安全相关的处理或考量。由于 ECharts options 数量庞大，对所有输入在任何场景下都进行安全处理不现实也无必要。

ECharts 通过 Canvas 或 SVG 渲染，只有几个特殊组件例外，允许 HTML 渲染（例如，[toolip](${optionPath}tooltip) 和 [dataView](${optionPath}toolbox.feature.dataView)）。ECharts API 的输入可被分为“JS 函数”或者“非 JS 函数”。“JS 函数输入”本意就须允许执行。而大多数“非 JS 函数输入”（例如仅用于渲染的纯文本）不会被执行，因此通常无需防范恶意代码注入。然而，某些 API 允许在页面中嵌入不安全内容（如 HTML 或 URL 文本）。这些 API 能带来丰富的定制能力，但当输入来自“不受信任”的来源时，容易遭受 XSS （跨站脚本攻击）或相关攻击。

**一般而言，如果输入的内容都是可被信任的，就不会出现这些注入漏洞。**
“不受信任”（untrusted）的内容指，内容来自于无法完全控制的来源，或者内容可能被用户或外部系统修改或注入。开发者应该总是假定直接在 HTML、CSS、JS 中使用这些内容会不安全。例如，用户生成的数据或来自客户端的输入都应被认为是“不受信任”的。但在许多情况下，处理用户生成的内容不可避免。例如，从数据库获取用户生成的数据，并组装成 HTML 输入 `tooltip.formatter` 来渲染，就须要进行额外处理，首先是保正渲染正确（通常通过 HTML 转义（HTML escaping）），然后是防止 XSS 攻击（如果无法被转义的部分也是“不受信任”的，需要净化处理（sanitization））。

在部署图表之前，请根据以下**检查清单**确认使用是否安全：

| APIs | 潜在风险与建议 |
| ------ | ------------------ |
| **option [tooltip.formatter](${optionPath}tooltip.formatter)**<br>· `formatter` 允许 HTML 文本或 DOM 元素传入，并后续直接渲染到 tooltip 内部，于是需要考虑 XSS 风险。<br>（例外）：如果 `formatter` 被直接设置成一个字符串，则认为是一个内部实现的简单模版，后续能内部填入数据。[tooltip.renderMode: 'richText'](${optionPath}tooltip.renderMode) 是另一种内部实现的模版，用于定制样式。他们都不涉及 HTML，从而安全。<br><br>**option [toolbox.feature.dataView.optionToContent](${optionPath}toolbox.feature.dataView.optionToContent)**<br>**option [toolbox.feature.dataView.title](${optionPath}toolbox.feature.dataView.title)**<br>**option [toolbox.feature.dataView.lang](${optionPath}toolbox.feature.dataView.lang)**<br>· `tooltip.dataView` 面板完全以 HTML 渲染，这些 API 可自定义 HTML 文本中的部分内容，于是需要考虑 XSS 风险。 | 需要考虑 XSS 风险。一般情况下，仅需 HTML 转义即可。但如果一些不能转义的部分来自“不受信任”的来源，则须更多处理（如净化处理（sanitization）或沙盒隔离）。<br><br>详细描述见 [“传入 HTML 时的安全考虑”](best-practices/security#passing_raw_html_safely)。 |
| **option [tooltip.extraCssText](${optionPath}tooltip.extraCssText)**<br>· `extraCssText` 接受一个原始 CSS style 字符串，并接下来直接拼接进 `tooltipEl.style.cssText`。<br>（例外）：[tooltip.renderMode: 'richText'](${optionPath}tooltip.renderMode) 时此 `extraCssText` 无效。 | 若输入来自可信来源，则一般无安全问题，否则需要仔细评估风险。<br><br>详细描述见 [“传入内联 CSS 时的安全考虑”](best-practices/security#passing_inline_css_safely)。 |
| **option [title.link](${optionPath}title.link)**<br>**option [title.sublink](${optionPath}title.sublink)**<br>**option [series-treemap.data.link](${optionPath}series-treemap.data.link)**<br>**option [series-sunburst.data.link](${optionPath}series-sunburst.data.link)**<br>· 这些 option 直接接受原始 URL 字符串。 | 若若输入来自可信来源，则一般无安全问题，否则须要考虑 XSS 风险。<br><br>详细描述见 ["传入 URL 时的安全考虑"](best-practices/security#passing_raw_urls_safely)。 |
| **option [toolbox.feature.saveAsImage.name](${optionPath}toolbox.feature.saveAsImage.name)**<br>**option [toolbox.feature.saveAsImage.type](${optionPath}toolbox.feature.saveAsImage.type)**<br>**option [title[0].text](${optionPath}title.text)**<br>· `saveAsImage` 功能的下载文件名由 `{name}.{type}` 拼装而成，并未做额外校验或净化（sanitization）处理。如果 `name` 没有指定，则使用 `title[0].text` 替代，尽管这种用法并不推荐。 | 详细描述见 [“传入下载文件名时的安全考虑”](best-practices/security#passing_download_filename_safely)。 |
| 所有“JS 函数”输入（回调） | 通常无安全问题，除非存在特殊使用场景（例如需要执行不可信来源的函数）。<br><br>详细描述见 [“传入 JS 函数时的安全考虑”](best-practices/security#passing_js_function_safely)。 |


## 传入 HTML 时的安全考虑 [[[#passing_raw_html_safely]]]

在 [“安全边界与检查清单”](best-practices/security#security_boundaries_and_checklist) 一节中已列出会接受原始 HTML 的 API。“不受信任”的 HTML 可能导致 XSS 等攻击，因此在传入 ECharts 前应进行处理。常见的处理方式包括 **HTML 转义（HTML Escaping）**、**净化（Sanitization）**、**沙盒**。大多数情况下，仅进行 HTML 转义即可，除非那些不能被转义的部分来自于“不受信任”的来源。

### HTML 转义（HTML Escaping） [[[#passing_raw_html_safely_html_escaping]]]
数据组装成 HTML 字符串前总需要进行 HTML 转义。这不仅是安全需要，也是正确显示的前提。

最简单和常见的 HTML 转义是这些字符串转换：
```
'&' => '&amp;'
'<' => '&lt;'
'>' => '&gt;'
'"' => '&quot;'
"'" => '&#39;
```
转换后，这些字符的功能被去除了，只能显示，从而也无法通过他们进行注入攻击（如 `<script>...</script>`）。

使用 DOM API（如 `.textContent = `）也能实现转义。

在大多数场景中，“不受信任”的内容（如用户输入的文本）仅用于显示，而有功能的部分（如 HTML 标签或属性）完全由应用开发者控制且可信。在这种情况下，HTML 转义本身就足以防御 XSS，只要所有“不受信任”的内容都被正确转义。


### 净化（Sanitization） [[[#passing_raw_html_safely_sanitization]]]

有些场景中，需要有功能的部分（如 HTML 标签或属性）也来自“不受信任”的来源。例如，数据库里取出的文本中包含有 `<em>`、`<a>` 等标签，并且想要它们被当做 HTML 标记解释运行，而不是原样显示。又例如，允许用户或者“不受信任”的来源提供 HTML 模板，用于定义布局与样式，继而和数据结合形成最终可被渲染的 HTML 传给 ECharts 。

这些场景需要承受相对更高的安全风险，可通过净化（sanitization）机制缓解。净化器（sanitizer）一般基于白名单过滤 HTML 内容，例如移除所有 `<script>`、`<style>`、`<link>`、内联 CSS、事件属性（如 `onclick`）以及 `javascript:` 协议的 URL。推荐使用维护良好、社区广泛采用的库，而非用自己写的正则或字符串处理来做这件事。

净化可在前端（指 client）、后端（指 server）或两者同时进行，取决于实际场景和安全需求。例如，对于生成于前端的内容（例如前端提交给后端的内容），仅依赖前端净化不够，攻击者可直接伪造请求绕过前端。比如，一个在线编辑器允许用户以所见即所得（WYSIWYG）的方式创建内容，其中，用户可选择使用内置的几个 HTML 模板或 JS 函数（如 [tooltip.formatter](${optionPath}tooltip.formatter) 或 [label.formatter](${optionPath}series-scatter.label.formatter)）。如果这些选好或者继而生成的 HTML 文本或 JS 函数文本被传输到后端，并不做处理直接存于数据库，则攻击者可在这个阶段注入恶意代码。后续它们被从数据库中取出，并传给 `chart.setOption()` 时，恶意代码会被执行。所以建议在这类场景中：
+ 仅存储内置模板/函数的引用 ID，而不存储原始代码。
+ 若为了更高的定制能力而允许自定义模板，或可引入安全的第三方模板引擎，从而避免注入。
+ 若必须允许用户自定义 HTML，须要严格的后端净化或校验（如过滤掉所有 JS、CSS 和其他可能有安全隐患的内容），并依据实际情况考虑在沙盒中渲染以降低潜在的风险。

通过净化达到足够的安全性有时并不容易。它需要有仔细和合理的配置，并不断随着浏览器/客户端更新，并常需结合其他防御机制从而达到“绝大多数情况下足够安全”。HTML 本身非常复杂和多变，在“不受信任”的内容上支持的功能越丰富，可攻击的渠道就越多。


### 沙盒 [[[#passing_raw_html_sandboxing]]]

若必须执行“不受信任”的代码，或其他措施扔不足以达到足够的安全性，可使用“沙盒 iframe”（sandboxed iframe）进行隔离，提供相对更高安全防护，如 JSFiddle、CodePen 等代码执行平台所采用的机制。


## 传入内联 CSS 时的安全考虑 [[[#passing_inline_css_safely]]]

HTML 的安全（见 [“传入 HTML 时的安全考虑”](best-practices/security#passing_raw_html_safely) 一节）已经包括了 CSS 相关安全问题，而本节主要讨论那些仅接受内联 CSS 字符串的 API（即通过 `.style.cssText =` 修改 `style` 属性的情形）。在 [“安全边界与检查清单”](best-practices/security#security_boundaries_and_checklist) 一节中列出了这些 API。

若内联 CSS 完全来自“可信任”的来源（例如应用自身），则几乎无需担心安全问题，这也是最常见的情况。

否则，“不受信任”的 CSS 可能有安全隐患。一些 HTML 净化库支持 CSS 净化（CSS sanitization），但默认行为可能是删除所有 CSS，毕竟做到理想的 CSS 净化难度很大。因此，若必须运行“不受信任”的 CSS，应结合具体场景谨慎评估实现方式。


## 传入 URL 时的安全考虑 [[[#passing_raw_urls_safely]]]

HTML 的安全（见 [“传入 HTML 时的安全考虑”](best-practices/security#passing_raw_html_safely) 一节）已经包括了 URL 相关安全问题，而本节专门针对那些仅接受 URL 输入的 API。在 [“安全边界与检查清单”](best-practices/security#security_boundaries_and_checklist) 一节中列出了这些 API。

若 URL 完全来自“可信任”的来源（例如应用自身），则几乎无需担心安全问题。

否则，“不受信任”的 URL 可能有安全问题，例如利用 `javascript:` 协议执行恶意代码。因此，在传入 ECharts 前，应进行校验或净化，通常会依据白名单仅允许安全的协议。


## 传入下载文件名时的安全考虑 [[[#passing_download_filename_safely]]]

目前，仅 [SaveAsImage](${optionPath}toolbox.feature.saveAsImage) 功能需要传入文件名。若该输入来自“可信任”的来源、长度合规且仅包含 ASCII 字母数字（可含`-`、`_`、`.`），则安全。

否则，虽然现代浏览器已显著改进了文件名的自动转义和净化处理（如去除 `../` 之类试图访问上级目录的路径、正确处理特殊字符等），但也存在一些风险，例如不同系统对保留字符的处理有差异，长度限制也不同。此外，旧浏览器或客户端的行为不够明确且不足够可信赖。因此，对这些“不受信任”的文件名仍应在输入前净化处理。


## 传入 JS 函数时的安全考虑 [[[#passing_js_function_safely]]]

ECharts 的 `option`（即 [chart.setOption()](${apiPath}echartsInstance.setOption) 的输入）主要是声明式的，但部分 option 可接受 JS 函数（回调）输入以增强表达能力和灵活性，如 [label.formatter](${optionPath}series-scatter.label.formatter)、[axisTick.interval](${optionPath}xAxis.axisTick.interval) 等。在大多数情况下，这些函数是 app 源代码的一部分于是完全可信任，因此不会引入风险。

但若某些产品允许这些 JS 函数来自于“不受信任”的来源，如用户提供函数，则风险与维护成本显著增加。这种场景实质上与执行“不受信任”的 HTML 代码风险相当，可参考 [“传入 HTML 时的安全考虑”](best-practices/security#passing_raw_html_safely) 中的讨论。
