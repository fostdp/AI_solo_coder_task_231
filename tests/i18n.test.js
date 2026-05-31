import { createApp } from '../public/app.module.js';

const mockExhibitData = {
    galleries: [
        {
            id: 'gallery1',
            name: { zh: '古代中国展厅', en: 'Ancient China Gallery', ja: '古代中国展示室' },
            description: { zh: '探索中华文明五千年', en: 'Explore 5000 years', ja: '中華文明5000年' },
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
        }
    ]
};

describe('多语言资源加载', () => {
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
    
    describe('语言切换', () => {
        test('默认语言应为中文', () => {
            expect(appApi.getCurrentLang()).toBe('zh');
        });
        
        test('切换到英文应更新UI', () => {
            appApi.setLanguage('en');
            
            expect(appApi.getCurrentLang()).toBe('en');
            expect(document.documentElement.lang).toBe('en');
            expect(document.title).toBe('Museum Audio Guide');
        });
        
        test('切换到日文应更新UI', () => {
            appApi.setLanguage('ja');
            
            expect(appApi.getCurrentLang()).toBe('ja');
            expect(document.documentElement.lang).toBe('ja');
            expect(document.title).toBe('博物館音声ガイド');
        });
        
        test('切换回中文应恢复默认', () => {
            appApi.setLanguage('en');
            appApi.setLanguage('zh');
            
            expect(appApi.getCurrentLang()).toBe('zh');
            expect(document.documentElement.lang).toBe('zh');
            expect(document.title).toBe('博物馆藏品语音导览');
        });
        
        test('语言按钮激活状态应正确更新', () => {
            const buttons = document.querySelectorAll('.lang-btn');
            
            appApi.setLanguage('zh');
            expect(buttons[0].classList.contains('active')).toBe(true);
            expect(buttons[1].classList.contains('active')).toBe(false);
            expect(buttons[2].classList.contains('active')).toBe(false);
            
            appApi.setLanguage('en');
            expect(buttons[0].classList.contains('active')).toBe(false);
            expect(buttons[1].classList.contains('active')).toBe(true);
            expect(buttons[2].classList.contains('active')).toBe(false);
            
            appApi.setLanguage('ja');
            expect(buttons[0].classList.contains('active')).toBe(false);
            expect(buttons[1].classList.contains('active')).toBe(false);
            expect(buttons[2].classList.contains('active')).toBe(true);
        });
    });
    
    describe('语音文本加载', () => {
        test('切换语言时应停止当前音频', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            expect(global.getSpeechQueue().length).toBeGreaterThan(0);
            
            appApi.setLanguage('en');
            
            expect(global.speechSynthesis.cancel).toHaveBeenCalled();
            expect(appApi.getAudioStatus().hasActiveUtterance).toBe(false);
        });
        
        test('切换语言后应使用新语言的语音文本', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            const zhUtterance = global.getSpeechQueue()[global.getSpeechQueue().length - 1];
            
            appApi.setLanguage('en');
            
            await appApi.openExhibitModal('exhibit1');
            appApi.playAudio();
            const enUtterance = global.getSpeechQueue()[global.getSpeechQueue().length - 1];
            
            expect(enUtterance.lang).toBe('en-US');
            expect(enUtterance.text).toContain('Welcome');
        });
        
        test('中文语音应使用正确的语言设置', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            const utterance = global.getSpeechQueue()[global.getSpeechQueue().length - 1];
            expect(utterance.lang).toBe('zh-CN');
            expect(utterance.rate).toBe(0.9);
            expect(utterance.pitch).toBe(1);
        });
        
        test('英文语音应使用正确的语言设置', async () => {
            appApi.setLanguage('en');
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            const utterance = global.getSpeechQueue()[global.getSpeechQueue().length - 1];
            expect(utterance.lang).toBe('en-US');
        });
        
        test('日文语音应使用正确的语言设置', async () => {
            appApi.setLanguage('ja');
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            appApi.playAudio();
            
            const utterance = global.getSpeechQueue()[global.getSpeechQueue().length - 1];
            expect(utterance.lang).toBe('ja-JP');
        });
    });
    
    describe('内容本地化', () => {
        test('展厅名称应根据语言切换', async () => {
            await appApi.selectGallery('gallery1');
            
            const titleEl = document.getElementById('gallery-title');
            expect(titleEl.textContent).toBe('古代中国展厅');
            
            appApi.setLanguage('en');
            expect(titleEl.textContent).toBe('Ancient China Gallery');
            
            appApi.setLanguage('ja');
            expect(titleEl.textContent).toBe('古代中国展示室');
        });
        
        test('展品名称应根据语言切换', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const nameEl = document.getElementById('modal-exhibit-name');
            expect(nameEl.textContent).toBe('司母戊鼎');
            
            appApi.setLanguage('en');
            expect(nameEl.textContent).toBe('Simuwu Ding');
        });
        
        test('展品描述应根据语言切换', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const descEl = document.getElementById('modal-exhibit-description');
            expect(descEl.textContent).toBe('商代青铜器');
            
            appApi.setLanguage('en');
            expect(descEl.textContent).toBe('Shang Dynasty bronze');
        });
        
        test('展品年代应根据语言切换', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const yearEl = document.getElementById('modal-exhibit-year');
            expect(yearEl.textContent).toBe('商代晚期');
            
            appApi.setLanguage('en');
            expect(yearEl.textContent).toBe('Late Shang Dynasty');
        });
    });
    
    describe('语音选择', () => {
        test('getVoiceByLang 应返回对应语言的语音', () => {
            const mockVoices = [
                { name: 'Voice1', lang: 'zh-CN' },
                { name: 'Voice2', lang: 'en-US' },
                { name: 'Voice3', lang: 'ja-JP' }
            ];
            global.speechSynthesis.getVoices.mockReturnValue(mockVoices);
            
            appApi.setLanguage('en');
            
            expect(global.speechSynthesis.getVoices).toHaveBeenCalled();
        });
        
        test('找不到匹配语言时应返回默认语音', () => {
            const mockVoices = [
                { name: 'Voice1', lang: 'fr-FR' }
            ];
            global.speechSynthesis.getVoices.mockReturnValue(mockVoices);
            
            appApi.setLanguage('zh');
            
            expect(global.speechSynthesis.getVoices).toHaveBeenCalled();
        });
    });
});
