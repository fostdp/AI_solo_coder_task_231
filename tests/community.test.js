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

describe('社区互动功能', () => {
    let app;
    let appApi;
    
    const mockLikesData = {
        count: 5,
        isLiked: false
    };
    
    const mockCommentsData = {
        comments: [
            {
                id: '1',
                exhibitId: 'exhibit1',
                userId: 'user1',
                userName: '访客A',
                content: '这件展品真是太棒了！',
                timestamp: '2026-05-11T04:05:41.947Z',
                likes: 0
            },
            {
                id: '2',
                exhibitId: 'exhibit1',
                userId: 'user2',
                userName: '访客B',
                content: '历史悠久，值得一看。',
                timestamp: '2026-05-10T04:05:41.947Z',
                likes: 2
            }
        ]
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
                exhibits: mockExhibitData.exhibits
            },
            '/api/comments/exhibit1': mockCommentsData
        });
        
        app = createApp();
        appApi = await app.init();
        
        const userId = appApi.getUserId();
        global.setFetchMockData({
            [`/api/likes/exhibit1?userId=${userId}`]: mockLikesData
        });
    });
    
    describe('点赞功能', () => {
        test('点赞按钮应存在于展品弹窗中', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const likeBtn = document.getElementById('btn-like');
            expect(likeBtn).not.toBeNull();
        });
        
        test('点赞状态应正确显示', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const likeIcon = document.getElementById('like-icon');
            const likeCount = document.getElementById('like-count');
            
            expect(likeIcon).not.toBeNull();
            expect(likeCount).not.toBeNull();
            expect(likeCount.textContent).toBe('5');
        });
        
        test('切换点赞状态应调用API', async () => {
            global.setFetchMockData({
                '/api/map': mockExhibitData,
                '/api/exhibits/gallery1': {
                    gallery: mockExhibitData.galleries[0],
                    exhibits: mockExhibitData.exhibits
                },
                '/api/likes/exhibit1?userId=test_user': {
                    count: 5,
                    isLiked: false
                },
                '/api/comments/exhibit1': { comments: [] },
                '/api/likes/toggle': {
                    count: 6,
                    isLiked: true
                }
            });
            
            app = createApp();
            appApi = await app.init();
            
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            await appApi.toggleLike();
            
            const fetchCalls = global.getFetchCalls();
            const toggleCall = fetchCalls.find(c => c.url.includes('/api/likes/toggle'));
            
            expect(toggleCall).not.toBeUndefined();
            expect(toggleCall.options.method).toBe('POST');
        });
    });
    
    describe('评论功能', () => {
        test('评论输入框应存在', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const commentInput = document.getElementById('comment-input');
            expect(commentInput).not.toBeNull();
        });
        
        test('提交评论按钮应存在', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const submitBtn = document.getElementById('btn-submit-comment');
            expect(submitBtn).not.toBeNull();
        });
        
        test('评论列表应显示评论', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            await Promise.resolve();
            await Promise.resolve();
            
            const commentsList = document.getElementById('comments-list');
            expect(commentsList).not.toBeNull();
            
            const commentItems = commentsList.querySelectorAll('.comment-item');
            expect(commentItems.length).toBe(2);
        });
        
        test('空评论不应提交', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            const commentInput = document.getElementById('comment-input');
            commentInput.value = '';
            
            await appApi.submitComment();
            
            const fetchCalls = global.getFetchCalls();
            const addCommentCall = fetchCalls.find(c => c.url.includes('/api/comments/add'));
            
            expect(addCommentCall).toBeUndefined();
        });
    });
    
    describe('评论内容渲染', () => {
        test('评论应显示用户名和时间', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            await Promise.resolve();
            await Promise.resolve();
            
            const commentItems = document.querySelectorAll('.comment-item');
            expect(commentItems.length).toBeGreaterThan(0);
            
            const firstComment = commentItems[0];
            const userName = firstComment.querySelector('.comment-item-user');
            const time = firstComment.querySelector('.comment-item-time');
            
            expect(userName).not.toBeNull();
            expect(time).not.toBeNull();
        });
        
        test('评论内容应正确显示', async () => {
            await appApi.selectGallery('gallery1');
            await appApi.openExhibitModal('exhibit1');
            
            await Promise.resolve();
            await Promise.resolve();
            
            const commentItems = document.querySelectorAll('.comment-item');
            const firstCommentContent = commentItems[0].querySelector('.comment-item-content');
            
            expect(firstCommentContent.textContent).toContain('这件展品真是太棒了！');
        });
    });
});
