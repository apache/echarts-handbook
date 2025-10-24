# Security Guidelines

## Overview

ECharts aims to provide rich and flexible visualization capabilities. Although the vast majority of its APIs do not require special security considerations, sereval APIs are exceptions. For example, the option `tooltip.formatter` accepts a raw HTML string, allowing full control over the component's content and layout; the option `title.link` uses the provided URL string directly without automatic sanitization. While this flexibility is powerful, security risks may arise if the input comes from untrusted sources. These APIs are listed below, along with suggestions on how to use these features safely.

Any security issues can be reported according to [ASF Security Page](https://echarts.apache.org/en/security.html).

Note: This document is intended for ECharts API callers. [Security Checklist for Code Contributors](https://github.com/apache/echarts/wiki/Security-Checklist-for-Code-Contributors) is another document used before submitting a pull request to ECharts. It is not intended for ECharts API callers, but they may refer to it if interested.


## Security Model and Checklist [[[#security_model_and_checklist]]]

ECharts focuses on visualization logic. It generally assumes that inputs originate from trusted sources and does not perform automatic sanitization, as in the case with most frontend UI libraries. In fact, ECharts itself cannot properly sanitize untrusted inputs, because it can not determine which inputs are untrusted, and no universal sanitization rules fit all cases. However, ECharts should clearly identify which APIs (especially ECharts options) require security-related preprocessing or considerations in specific use cases. Given the large number of ECharts options, preprocess all inputs in every case would be impractical and unnecessary.

ECharts renders using Canvas or SVG, except for several special components that allow HTML rendering (e.g., [toolip](${optionPath}tooltip), [dataView](${optionPath}toolbox.feature.dataView)). ECharts APIs accept Non-JS-function inputs and JS-function inputs. JS-function inputs are intended to be execute. Most non-JS-function inputs (e.g., plain text provided to be rendered) are treated as data only, and are inherently prevented from code evaluation and execution. Therefore, they generally do not require sanitization from malicious code. However, several APIs allow embeding potential unsafe content (for example, raw HTML or raw URLs) into the page. These APIs are powerful but vulnerable to Cross-Site Scripting (XSS) and related attacks if the inputs originate from untrusted sources.

**Generally speaking, if no untrusted content is involved, these injection vulnerabilities will not arise.** Untrusted content refers to content that originates from a source that can not be fully controlled, or that can be modified or injected by users or external systems. Developers must assume it unsafe to use directly in HTML, CSS and JS. For example, content is untrusted if it is produced by users or received from a client. However, handling user-provided content is often unavoidable. For example, when rendering user data fetched from a database inside an HTML-based `tooltip` through a customized formatter, additional processing is required to ensure correctness (typically by HTML escaping) and to prevent XSS and related attacks (typically by sanitizing any untrusted parts if they can not be unescaped to plain text).

Before deploying charts, please review this **checklist** to ensure your usage is safe:

| APIs | Potential Risks and Suggestions |
| ------|------------------ |
| **option [tooltip.formatter](${optionPath}tooltip.formatter)**<br>· `formatter` allows HTML string or DOM elements input, which are later rendered directly inside the tooltip, where XSS risks need to be considered.<br>(exceptions): A string directly set to the `formatter` is treated as a simple template for later combining with data internally. [tooltip.renderMode: 'richText'](${optionPath}tooltip.renderMode) is another level of templating syntax for styling. Both of them are internally implemented and safe from injection.<br><br>**option [toolbox.feature.dataView.optionToContent](${optionPath}toolbox.feature.dataView.optionToContent)**<br>**option [toolbox.feature.dataView.title](${optionPath}toolbox.feature.dataView.title)**<br>**option [toolbox.feature.dataView.lang](${optionPath}toolbox.feature.dataView.lang)**<br>· The `tooltip.dataView` panel is fully rendered in HTML. Certain parts of the HTML string are allowed to be customized via these APIs. | XSS risks should be considered. In most cases, HTML escaping alone is sufficient. But if any unescaped parts originate from untrusted sources, more measures are required (e.g., sanitization, sandboxing).<br><br>See section ["Passing Raw HTML Safely"](${lang}/best-practices/security#passing_raw_html_safely) for safe usage recommendations. |
| **option [tooltip.extraCssText](${optionPath}tooltip.extraCssText)**<br>· `extraCssText` accepts a raw CSS style string for later directly appending to `tooltipEl.style.cssText`(via the DOM API).<br>(exceptions): this option is not applicable when [tooltip.renderMode: 'richText'](${optionPath}tooltip.renderMode).<br> | Safe if the input comes from trusted sources; otherwise, a careful assessment is required.<br><br>See section ["Passing inline CSS Safely"](${lang}/best-practices/security#passing_inline_css_safely) for details. |
| **option [title.link](${optionPath}title.link)**<br>**option [title.sublink](${optionPath}title.sublink)**<br>**option [series-treemap.data.link](${optionPath}series-treemap.data.link)**<br>**option [series-sunburst.data.link](${optionPath}series-sunburst.data.link)**<br>· They accept raw URLs directly for these links. | Safe if the input comes from trusted sources; otherwise, XSS risks should be considered.<br><br>See section ["Passing Raw URLs Safely"](${lang}/best-practices/security#passing_raw_urls_safely) for safe usage recommendations.
**option [toolbox.feature.saveAsImage.name](${optionPath}toolbox.feature.saveAsImage.name)**<br>**option [toolbox.feature.saveAsImage.type](${optionPath}toolbox.feature.saveAsImage.type)**<br>**option [title[0].text](${optionPath}title.text)**<br>· The download filename is assembled by `{name}.{type}` without validation or sanitization. If `name` is not provided, `title[0].text` (if any) has historically been used instead, although this usage is not recommended. | See section ["Passing Download Filename Safely"](${lang}/best-practices/security#passing_download_filename_safely) for safe usage recommendations. |
| All JS-function inputs (callbacks) | This is generally not a concern, unless special requirements involve untrusted code.<br><br>See section ["Passing JS Function Safely"](${lang}/best-practices/security#passing_js_function_safely) for details. |


## Passing Raw HTML Safely [[[#passing_raw_html_safely]]]

Section ["Security Model and Checklist"](${lang}/best-practices/security#security_model_and_checklist) have listed the APIs that accept raw HTML directly. Untrusted HTML may lead to XSS and related attacks, so additional processing is required before passing content to ECharts. Several commonly used mitigation approaches -- "HTML Escaping", "Sanitization", "Sandboxing" are described below. In most cases, "HTML Escaping" is sufficient, except when unescaped content comes from untrusted sources.

### HTML Escaping [[[#passing_raw_html_safely_html_escaping]]]
HTML escaping is always necessary for data before assembling it to an HTML string -- not only for security, but also for the basic correctness of display.

A typical and simplest HTML escaping implementation is these character conversions:
```
'&' => '&amp;'
'<' => '&lt;'
'>' => '&gt;'
'"' => '&quot;'
"'" => '&#39;
```
It removes the functionality from the markup characters, thereby closing the attack vector for code injection (e.g., `<script>...</script>`), regardless of whether the content is trusted or untrusted.

For example,
```js
// Incorrect and unsafe.
formatter: params => {
    const { name, value } = params;
    // May cause incorrect rendering if `name` or `value` contain functional
    // charactors like '<', '>', etc.
    // Additionally, it introduces XSS risks if `name` or `value` come from
    // untrusted sources, where malicious code may be injected into that strings.
    return `${name}, <b>${value + ''}</b>`;
}
// Correct and safe.
formatter: params => {
    const { name, value } = params;
    return `${echarts.format.encodeHTML(name)}, <b>${echarts.format.encodeHTML(value + '')}<b/>`;
}
```

Other approaches, like using DOM API `.textContent = `, can also escape HTML.

In most use cases, untrusted content (e.g., user-provided text) is only used for display as plain text, while markup tokens (i.e., parts not meant to be escaped, such as HTML tags or attributes) are fully controlled by the application owner and therefore trusted. In this scenario, HTML escaping alone is an effective and simple way to prevent from XSS, as lone as all untrusted content is properly escaped.

### Sanitization [[[#passing_raw_html_safely_sanitization]]]

Some use cases require untrusted markup tokens to be interpreted as actual markup. For example, text from a database may include styling or functional tags (e.g., `<em>`, `<a href="...">`) that are meant to be interpreted rather than displayed as plain text. Another example is that users or untrusted sources are allowed to provide HTML templates that define structures and styles, which are later combined with data content to produce the final renderable HTML and passed to ECharts.

In these cases, the security risks are heightened. Sanitization can be applied to mitigate those risks, provided that no embedded JS and CSS code is allowed to execute. A sanitizer filters HTML content based on predefined whitelists -- for example, removing `<script>` and `<style>` blocks, `<link>` elements, inline CSS, event handler attributes such as `onclick`, and URLs using `javascript:` protocol. It's recommended to use a well-maintained and widely adopted sanitizer rather than writing your own regex or manual string manipulations.

Sanitization may be enforced on the client-side, on the server-side, or both, depending on the product requirements and threat model. For example, concerning content that originates from client (e.g., submitted by users), relying only on client-side sanitization is insufficient because an attacker can bypass the client and submit crafted payloads directly to the server. For instance, an online visual editor lets users compose posts in a WYSIWYG fashion, where users can choose from several built-in HTML snippets/templates or JS-functions (e.g., for [tooltip.formatter](${optionPath}tooltip.formatter) or [label.formatter](${optionPath}series-scatter.label.formatter)). If the selected or generated HTML text or JS-function text are sent from client to server and persisted to the database without any additional handling, an attacker can simulate a network request to inject malicious code. Later, when those options are retrieved and passed to [chart.setOption()](${apiPath}echartsInstance.setOption), the malicious code will execute. There are some recommended mitigations for this case:
+ Persist only reference (IDs) to this built-in snippets/tempates or JS-functions, not raw code supplied by client.
+ If user-provided snippets are allowed for expressiveness (beyond built-in selections), some third-party string templating libraries may be introduced to preventing injection.
+ If user-provided snippets must allow HTML (beyond the approaches above), enforce strict server-side sanitization or validation before persisting. This should include removing all JS, CSS, and other potentially unsafe content. Additionally, consider using a sandboxed iframe to limit the potential impact of any remaining security issues.

Achieving sufficient security through sanitization is sometimes not easy. It requires proper configurations, must be kept up to date with browers changes, and often needs to be combined with other defense mechanisms to be "safe enough" for most real-world use cases. HTML is extremely complex -- the more features are allowed in untrusted content, the more potential attack vectors are introduced.

### Sandboxing [[[#passing_raw_html_sandboxing]]]

If executing untrusted code is required, or other measures are considered insufficient, a sandboxed iframe can provide a higher level of security, as used by services like JSFiddle and CodePen.


## Passing inline CSS Safely [[[#passing_inline_css_safely]]]

Although CSS safety issues are covered by the discussion about HTML safety (see section ["Passing Raw HTML Safely"](${lang}/best-practices/security#passing_raw_html_safely)), this section focuses on the APIs that only accept inline CSS strings (those that modify `style` attribute via the DOM API `.style.cssText =`), which are listed in section ["Security Model and Checklist"](${lang}/best-practices/security#security_model_and_checklist).

If the inline CSS strings come entirely from trusted sources (e.g., they are part of your application), security considerations are minimal -- this is also the most common case.

Otherwise, untrusted CSS can lead to attacks. Some widely adopted HTML sanitizers support CSS sanitization, but may remove all CSS by default, since sanitizing CSS properly is quite complex. Therefore, accepting untrusted CSS requires meticulous assessment base on the specific use case.


## Passing Raw URLs Safely [[[#passing_raw_urls_safely]]]

Although URL safety issues is covered by the discussion of HTML safety (see section ["Passing Raw HTML Safely"](${lang}/best-practices/security#passing_raw_html_safely)), this section focuses on the APIs that only accept URL strings, which is listed in section ["Security Model and Checklist"](${lang}/best-practices/security#security_model_and_checklist).

If the URL strings are entirely from trusted sources (e.g., they are part of your application), security considerations are minimal.

Otherwise, untrusted URL strings can lead to attacks, for example, by using protocols, such as `javascript:` or `data:`, to execute malicious code. Therefore, before passing them to ECharts, sanitization should be enforced, typically by validating the protocol against a specified whitelist.


## Passing Download Filename Safely [[[#passing_download_filename_safely]]]

Currently, only the [saveAsImage](${optionPath}toolbox.feature.saveAsImage) feature accepts an input as a filename. This input can be considered safe if it originates from trusted sources, does not exceed the length limit, and contains exclusively ASCII alphabetic characters.

Otherwise, although modern browsers have significantly improved their handling of unsanitized download filenames (e.g., path traversal sequences `../`, `..\\` are stripped, and special characters are correctly handled), some risks still remain, including the inconsistent behaviors with reserved characters and length limitations. Furthermore, the behavior of older clients or browsers is unclear and less robust. Therefore, sanitization or preprocessing are required for these untrusted inputs.


## Passing JS Function Safely [[[#passing_js_function_safely]]]

ECharts options (i.e., the input to [chart.setOption()](${apiPath}echartsInstance.setOption)) are primarily declarative, but some options accept JS-function (callbacks) to provide greater expressiveness and flexibility. Examples include [label.formatter](${optionPath}series-scatter.label.formatter), [axisTick.interval](${optionPath}xAxis.axisTick.interval), and similar. In most use cases, these JS-function options are part of the source code of the application itself and thus fully trusted, so no security risk is introduced.

However, certain products may allow JS-function options to originate from untrusted sources, for example, end users. Allowing this introduces both security risks and maintenance costs. Essentially, this scenario carries the same level of risk as allowing code execution in untrusted raw HTML, and can be mitigated using similar approaches, as discussed in ["Passing Raw HTML Safely"](${lang}/best-practices/security#passing_raw_html_safely).

