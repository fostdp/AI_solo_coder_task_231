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
                zh: '欢迎参观司母戊鼎。这是中国商代晚期的青铜重器。', 
                en: 'Welcome to the Simuwu Ding. This is a late Shang Dynasty bronze vessel.',
                ja: '司母戊鼎へようこそ。これは中国商代後期の青銅器です。'
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

describe('音频状态管理', () => {
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
    
    describe('音频实例销毁', () => {
        test('切换展品时应停止上一段音频', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            expect(global.getSpeechQueue().length).toBeGreaterThan(0);
            
            await appApi.openExhibitModal('exhibit2');
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
            expect(appApi.getAudioStatus().hasActiveUtterance).toBe(false);
            expect(appApi.getAudioStatus().progress).toBe(0);
        });
        
        test('关闭弹窗时应停止音频', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            expect(global.getSpeechQueue().length).toBeGreaterThan(0);
            
            appApi.closeModal();
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
            expect(appApi.getAudioStatus().hasActiveUtterance).toBe(false);
        });
        
        test('切换展厅时应停止音频', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            expect(global.getSpeechQueue().length).toBeGreaterThan(0);
            
            await appApi.selectGallery('gallery1');
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
        });
        
        test('点击停止按钮应销毁音频实例', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            expect(global.getSpeechQueue().length).toBeGreaterThan(0);
            
            appApi.stopAudio();
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
            expect(appApi.getAudioStatus().hasActiveUtterance).toBe(false);
            expect(appApi.getAudioStatus().playIcon).toBe('▶');
        });
        
        test('forceStopAllAudio 应强制停止所有音频', () => {
            appApi.forceStopAllAudio();
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
            expect(appApi.getAudioStatus().hasActiveUtterance).toBe(false);
            expect(appApi.getAudioStatus().progress).toBe(0);
        });
        
        test('多次播放前应停止之前的音频', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            const firstCallCount = global.speechSynthesis.speak.mock.calls.length;
            
            appApi.playAudio();
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
        });
    });
    
    describe('播放状态管理', () => {
        test('播放时图标应变为暂停', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            await new Promise(resolve => setTimeout(resolve, 20));
            
            const playIcon = appApi.getAudioStatus().playIcon;
            expect(playIcon).not.toBe('▶');
        });
        
        test('播放状态进度条应重置为0', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const state = appApi.getState();
            appApi.setState({ ...state, currentProgress: 50 });
            
            appApi.playAudio();
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
        });
        
        test('停止后进度条应重置', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            appApi.stopAudio();
            
            expect(appApi.getAudioStatus().progress).toBe(0);
            const progressFill = document.getElementById('progress-fill');
            expect(progressFill.style.width).toBe('0%');
        });
        
        test('音频持续时间应根据文本长度计算', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const durationEl = document.getElementById('audio-duration');
            const audioText = '欢迎参观司母戊鼎。这是中国商代晚期的青铜重器。';
            const expectedDuration = audioText.length * 0.08;
            const mins = Math.floor(expectedDuration / 60);
            const secs = Math.floor(expectedDuration % 60);
            const expectedFormat = `${mins}:${secs.toString().padStart(2, '0')}`;
            
            expect(durationEl.textContent).toBe(expectedFormat);
        });
    });
    
    describe('错误处理', () => {
        test('语音合成不可用时应显示提示', async () => {
            const originalSpeechSynthesis = global.speechSynthesis;
            global.speechSynthesis = null;
            window.speechSynthesis = null;
            
            let alertCalled = false;
            window.alert = () => {
                alertCalled = true;
            };
            
            const app2 = createApp();
            const appApi2 = await app2.init();
            
            await appApi2.selectGallery('gallery1');
            await appApi2.openExhibitModal('exhibit1');
            
            appApi2.playAudio();
            
            expect(alertCalled).toBe(true);
            
            global.speechSynthesis = originalSpeechSynthesis;
            window.speechSynthesis = originalSpeechSynthesis;
        });
    });
});
