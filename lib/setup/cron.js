const fs = require('fs-extra');
const { isEmpty } = require('./util');
const debug = require('debug')('server-connect:cron');

exports.start = () => {
    if (isEmpty('app/schedule')) return;

    debug('Start schedule');

    const schedule = require('node-schedule');
    const entries = fs.readdirSync('app/schedule', { withFileTypes: true });

    for (let entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.json')) {
            try {
                const job = fs.readJSONSync(`app/schedule/${entry.name}`);
                const rule = job.settings.options.rule;

                debug(`Adding schedule ${entry.name}`);

                if (rule == '@reboot') {
                    setImmediate(exec(job.exec));
                } else {
                    schedule.scheduleJob(rule, exec(job.exec))
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
};

function exec(action) {
    return async () => {
        const App = require('../core/app');
        const app = new App({ params: {}, session: {}, cookies: {}, signedCookies: {}, query: {}, headers: {} });
        return app.define(action, true);
    }
}