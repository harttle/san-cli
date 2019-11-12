/**
 * @file url-loader options
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

const {getAssetPath} = require('../../lib/utils'); // eslint-disable-line
const wrapper = require('./loaderWrapper');

module.exports = wrapper((options, {filenameHashing, assetsDir, largeAssetSize = 1024}) => {
    const dir = options.dir;
    delete options.dir;
    return {
        name: 'url-loader',
        loader: 'url-loader',
        options: Object.assign(
            {
                limit: largeAssetSize,
                noquotes: true,
                name: getAssetPath(assetsDir, `${dir}/[name]${filenameHashing ? '.[hash:8]' : ''}.[ext]`)
            },
            options
        )
    };
});
