const { exec } = require('child_process');
const fs = require('fs');

const dir = './contents';

const entries = {};
const paths = [];

const loopDir = path => {
    if (fs.lstatSync(path).isDirectory()) {
        const children = fs.readdirSync(path);
        children.forEach(child => loopDir([path, child].join('/')));
    }
    else {
        paths.push(path);
    }
}

loopDir(dir);

for (let i = 0; i < paths.length; ++i) {
    const cmd = `git log --pretty=format:"%an%x09" ${paths[i]} | sort | uniq`;
    (i => {
        exec(cmd, (err, stdout) => {
            if (err) {
                console.error(err);
            }
            else {
                const key = paths[i].slice(2);
                entries[key] = stdout.trim().replace('\t\n', ',').split(',');
            }
            if (i === paths.length - 1) {
                const text = 'export default ' + JSON.stringify(entries, null, '    ') + ';';
                fs.writeFileSync('pages/helper/contributors.ts', text);
            }
        });
    })(i);
}
