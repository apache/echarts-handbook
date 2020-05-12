/**
 * 这个文件决定了导航栏的数据，顺序即为以下元素定义的顺序。
 * title 是导航栏中显示的标题，md 文件中的一级标题是正文标题，两者可以不同。
 */
export default [{
    title: '关于本项目（临时）',
    dir: 'meta',
    children: [{
        title: '项目结构说明',
        dir: 'get-started'
    }, {
        title: '写作风格规范',
        dir: 'writing'
    }]
}, {
    title: '快速上手',
    dir: 'get-started'
}, {
    title: '入门篇',
    dir: 'basics',
    children: [{
        title: '下载',
        dir: 'download'
    }, {
        title: '资源列表',
        dir: 'resource'
    }, {
        title: '获取灵感',
        dir: 'inspiration'
    }, {
        title: '寻求帮助',
        dir: 'help'
    }]
}, {
    title: '概念篇',
    dir: 'concepts',
    children: [{
        title: '图表容器及大小',
        dir: 'chart-size'
    }, {
        title: '配置项基本概念',
        dir: 'options'
    }, {
        title: '系列',
        dir: 'series'
    }, {
        title: '坐标系',
        dir: 'coordinate'
    }, {
        title: '坐标轴',
        dir: 'axis'
    }, {
        title: '视觉映射',
        dir: 'visual-map'
    }, {
        title: '图例',
        dir: 'legend'
    }, {
        title: '提示框',
        dir: 'tooltip'
    }]
}, {
    title: '应用篇',
    dir: 'cookbook',
    children: [{
        title: '移动端优化',
        dir: 'mobile'
    }, {
        title: '跨平台方案',
        dir: 'cross-platform'
    }, {
        title: '无障碍访问',
        dir: 'aria'
    }, {
        title: '数据下钻',
        dir: 'downplay'
    }, {
        title: '多图联动',
        dir: 'connect'
    }]
}, {
    title: '最佳实践',
    dir: 'best-practice',
    children: [{
        title: '移动端优化',
        dir: 'mobile'
    }, {
        title: '可视化设计原则',
        dir: 'design'
    }]
}, {
    title: '常用图表类型',
    dir: 'chart-types',
    children: [{
        title: '柱状图',
        dir: 'bar',
        children: [{
            title: '最简单的柱状图',
            dir: 'simple-bar'
        }, {
            title: '堆叠柱状图',
            dir: 'stacked-bar'
        }, {
            title: '极坐标系柱状图',
            dir: 'polar-bar'
        }, {
            title: '瀑布图',
            dir: 'waterfall'
        }, {
            title: '视觉映射的柱状图',
            dir: 'visual-map'
        }]
    }, {
        title: '折线图',
        dir: 'line'
    }, {
        title: '……',
        dir: 'xxx'
    }]
}];
