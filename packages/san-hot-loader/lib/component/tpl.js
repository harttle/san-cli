/**
 * @file component-hmr.js
 * @author tanglei02 (tanglei02@baidu.com)
 */

const path = require('path');
const genId = require('../utils/gen-id');
const componentHmrPath = require.resolve('../runtime/component-client-api');
const utilsPath = require.resolve('../runtime/utils');

module.exports = function ({
    resourcePath
}) {
    const context = path.dirname(resourcePath);
    const componentId = genId(resourcePath, context);
    return `
    if (module.hot) {
        var __HOT_API__ = require('${componentHmrPath}');
        var __HOT_UTILS__ = require('${utilsPath}');

        var __SAN_COMPONENT__ = __HOT_UTILS__.getExports(module);
        if (__SAN_COMPONENT__.template || __SAN_COMPONENT__.prototype.template) {
            module.hot.accept();
            __HOT_API__.install(require('san'));

            var __HMR_ID__ = '${componentId}';
            if (!module.hot.data) {
                __HOT_API__.createRecord(__HMR_ID__, __SAN_COMPONENT__);
            }
            else {
                __HOT_API__.hotReload(__HMR_ID__, __SAN_COMPONENT__);
            }
        }
    }
    `;
};
