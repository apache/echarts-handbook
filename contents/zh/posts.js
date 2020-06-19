/* eslint-disable */
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
    }, {
        title: '事件与行为',
        dir: 'event'
    }]
}, {
    title: '应用篇',
    dir: 'application',
    children: [{
        title: '常用图表类型',
        dir: 'chart-types',
        children: [{
            title: '柱状图',
            dir: 'bar',
            children: [{
                title: '基础折线图',
                dir: 'basic-bar'
            }, {
                title: '堆叠柱状图',
                dir: 'stacked-bar'
            }, {
                title: '动态排序柱状图',
                dir: 'bar-race'
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
            dir: 'line',
            children: [{
                title: '基础折线图',
                dir: 'basic-line'
            }, {
                title: '堆叠折线图',
                dir: 'stacked-line'
            }, {
                title: '区域面积折线图',
                dir: 'area-line'
            }, {
                title: '平滑曲线图',
                dir: 'smooth-line'
            }, {
                title: '阶梯线图',
                dir: 'step-line'
            }]
        }, {
            title: '饼图',
            dir: 'pie',
            children: [{
                title: '基础饼图',
                dir: 'basic-pie'
            }, {
                title: '环形图',
                dir: 'ring'
            }, {
                title: '南丁格尔图（玫瑰图）',
                dir: 'rose'
            }]
        }, {
            title: '散点图',
            dir: 'scatter',
            children: [{
                title: '基础散点图',
                dir: 'basic-scatter'
            }]
        }]
    }, {
        title: '移动端优化',
        dir: 'mobile'
    }, {
        title: '跨平台方案',
        dir: 'cross-platform',
        children: [{
            title: '百度智能小程序',
            dir: 'baidu-app'
        }, {
            title: '微信小程序',
            dir: 'wechat-app'
        }, {
            title: '服务端渲染',
            dir: 'server'
        }]
    }, {
        title: '数据处理',
        dir: 'data',
        children: [{
            title: '动态的异步数据',
            dir: 'dynamic-data'
        }, {
            title: '数据下钻',
            dir: 'drilldown'
        }]
    }, {
        title: '自定义构建',
        dir: 'custom-build'
    }, {
        title: '无障碍访问',
        dir: 'aria'
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
        title: 'Canvas vs. SVG',
        dir: 'canvas-vs-svg'
    }, {
        title: '无障碍访问',
        dir: 'aria'
    }, {
        title: '可视化设计原则',
        dir: 'design'
    }, {
        title: '可视化规范',
        dir: 'chart-specificatio',
        children: [{
            title: '折线图',
            dir: 'line',
            children: [{
                title: '基础折线图',
                dir: 'basic-line'
            }, {
                title: '面积图',
                dir: 'area'
            }, {
                title: '堆叠面积图',
                dir: 'stacked-area'
            }]
        }, {
            title: '柱状图',
            dir: 'bar',
            children: [{
                title: '基础柱状图',
                dir: 'basic-bar'
            }, {
                title: '堆叠柱状图',
                dir: 'stacked-bar'
            }, {
                title: '双向柱状图',
                dir: 'bi-directiona-bar'
            }, {
                title: '分组柱状图',
                dir: 'grouped-bar'
            }]
        }]
    }]
}];
