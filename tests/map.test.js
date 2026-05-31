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
            description: { zh: '欧洲艺术', en: 'European art', ja: 'ヨーロッパ美術' },
            mapPosition: { x: 55, y: 30 }
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
        },
        {
            id: 'exhibit2',
            galleryId: 'gallery1',
            name: { zh: '兰亭序', en: 'Lanting Xu', ja: '蘭亭序' },
            description: { zh: '王羲之书法', en: 'Wang Xizhi calligraphy', ja: '王羲之の書道' },
            audioText: { 
                zh: '现在您看到的是王羲之的兰亭序。', 
                en: 'Now you are looking at Wang Xizhi\'s Lanting Xu.',
                ja: '今、ご覧になっているのは王羲之の蘭亭序です。'
            },
            year: { zh: '东晋', en: 'Eastern Jin', ja: '東晋' },
            mapPosition: { x: 35, y: 40 }
        }
    ]
};

describe('地图坐标响应式', () => {
    let app;
    let appApi;
    
    beforeEach(async () => {
        global.resetSpeechSynthesis();
        global.clearFetchMockData();
        global.resetFetch();
        global.clearAllTimeouts();
        
        global.setFetchMockData({
            '/api/map': mockExhibitData,
            '/api/exhibits/gallery1': {
                gallery: mockExhibitData.galleries[0],
                exhibits: mockExhibitData.exhibits
            }
        });
        
        app = createApp();
        appApi = await app.init();
    });
    
    describe('地图渲染', () => {
        test('SVG 地图应正确设置 viewBox', async () => {
            await appApi.selectGallery('gallery1');
            
            const mapSvg = document.getElementById('museum-map');
            expect(mapSvg).not.toBeNull();
            expect(mapSvg.getAttribute('viewBox')).toBe('0 0 100 100');
        });
        
        test('SVG 地图应设置 preserveAspectRatio', async () => {
            await appApi.selectGallery('gallery1');
            
            const mapSvg = document.getElementById('museum-map');
            expect(mapSvg.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet');
        });
        
        test('SVG 地图应设置 touchAction', async () => {
            await appApi.selectGallery('gallery1');
            
            const mapSvg = document.getElementById('museum-map');
            expect(mapSvg.style.touchAction).toBe('none');
        });
        
        test('地图应包含展厅和展品分组', async () => {
            await appApi.selectGallery('gallery1');
            
            const mapGalleries = document.getElementById('map-galleries');
            const mapExhibits = document.getElementById('map-exhibits');
            
            expect(mapGalleries).not.toBeNull();
            expect(mapExhibits).not.toBeNull();
        });
    });
    
    describe('标记点位置', () => {
        test('展品标记点应放置在正确的坐标位置', async () => {
            await appApi.selectGallery('gallery1');
            
            const markers = appApi.getMapMarkers();
            
            expect(markers.length).toBe(2);
            
            const exhibit1 = markers.find(m => m.exhibitId === 'exhibit1');
            const exhibit2 = markers.find(m => m.exhibitId === 'exhibit2');
            
            expect(exhibit1).not.toBeNull();
            expect(exhibit2).not.toBeNull();
            
            expect(exhibit1.x).toBe(20);
            expect(exhibit1.y).toBe(35);
            
            expect(exhibit2.x).toBe(35);
            expect(exhibit2.y).toBe(40);
        });
        
        test('展品标记点应具有正确的半径', async () => {
            await appApi.selectGallery('gallery1');
            
            const markers = appApi.getMapMarkers();
            
            markers.forEach(marker => {
                expect(marker.radius).toBe(2.5);
            });
        });
        
        test('标记点坐标应在 SVG 坐标系范围内', async () => {
            await appApi.selectGallery('gallery1');
            
            const markers = appApi.getMapMarkers();
            
            markers.forEach(marker => {
                expect(marker.x).toBeGreaterThanOrEqual(0);
                expect(marker.x).toBeLessThanOrEqual(100);
                expect(marker.y).toBeGreaterThanOrEqual(0);
                expect(marker.y).toBeLessThanOrEqual(100);
            });
        });
    });
    
    describe('标记点高亮状态', () => {
        test('打开展品时标记点应高亮显示', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const markers = appApi.getMapMarkers();
            const activeMarker = markers.find(m => m.exhibitId === 'exhibit1');
            const inactiveMarker = markers.find(m => m.exhibitId === 'exhibit2');
            
            expect(activeMarker.isActive).toBe(true);
            expect(inactiveMarker.isActive).toBe(false);
        });
        
        test('切换展品时高亮标记点应更新', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            let markers = appApi.getMapMarkers();
            expect(markers.find(m => m.exhibitId === 'exhibit1').isActive).toBe(true);
            expect(markers.find(m => m.exhibitId === 'exhibit2').isActive).toBe(false);
            
            await appApi.openExhibitModal('exhibit2');
            
            markers = appApi.getMapMarkers();
            expect(markers.find(m => m.exhibitId === 'exhibit1').isActive).toBe(false);
            expect(markers.find(m => m.exhibitId === 'exhibit2').isActive).toBe(true);
        });
        
        test('关闭弹窗时所有标记点应取消高亮', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            let markers = appApi.getMapMarkers();
            expect(markers.find(m => m.exhibitId === 'exhibit1').isActive).toBe(true);
            
            appApi.closeModal();
            
            markers = appApi.getMapMarkers();
            markers.forEach(marker => {
                expect(marker.isActive).toBe(false);
            });
        });
    });
    
    describe('响应式布局', () => {
        test('不同屏幕尺寸下标记点坐标应保持不变', async () => {
            await appApi.selectGallery('gallery1');
            
            const originalMarkers = appApi.getMapMarkers();
            const originalCoords = originalMarkers.map(m => ({ id: m.exhibitId, x: m.x, y: m.y }));
            
            const mapSvg = document.getElementById('museum-map');
            mapSvg.style.width = '200px';
            mapSvg.style.height = '200px';
            
            const smallMarkers = appApi.getMapMarkers();
            const smallCoords = smallMarkers.map(m => ({ id: m.exhibitId, x: m.x, y: m.y }));
            
            expect(smallCoords).toEqual(originalCoords);
            
            mapSvg.style.width = '1000px';
            mapSvg.style.height = '800px';
            
            const largeMarkers = appApi.getMapMarkers();
            const largeCoords = largeMarkers.map(m => ({ id: m.exhibitId, x: m.x, y: m.y }));
            
            expect(largeCoords).toEqual(originalCoords);
        });
        
        test('SVG 缩放时标记点位置应保持正确', async () => {
            await appApi.selectGallery('gallery1');
            
            const markers = appApi.getMapMarkers();
            
            markers.forEach(marker => {
                expect(marker.x).toBeGreaterThan(0);
                expect(marker.x).toBeLessThan(100);
                expect(marker.y).toBeGreaterThan(0);
                expect(marker.y).toBeLessThan(100);
            });
        });
        
        test('多展品时所有标记点应正确显示', async () => {
            await appApi.selectGallery('gallery1');
            
            const markers = appApi.getMapMarkers();
            
            expect(markers.length).toBe(2);
            expect(markers.filter(m => m.exhibitId === 'exhibit1').length).toBe(1);
            expect(markers.filter(m => m.exhibitId === 'exhibit2').length).toBe(1);
        });
    });
    
    describe('标记点交互', () => {
        test('点击标记点应打开对应展品弹窗', async () => {
            await appApi.selectGallery('gallery1');
            
            const exhibitMarkers = document.querySelectorAll('#map-exhibits .map-marker');
            const firstMarker = exhibitMarkers[0];
            
            const clickEvent = new Event('click', { bubbles: true });
            firstMarker.dispatchEvent(clickEvent);
            
            await Promise.resolve();
            
            const modal = document.getElementById('exhibit-modal');
            expect(modal.classList.contains('active')).toBe(true);
        });
        
        test('标记点应具有可点击的光标', async () => {
            await appApi.selectGallery('gallery1');
            
            const exhibitMarkers = document.querySelectorAll('#map-exhibits .map-marker');
            exhibitMarkers.forEach(marker => {
                expect(marker.style.cursor).toBe('');
            });
        });
    });
    
    describe('多语言地图内容', () => {
        test('展厅标记文字应随语言切换', async () => {
            await appApi.selectGallery('gallery1');
            
            const galleryMarkers = document.querySelectorAll('#map-galleries .map-marker text');
            const firstText = galleryMarkers[0];
            
            expect(firstText.textContent).toContain('古代');
            
            appApi.setLanguage('en');
            
            const enMarkers = document.querySelectorAll('#map-galleries .map-marker text');
            expect(enMarkers[0].textContent).toContain('Anci');
        });
    });
});
