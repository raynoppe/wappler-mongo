// JavaScript Document
exports.return_json = async function (options) {
    var pass = this.parse(options.pass);
    var usestatus = this.parse(options.usestatus);
    var usemethod = this.parse(options.usemethod);
    console.log('usemethod', usemethod, usestatus);
    var outbound = {};
    switch (pass) {
        case 'custom':
            var retdata = this.parse(options.vars);
            if (usemethod == 'toclient') {
                this.res.status(usestatus).json(retdata);
            } else {
                return retdata;
            }
            break;
        case 'simple':
            var usename = this.parse(options.usename);
            var inbound = this.parse(options.inbound);
            outbound[usename] = inbound;
            // return inbound;
            if (usemethod == 'toclient') {
                console.log('here')
                this.res.status(usestatus).json(outbound);
            } else {
                return outbound;
            }
            break;
        default:
            var inbound = this.parse(options.inbound);
            if (usemethod == 'toclient') {
                this.res.status(usestatus).json(inbound);
            } else {
                return inbound;
            }
    }
}