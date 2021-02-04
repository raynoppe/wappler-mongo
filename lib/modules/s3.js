const fs = require('fs-extra');
const mime = require('mime-types');
const { join } = require('path');
const { toSystemPath } = require('../core/path');

module.exports = {

    provider: function(options, name) {
        this.setS3Provider(name, options);
    },

    createBucket: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.createBucket: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.createBucket: bucket is required.');
        const ACL = this.parseOptional(options.acl, 'string', null);
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.createBucket({ Bucket, ACL }).promise();
    },

    listBuckets: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.listBuckets: provider is required.');
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.listBuckets({}).promise();
    },

    deleteBucket: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.deleteBucket: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.deleteBucket: bucket is required.');
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.deleteBucket({ Bucket }).promise();
    },

    listFiles: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.listFiles: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.listFiles: bucket is required.');
        const MaxKeys = this.parseOptional(options.maxKeys, 'number', null);
        const Prefix = this.parseOptional(options.prefix, 'string', null);
        const ContinuationToken = this.parseOptional(options.continuationToken, 'string', null);
        const StartAfter = this.parseOptional(options.startAfter, 'string', null);
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.listObjectsV2({ Bucket, MaxKeys, Prefix, ContinuationToken, StartAfter }).promise();
    },

    putFile: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.uploadFile: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.uploadFile: bucket is required.');
        const path = toSystemPath(this.parseRequired(options.path, 'string', 's3.uploadFile: path is required.'));
        const Key = this.parseRequired(options.key, 'string', 's3.uploadFile: key is required.');
        const ContentType = mime.lookup(Key) || 'application/octet-stream';
        const ACL = this.parseOptional(options.acl, 'string', null);
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        let Body = fs.createReadStream(path);

        return s3.upload({ Bucket, ACL, Key, ContentType, Body }).promise();
    },

    getFile: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.downloadFile: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.downloadFile: bucket is required.');
        const Key = this.parseRequired(options.key, 'string', 's3.downloadFile: key is required.');
        const path = toSystemPath(this.parseRequired(options.path, 'string', 's3.downloadFile: path is required.'));
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        let writer = fs.createWriteStream(join(path, Key));

        s3.getObject({ Bucket, Key }).createReadStream().pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    },

    deleteFile: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.deleteFile: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.deleteFile: bucket is required.');
        const Key = this.parseRequired(options.key, 'string', 's3.deleteFile: key is required.');
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.deleteObject({ Bucket, Key }).promise();
    },

    signDownloadUrl: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.signDownloadUrl: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.signDownloadUrl: bucket is required.');
        const Key = this.parseRequired(options.key, 'string', 's3.signDownloadUrl: key is required.');
        const Expires = this.parseOptional(options.expires, 'number', 300);
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.getSignedUrl('getObject', { Bucket, Key, Expires });
    },

    signUploadUrl: async function(options) {
        const provider = this.parseRequired(options.provider, 'string', 's3.signUploadUrl: provider is required.');
        const Bucket = this.parseRequired(options.bucket, 'string', 's3.signUploadUrl: bucket is required.');
        const Key = this.parseRequired(options.key, 'string', 's3.signUploadUrl: key is required.');
        const ContentType = this.parseOptional(options.contentType, 'string', mime.lookup(Key) || 'application/octet-stream');
        const Expires = this.parseOptional(options.expires, 'number', 300);
        const ACL = this.parseOptional(options.acl, 'string', null);
        const s3 = this.getS3Provider(provider);

        if (!s3) throw new Error(`S3 provider "${provider}" doesn't exist.`);

        return s3.getSignedUrl('putObject', { Bucket, Key, ContentType, Expires, ACL });
    }

};