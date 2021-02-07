// JavaScript Document
exports.shuuid = function () {
    var nwuuid = (+new Date()).toString(36);
    return nwuuid;
};
exports.secpin = function () {
    var newcode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1;
    return newcode;
};

exports.mongo_contains = function (str) {
    // var retcode = "{ $regex: .*" + str + ".*, $options: 'i' }";
    var qstr2 = `.*${str}.*`;
    var retcode = { $regex: qstr2, $options: 'i' };
    return retcode;
};
exports.mongo_notcontains = function (str) {
    // var retcode = "{ $regex: .*" + str + ".*, $options: 'i' }";
    var qstr2 = `^((?!${str}).)*$`;
    var retcode = { $regex: qstr2, $options: 'i' };
    return retcode;
};
exports.mongo_startswith = function (str) {
    // var retcode = "{ $regex: .*" + str + ".*, $options: 'i' }";
    var qstr2 = `^${str}`;
    var retcode = { $regex: qstr2, $options: 'i' };
    return retcode;
};
exports.mongo_endswith = function (str) {
    // var retcode = "{ $regex: .*" + str + ".*, $options: 'i' }";
    var qstr2 = `${str}$`;
    var retcode = { $regex: qstr2, $options: 'i' };
    return retcode;
};

exports.mongo_eq = function (str) {
    var retcode = { $eq: str };
    return retcode;
};
exports.mongo_gt = function (str) {
    var outn = str * 1;
    var retcode = { $gt: outn };
    return retcode;
};
exports.mongo_gte = function (str) {
    var outn = str * 1;
    var retcode = { $gte: outn };
    return retcode;
};
exports.mongo_in = function (str) {
    var newarr = str.split(",")
    var retcode = { $in: newarr };
    return retcode;
};
exports.mongo_lt = function (str) {
    var outn = str * 1;
    var retcode = { $lt: outn };
    return retcode;
};
exports.mongo_lte = function (str) {
    var outn = str * 1;
    var retcode = { $lte: outn };
    return retcode;
};
exports.mongo_ne = function (str) {
    var retcode = { $ne: str };
    return retcode;
};
exports.mongo_nin = function (str) {
    var newarr = str.split(",")
    var retcode = { $nin: newarr };
    return retcode;
};
exports.mongo_exists = function (str) {
    var retcode = { $exists: str };
    return retcode;
};
exports.mongo_where = function (str) {
    var retcode = { $where: str };
    return retcode;
};
exports.mongo_all = function (str) {
    var newarr = str.split(",")
    var retcode = { $all: newarr };
    return retcode;
};
exports.mongo_size = function (str) {
    var retcode = { $size: str };
    return retcode;
};

