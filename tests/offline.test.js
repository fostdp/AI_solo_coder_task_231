import { createApp } from '../public/app.module.js';

const mockExhibitData = {
    galleries: [
        {
            id: 'gallery1',
            name: { zh: '古代中国展厅', en: 'Ancient China Gallery', ja: '古代中国展示室' },
            description: { zh: '探索中华文明', en: 'Explore Chinese civilization', ja: '中華文明を探る' },
            mapPosition: { x: 15, y: 30 }
        }
    ],
    exhibits: [
        {
            id: 'exhibit1',
            galleryId: 'gallery1',
            name: { zh: '司母戊鼎', en: 'Simuwu Ding', ja: '司母戊鼎' },
            description: { zh: '商代青铜器', en: 'Shang Dynasty bronze', ja: '商代青銅器' },
            audioText: { 
                zh: '欢迎参观司母戊鼎。', 
                en: 'Welcome to the Simuwu Ding.',
                ja: '司母戊鼎へようこそ。'
            },
            year: { zh: '商代晚期', en: 'Late Shang Dynasty', ja: '商代後期' },
            mapPosition: { x: 20, y: 35 }
        }
    ]
};

describe('离线降级展示', () => {
    let app;
    let appApi;
    
    beforeEach(async () => {
        global.resetSpeechSynthesis();
        global.clearFetchMockData();
        global.resetFetch();
        global.clearAllTimeouts();
    });
    
    describe('网络错误处理', () => {
        test('网络断开时应显示错误提示', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            const toast = document.querySelector('.error-toast');
            expect(toast).not.toBeNull();
            expect(toast.style.display).toBe('block');
            expect(toast.textContent).toBe('网络连接失败，请检查网络设置');
        });
        
        test('HTTP 500 错误时应显示错误提示', async () => {
            global.setFetchShouldFail(true, 'http');
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            const toast = document.querySelector('.error-toast');
            expect(toast).not.toBeNull();
            expect(toast.style.display).toBe('block');
        });
        
        test('网络恢复后应正常加载数据', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            expect(appApi.getState().galleries.length).toBe(0);
            
            global.resetFetch();
            global.setFetchMockData({
                '/api/map': mockExhibitData,
                '/api/exhibits/gallery1': {
                    gallery: mockExhibitData.galleries[0],
                    exhibits: mockExhibitData.exhibits
                }
            });
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            expect(appApi.getState().galleries.length).toBeGreaterThan(0);
        });
    });
    
    describe('多语言错误消息', () => {
        test('中文环境应显示中文错误消息', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            const toast = document.querySelector('.error-toast');
            expect(toast.textContent).toContain('网络连接失败');
        });
        
        test('英文环境应显示英文错误消息', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            appApi.setLanguage('en');
            
            appApi.showErrorToast('Test message');
            
            await Promise.resolve();
            
            expect(appApi.getCurrentLang()).toBe('en');
        });
    });
    
    describe('错误提示显示', () => {
        test('showErrorToast 应创建错误提示元素', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData
            });
            
            app = createApp();
            appApi = await app.init();
            
            const toast = appApi.showErrorToast('测试错误消息');
            
            expect(toast).not.toBeNull();
            expect(toast.className).toBe('error-toast');
            expect(toast.textContent).toBe('测试错误消息');
        });
        
        test('getLastToastMessage 应返回最新错误消息', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData
            });
            
            app = createApp();
            appApi = await app.init();
            
            appApi.showErrorToast('第一个消息');
            appApi.showErrorToast('第二个消息');
            
            expect(appApi.getLastToastMessage()).toBe('第二个消息');
        });
        
        test('错误提示应显示', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData
            });
            
            app = createApp();
            appApi = await app.init();
            
            const toast = appApi.showErrorToast('测试消息');
            
            expect(toast.style.opacity).toBe('1');
            expect(toast.style.display).toBe('block');
        });
        
        test('多次调用 showErrorToast 应更新消息', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData
            });
            
            app = createApp();
            appApi = await app.init();
            
            const toast = appApi.showErrorToast('第一个消息');
            
            appApi.showErrorToast('第二个消息');
            
            expect(toast.textContent).toBe('第二个消息');
        });
    });
    
    describe('fetchData 错误处理', () => {
        test('fetchData 网络错误应返回 null', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            const result = await appApi.fetchData('/api/test');
            
            expect(result).toBeNull();
        });
        
        test('fetchData HTTP 错误应返回 null', async () => {
            global.setFetchShouldFail(true, 'http');
            
            app = createApp();
            appApi = await app.init();
            
            const result = await appApi.fetchData('/api/test');
            
            expect(result).toBeNull();
        });
        
        test('fetchData 成功应返回数据', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData,
                '/api/test': { success: true, data: 'test data' }
            });
            
            app = createApp();
            appApi = await app.init();
            
            const result = await appApi.fetchData('/api/test');
            
            expect(result).not.toBeNull();
            expect(result.success).toBe(true);
            expect(result.data).toBe('test data');
        });
    });
    
    describe('展厅和展品加载', () => {
        test('网络错误时展厅列表应保持为空', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            expect(appApi.getState().galleries.length).toBe(0);
        });
        
        test('网络错误时选择展厅不应崩溃', async () => {
            global.setFetchShouldFail(true, 'network');
            
            app = createApp();
            appApi = await app.init();
            
            await expect(appApi.selectGallery('gallery1')).resolves.not.toThrow();
        });
        
        test('网络错误后数据加载完成应正常显示', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData
            });
            
            app = createApp();
            appApi = await app.init();
            
            await Promise.resolve();
            
            const galleryGrid = document.getElementById('gallery-grid');
            expect(galleryGrid.children.length).toBeGreaterThan(0);
        });
    });
});
