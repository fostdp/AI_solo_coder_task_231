import { createApp } from '../public/app.module.js';

const mockExhibitData = {
    galleries: [
        {
            id: 'gallery1',
            name: { zh: '古代中国展厅', en: 'Ancient China Gallery', ja: '古代中国展示室' },
            description: { zh: '探索中华文明', en: 'Explore Chinese civilization', ja: '中華文明を探る' },
            mapPosition: { x: 15, y: 30 }
        },
        {
            id: 'gallery2',
            name: { zh: '文艺复兴展厅', en: 'Renaissance Gallery', ja: 'ルネサンス展示室' },
            description: { zh: '欧洲艺术', en: 'European Art', ja: 'ヨーロッパ美術' },
            mapPosition: { x: 60, y: 30 }
        }
    ],
    exhibits: [
        {
            id: 'exhibit1',
            galleryId: 'gallery1',
            name: { zh: '司母戊鼎', en: 'Simuwu Ding', ja: '司母戊鼎' },
            description: { zh: '商代青铜器', en: 'Shang Dynasty bronze', ja: '商代青銅器' },
            audioText: { zh: '欢迎参观司母戊鼎。', en: 'Welcome to the Simuwu Ding.', ja: '司母戊鼎へようこそ。' },
            year: { zh: '商代晚期', en: 'Late Shang Dynasty', ja: '商代後期' },
            mapPosition: { x: 20, y: 35 }
        },
        {
            id: 'exhibit2',
            galleryId: 'gallery2',
            name: { zh: '蒙娜丽莎', en: 'Mona Lisa', ja: 'モナリザ' },
            description: { zh: '达芬奇名作', en: 'Da Vinci masterpiece', ja: 'ダ・ヴィンチの傑作' },
            audioText: { zh: '这是蒙娜丽莎。', en: 'This is the Mona Lisa.', ja: 'これはモナリザです。' },
            year: { zh: '文艺复兴时期', en: 'Renaissance', ja: 'ルネサンス期' },
            mapPosition: { x: 65, y: 35 }
        }
    ]
};

describe('游览路径和推荐功能', () => {
    let app;
    let appApi;
    
    const mockPathData = [
        { id: '1', galleryId: 'gallery1', exhibitId: null, action: 'view_gallery', timestamp: '2026-05-11T04:00:00.000Z' },
        { id: '2', galleryId: 'gallery1', exhibitId: 'exhibit1', action: 'view_exhibit', timestamp: '2026-05-11T04:05:00.000Z' }
    ];
    
    const mockRecommendations = {
        recommendations: [
            {
                id: 'exhibit2',
                galleryId: 'gallery2',
                name: { zh: '蒙娜丽莎', en: 'Mona Lisa', ja: 'モナリザ' },
                score: 95,
                reason: 'popular'
            }
        ],
        visitedCount: 1,
        totalExhibits: 2
    };
    
    beforeEach(async () => {
        global.resetSpeechSynthesis();
        global.clearFetchMockData();
        global.resetFetch();
        global.clearAllTimeouts();
        
        global.setFetchMockData({
            '/api/map': mockExhibitData,
            '/api/exhibits/gallery1': {
                gallery: mockExhibitData.galleries[0],
                exhibits: [mockExhibitData.exhibits[0]]
            },
            '/api/exhibits/gallery2': {
                gallery: mockExhibitData.galleries[1],
                exhibits: [mockExhibitData.exhibits[1]]
            }
        });
        
        app = createApp();
        appApi = await app.init();
        
        const userId = appApi.getUserId();
        global.setFetchMockData({
            [`/api/path/${userId}`]: { paths: mockPathData },
            [`/api/recommendations/${userId}`]: mockRecommendations
        });
    });
    
    describe('路径记录功能', () => {
        test('我的路径按钮应存在', () => {
            const pathBtn = document.getElementById('btn-path');
            expect(pathBtn).not.toBeNull();
        });
        
        test('路径视图应包含统计区域', async () => {
            await appApi.showPathView();
            
            const pathStats = document.getElementById('path-stats');
            expect(pathStats).not.toBeNull();
        });
        
        test('路径列表应存在', async () => {
            await appApi.showPathView();
            
            const pathList = document.getElementById('path-list');
            expect(pathList).not.toBeNull();
        });
        
        test('访问展厅应记录路径', async () => {
            await appApi.selectGallery('gallery1');
            
            const fetchCalls = global.getFetchCalls();
            const pathAddCalls = fetchCalls.filter(c => c.url.includes('/api/path/add'));
            
            expect(pathAddCalls.length).toBeGreaterThan(0);
        });
        
        test('访问展品应记录路径', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const fetchCalls = global.getFetchCalls();
            const pathAddCalls = fetchCalls.filter(c => c.url.includes('/api/path/add'));
            
            expect(pathAddCalls.length).toBeGreaterThan(1);
        });
    });
    
    describe('推荐路线功能', () => {
        test('推荐路线按钮应存在', () => {
            const recommendBtn = document.getElementById('btn-recommend');
            expect(recommendBtn).not.toBeNull();
        });
        
        test('推荐视图应包含摘要区域', async () => {
            await appApi.showRecommendView();
            
            const recommendSummary = document.getElementById('recommend-summary');
            expect(recommendSummary).not.toBeNull();
        });
        
        test('推荐列表应存在', async () => {
            await appApi.showRecommendView();
            
            const recommendList = document.getElementById('recommend-list');
            expect(recommendList).not.toBeNull();
        });
        
        test('推荐列表应显示推荐展品', async () => {
            await appApi.showRecommendView();
            
            await Promise.resolve();
            await Promise.resolve();
            
            const recommendList = document.getElementById('recommend-list');
            const recommendItems = recommendList.querySelectorAll('.recommend-item');
            
            expect(recommendItems.length).toBeGreaterThan(0);
        });
    });
    
    describe('用户ID管理', () => {
        test('应生成用户ID', () => {
            const userId = appApi.getUserId();
            expect(userId).not.toBeNull();
            expect(typeof userId).toBe('string');
            expect(userId.length).toBeGreaterThan(0);
        });
        
        test('用户ID应持久化到localStorage', () => {
            const userId = appApi.getUserId();
            const storedUserId = localStorage.getItem('museum_user_id');
            
            expect(storedUserId).toBe(userId);
        });
    });
    
    describe('路径统计', () => {
        test('应显示已访问展品数量', async () => {
            await appApi.showPathView();
            
            await Promise.resolve();
            await Promise.resolve();
            
            const pathStats = document.getElementById('path-stats');
            expect(pathStats.innerHTML).toContain('1');
        });
        
        test('应显示路径列表', async () => {
            await appApi.showPathView();
            
            await Promise.resolve();
            await Promise.resolve();
            
            const pathList = document.getElementById('path-list');
            const pathItems = pathList.querySelectorAll('.path-item');
            
            expect(pathItems.length).toBe(2);
        });
    });
});
