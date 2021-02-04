const { http, https } = require('follow-redirects');
const querystring = require('querystring');
const pkg = require('../../package.json');

module.exports = {

    send: async function(options) {
        let url = this.parseRequired(options.url, 'string', 'api.send: url is required.');
        let method = this.parseOptional(options.method, 'string', 'GET');
        let data = this.parseOptional(options.data, '*', '');
        let dataType = this.parseOptional(options.dataType, 'string', 'auto');
        let verifySSL = this.parseOptional(options.verifySSL, 'boolean', false);
        let params = this.parseOptional(options.params, 'object', null);
        let headers = this.parseOptional(options.headers, 'object', {});
        let username = this.parseOptional(options.username, 'string', '');
        let password = this.parseOptional(options.password, 'string', '');
        let oauth = this.parseOptional(options.oauth, 'string', '');
        let passErrors = this.parseOptional(options.passErrors, 'boolean', true);
        let timeout = this.parseOptional(options.timeout, 'number', 0);

        if (params) {
            url += '?' + querystring.stringify(params);
        }

        if (dataType == 'auto' && method == 'POST') {
            dataType = 'x-www-form-urlencoded';
        }

        if (dataType != 'auto' && !headers['Content-Type']) {
            headers['Content-Type'] = `application/${dataType}`;
        }

        if (dataType == 'x-www-form-urlencoded') {
            data = querystring.stringify(data);
        } else if (typeof data != 'string') {
            data = JSON.stringify(data);
        }

        if (data) {
            headers['Content-Length'] = data.length;
        }

        const Url = new URL(url);
        const opts = { method, headers, rejectUnauthorized: !!verifySSL };

        if (timeout > 0) {
            opts.timeout = timeout;
        }

        if (username || password) {
            opts.auth = `${username}:${password}`;
        }

        if (oauth) {
            //const provider = this.oauth[oauth];
            const provider = await this.getOAuthProvider(oauth);
            if (provider && provider.access_token) {
                headers['Authorization'] = 'Bearer ' + provider.access_token;
            }
        }

        headers['User-Agent'] = `${pkg.name}/${pkg.version}`;
        headers['Accept'] = 'application/json';

        return new Promise((resolve, reject) => {
            const req = (Url.protocol == 'https:' ? https : http).request(Url, opts, res => {
                let body = '';
                res.setEncoding('utf8');
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    if (passErrors && res.statusCode >= 400) {
                        this.res.status(res.statusCode).send(body);
                        return reject();
                    }

                    if (body.charCodeAt(0) === 0xFEFF) {
                        body = body.slice(1);
                    }

                    if (res.headers['content-type'] && res.headers['content-type'].includes('json')) {
                        try {
                            body = JSON.parse(body);
                        } catch(e) {
                            console.error(e);
                        }
                    }

                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data: body
                    });
                });
            });

            req.on('error', reject);
            req.write(data);
            req.end();
        });
    },

};