/**
 * @file PluginAPI test
 * @author yanyiting <yanyiting@baidu.com>
 */

import PluginAPI from '../PluginAPI';

let pluginApi = null;
beforeEach(() => {
    pluginApi = new PluginAPI('plugin-yyt', {
        mode: 'production',
        webpackChainFns: [],
        webpackRawConfigFns: [],
        cwd: 'user/yyt'
    });
});

test('测试isProd', () => {
    expect(pluginApi.isProd()).toBeTruthy();
});

test('测试chainWebpack', () => {
    const cb = jest.fn();
    pluginApi.chainWebpack(cb);
    expect(pluginApi.service.webpackChainFns.length).toBe(1);
});

test('测试configWebpack', () => {
    const cb = jest.fn();
    pluginApi.configWebpack(cb);
    expect(pluginApi.service.webpackRawConfigFns.length).toBe(1);
});

test('测试resolve', () => {
    expect(pluginApi.resolve('index.js')).toMatch('user/yyt/index.js');
});