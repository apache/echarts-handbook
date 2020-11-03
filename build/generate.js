const {exec} = require('child_process');
const fs = require('fs');

console.log('[1/2] Running nuxt generate');
exec('nuxt generate', (error, stdout, stderr) => {
    if (error) {
        console.error(error);
    }
    if (stderr) {
        console.error(stderr);
    }
    if (stdout) {
        console.log(stdout);
    }

    console.log('[2/2] Updating nav.');
    setNav();
});

function setNav() {
    try {
        const navContent = fs.readFileSync('../incubator-echarts-website/components/nav.html', 'utf-8');
        setNavDir('./dist', navContent);
    }
    catch (e) {
        console.error(e);
        console.error('Setting nav failed due to the error loading nav.html. Please make sure you have incubator-echarts-www and incubator-echarts-website project being under the same directory of this repo and have run `npm run build` under incubator-echarts-www.');
    }
}

function setNavDir(path, navContent) {
    let isDir;
    try {
        isDir = fs.lstatSync(path).isDirectory();
    }
    catch (e) {
        console.warn('File not found, ignored:', path);
        return;
    }

    if (isDir) {
        const files = fs.readdirSync(path);
        files.forEach(file => setNavDir(path + '/' + file, navContent));
    }
    else {
        try {
            let content = fs.readFileSync(path, 'utf-8');
            if (content) {
                content = content.replace(
                    '<div id="nav-placeholder">INJECT NAV HERE</div>',
                    navContent
                );
                fs.writeFileSync(path, content, 'utf-8');
            }
        }
        catch (e) {
            console.error('Error:', e);
        }

    }
}
