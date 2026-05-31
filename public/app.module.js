const i18n = {
    zh: {
        'app-title': '博物馆藏品语音导览',
        'select-gallery': '选择展厅',
        'back': '返回',
        'exhibit-list': '藏品列表',
        'floor-map': '展厅地图',
        'legend-gallery': '展厅入口',
        'legend-exhibit': '展品位置',
        'legend-active': '当前展品',
        'ready-to-play': '准备播放语音解说',
        'playing': '正在播放...',
        'paused': '已暂停',
        'stopped': '已停止',
        'finished': '播放完成',
        'text-introduction': '文字介绍',
        'footer-text': '© 2026 博物馆语音导览系统 - 让艺术触手可及',
        'speech-not-supported': '您的浏览器不支持语音合成功能',
        'my-path': '我的路径',
        'recommend': '推荐路线',
        'ar-mode': 'AR模式',
        'ar-view': 'AR展品展示',
        'camera-permission': '点击下方按钮开启AR体验',
        'start-ar': '开启摄像头',
        'community': '社区互动',
        'submit-comment': '发布',
        'visited-exhibits': '已参观展品',
        'visited-galleries': '已参观展厅',
        'total-visits': '总访问次数',
        'no-path-yet': '还没有游览记录',
        'start-exploring': '开始探索博物馆吧！',
        'recommendation-summary': '已参观 {visited}/{total} 件展品，以下是为您推荐的展品：',
        'similar-interest': '相似兴趣',
        'popular': '热门推荐',
        'enter-gallery': '进入展厅',
        'view-exhibit': '查看展品',
        'no-recommendations': '暂时没有更多推荐',
        'comment-placeholder': '写下您的评论...',
        'camera-not-supported': '您的浏览器不支持摄像头功能',
        'network-error': '网络连接失败，请检查网络设置'
    },
    en: {
        'app-title': 'Museum Audio Guide',
        'select-gallery': 'Select Gallery',
        'back': 'Back',
        'exhibit-list': 'Exhibit List',
        'floor-map': 'Floor Map',
        'legend-gallery': 'Gallery Entrance',
        'legend-exhibit': 'Exhibit Location',
        'legend-active': 'Current Exhibit',
        'ready-to-play': 'Ready to play audio guide',
        'playing': 'Playing...',
        'paused': 'Paused',
        'stopped': 'Stopped',
        'finished': 'Finished',
        'text-introduction': 'Text Introduction',
        'footer-text': '© 2026 Museum Audio Guide System - Making Art Accessible',
        'speech-not-supported': 'Your browser does not support speech synthesis',
        'my-path': 'My Path',
        'recommend': 'Recommend',
        'ar-mode': 'AR Mode',
        'ar-view': 'AR Exhibit View',
        'camera-permission': 'Click the button below to start AR experience',
        'start-ar': 'Start Camera',
        'community': 'Community',
        'submit-comment': 'Post',
        'visited-exhibits': 'Visited Exhibits',
        'visited-galleries': 'Visited Galleries',
        'total-visits': 'Total Visits',
        'no-path-yet': 'No path history yet',
        'start-exploring': 'Start exploring the museum!',
        'recommendation-summary': 'You have visited {visited}/{total} exhibits. Here are our recommendations:',
        'similar-interest': 'Similar Interest',
        'popular': 'Popular',
        'enter-gallery': 'Enter Gallery',
        'view-exhibit': 'View Exhibit',
        'no-recommendations': 'No more recommendations',
        'comment-placeholder': 'Write your comment...',
        'camera-not-supported': 'Your browser does not support camera functionality',
        'network-error': 'Network connection failed, please check your network settings'
    },
    ja: {
        'app-title': '博物館音声ガイド',
        'select-gallery': '展示室を選択',
        'back': '戻る',
        'exhibit-list': '展示品リスト',
        'floor-map': 'フロアマップ',
        'legend-gallery': '展示室入口',
        'legend-exhibit': '展示品の位置',
        'legend-active': '現在の展示品',
        'ready-to-play': '音声ガイドを再生する準備ができました',
        'playing': '再生中...',
        'paused': '一時停止中',
        'stopped': '停止中',
        'finished': '再生完了',
        'text-introduction': 'テキスト紹介',
        'footer-text': '© 2026 博物館音声ガイドシステム - アートを身近に',
        'speech-not-supported': 'お使いのブラウザは音声合成に対応していません',
        'my-path': 'マイパス',
        'recommend': 'おすすめ',
        'ar-mode': 'ARモード',
        'ar-view': 'AR展示ビュー',
        'camera-permission': 'ボタンをクリックしてAR体験を開始',
        'start-ar': 'カメラを開始',
        'community': 'コミュニティ',
        'submit-comment': '投稿',
        'visited-exhibits': '訪問済み展示品',
        'visited-galleries': '訪問済み展示室',
        'total-visits': '総訪問数',
        'no-path-yet': 'まだ履歴がありません',
        'start-exploring': '博物館を探索しましょう！',
        'recommendation-summary': '{visited}/{total}点の展示品を訪問しました。おすすめはこちらです：',
        'similar-interest': '類似の興味',
        'popular': '人気',
        'enter-gallery': '展示室へ',
        'view-exhibit': '展示品を見る',
        'no-recommendations': 'おすすめがありません',
        'comment-placeholder': 'コメントを書いてください...',
        'camera-not-supported': 'お使いのブラウザはカメラに対応していません',
        'network-error': 'ネットワーク接続に失敗しました。ネットワーク設定を確認してください'
    }
};

const galleryIcons = {
    gallery1: '🏮',
    gallery2: '🎨',
    gallery3: '🖼️',
    gallery4: '🏺'
};

const i18nMessages = {
    zh: {
        'network-error': '网络连接失败，请检查网络设置',
        'loading-failed': '数据加载失败，请稍后重试',
        'offline-mode': '当前为离线模式，部分功能可能不可用'
    },
    en: {
        'network-error': 'Network connection failed, please check your network settings',
        'loading-failed': 'Data loading failed, please try again later',
        'offline-mode': 'Offline mode, some features may not be available'
    },
    ja: {
        'network-error': 'ネットワーク接続に失敗しました。ネットワーク設定を確認してください',
        'loading-failed': 'データの読み込みに失敗しました。後でもう一度お試しください',
        'offline-mode': 'オフラインモードです。一部の機能が利用できない場合があります'
    }
};

function generateUserId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getOrCreateUserId() {
    let userId = localStorage.getItem('museum_user_id');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('museum_user_id', userId);
    }
    return userId;
}

const createApp = () => {
    const API_BASE = '';
    
    let currentLang = 'zh';
    let currentGalleryId = null;
    let currentExhibitId = null;
    let galleries = [];
    let exhibits = [];
    let currentGalleryExhibits = [];
    let userId = getOrCreateUserId();
    
    let currentArExhibit = null;
    let arStream = null;
    let arAnimationId = null;
    let arAnimationEnabled = true;
    let arCanvasCtx = null;
    
    function getSpeechSynthesis() {
        return window.speechSynthesis || null;
    }
    
    let currentUtterance = null;
    let estimatedDuration = 0;
    let progressInterval = null;
    let currentProgress = 0;
    
    const getElements = () => ({
        gallerySelection: document.getElementById('gallery-selection'),
        galleryView: document.getElementById('gallery-view'),
        pathView: document.getElementById('path-view'),
        recommendView: document.getElementById('recommend-view'),
        galleryGrid: document.getElementById('gallery-grid'),
        galleryTitle: document.getElementById('gallery-title'),
        galleryDescription: document.getElementById('gallery-description'),
        exhibitList: document.getElementById('exhibit-list'),
        mapGalleries: document.getElementById('map-galleries'),
        mapExhibits: document.getElementById('map-exhibits'),
        mapPath: document.getElementById('map-path'),
        modal: document.getElementById('exhibit-modal'),
        modalExhibitName: document.getElementById('modal-exhibit-name'),
        modalExhibitYear: document.getElementById('modal-exhibit-year'),
        modalExhibitDescription: document.getElementById('modal-exhibit-description'),
        audioPlay: document.getElementById('audio-play'),
        audioStop: document.getElementById('audio-stop'),
        playIcon: document.getElementById('play-icon'),
        progressFill: document.getElementById('progress-fill'),
        progressBar: document.querySelector('.progress-bar'),
        audioCurrent: document.getElementById('audio-current'),
        audioDuration: document.getElementById('audio-duration'),
        audioStatus: document.getElementById('audio-status'),
        modalClose: document.getElementById('modal-close'),
        backToGalleries: document.getElementById('back-to-galleries'),
        btnPath: document.getElementById('btn-path'),
        btnRecommend: document.getElementById('btn-recommend'),
        backFromPath: document.getElementById('back-from-path'),
        backFromRecommend: document.getElementById('back-from-recommend'),
        pathList: document.getElementById('path-list'),
        pathStats: document.getElementById('path-stats'),
        recommendList: document.getElementById('recommend-list'),
        recommendSummary: document.getElementById('recommend-summary'),
        btnLike: document.getElementById('btn-like'),
        likeIcon: document.getElementById('like-icon'),
        likeCount: document.getElementById('like-count'),
        btnAr: document.getElementById('btn-ar'),
        commentInput: document.getElementById('comment-input'),
        btnSubmitComment: document.getElementById('btn-submit-comment'),
        commentsList: document.getElementById('comments-list'),
        arModal: document.getElementById('ar-modal'),
        arVideo: document.getElementById('ar-video'),
        arCanvas: document.getElementById('ar-canvas'),
        arOverlay: document.getElementById('ar-overlay'),
        arExhibitName: document.getElementById('ar-exhibit-name'),
        arExhibitYear: document.getElementById('ar-exhibit-year'),
        arPlaceholder: document.getElementById('ar-placeholder'),
        btnStartAr: document.getElementById('btn-start-ar'),
        arClose: document.getElementById('ar-close'),
        btnSnapshot: document.getElementById('btn-snapshot'),
        btnToggleAnimation: document.getElementById('btn-toggle-animation')
    });
    
    let elements = null;
    
    function initElements() {
        if (!elements) {
            elements = getElements();
        }
        return elements;
    }
    
    function t(key) {
        return i18n[currentLang][key] || key;
    }
    
    function getLocalizedText(obj) {
        if (!obj) return '';
        return obj[currentLang] || obj['zh'] || Object.values(obj)[0] || '';
    }
    
    function updateUILanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });
        document.documentElement.lang = currentLang;
        document.title = t('app-title');
        const el = initElements();
        if (el.commentInput) {
            el.commentInput.placeholder = t('comment-placeholder');
        }
    }
    
    function setLanguage(lang) {
        if (i18n[lang]) {
            currentLang = lang;
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
            updateUILanguage();
            forceStopAllAudio();
            if (currentGalleryId) {
                renderGalleryView();
                renderMap();
            } else {
                renderGalleryGrid();
            }
            const el = initElements();
            if (el.modal && el.modal.classList.contains('active') && currentExhibitId) {
                const exhibit = currentGalleryExhibits.find(e => e.id === currentExhibitId);
                if (exhibit) {
                    populateModal(exhibit);
                }
            }
        }
    }
    
    function getCurrentLang() {
        return currentLang;
    }
    
    async function fetchData(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
    
    function showErrorToast(message) {
        let toast = document.querySelector('.error-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'error-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.display = 'block';
        toast.style.opacity = '1';
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 300);
        }, 4000);
        return toast;
    }
    
    function getLastToastMessage() {
        const toast = document.querySelector('.error-toast');
        return toast ? toast.textContent : null;
    }
    
    async function logAction(data) {
        try {
            await fetch(`${API_BASE}/api/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, language: currentLang })
            });
        } catch (error) {
            console.error('Log error:', error);
        }
    }
    
    async function addPathRecord(data) {
        try {
            await fetch(`${API_BASE}/api/path/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    ...data
                })
            });
        } catch (error) {
            console.error('Path record error:', error);
        }
    }
    
    async function getUserPaths() {
        const result = await fetchData(`/api/path/${userId}`);
        return result ? result.paths : [];
    }
    
    async function getRecommendations() {
        const result = await fetchData(`/api/recommendations/${userId}`);
        return result;
    }
    
    function renderGalleryGrid() {
        const el = initElements();
        if (!el.galleryGrid) return;
        
        el.galleryGrid.innerHTML = '';
        galleries.forEach(gallery => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <div class="gallery-card-icon">${galleryIcons[gallery.id] || '🏛️'}</div>
                <h3>${getLocalizedText(gallery.name)}</h3>
                <p>${getLocalizedText(gallery.description)}</p>
            `;
            card.addEventListener('click', () => selectGallery(gallery.id));
            el.galleryGrid.appendChild(card);
        });
    }
    
    async function selectGallery(galleryId) {
        forceStopAllAudio();
        currentGalleryId = galleryId;
        const data = await fetchData(`/api/exhibits/${galleryId}`);
        if (data) {
            currentGalleryExhibits = data.exhibits;
            logAction({ galleryId, action: 'enter_gallery' });
            addPathRecord({ galleryId, action: 'enter_gallery' });
            showSection('gallery-view');
            renderGalleryView();
            renderMap();
        }
    }
    
    function renderGalleryView() {
        const el = initElements();
        const gallery = galleries.find(g => g.id === currentGalleryId);
        if (gallery && el.galleryTitle) {
            el.galleryTitle.textContent = getLocalizedText(gallery.name);
            el.galleryDescription.textContent = getLocalizedText(gallery.description);
        }
        
        if (!el.exhibitList) return;
        
        el.exhibitList.innerHTML = '';
        currentGalleryExhibits.forEach(exhibit => {
            const item = document.createElement('div');
            item.className = 'exhibit-item';
            item.dataset.exhibitId = exhibit.id;
            item.innerHTML = `
                <h4>${getLocalizedText(exhibit.name)}</h4>
                <p class="exhibit-year">${getLocalizedText(exhibit.year)}</p>
            `;
            item.addEventListener('click', () => openExhibitModal(exhibit.id));
            el.exhibitList.appendChild(item);
        });
    }
    
    function renderMap() {
        const el = initElements();
        const mapSvg = document.getElementById('museum-map');
        if (!mapSvg || !el.mapGalleries || !el.mapExhibits) return;
        
        el.mapGalleries.innerHTML = '';
        el.mapExhibits.innerHTML = '';
        
        mapSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        mapSvg.style.touchAction = 'none';
        
        galleries.forEach(gallery => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            marker.setAttribute('class', 'map-marker');
            marker.setAttribute('data-gallery-id', gallery.id);
            marker.innerHTML = `
                <circle cx="${gallery.mapPosition.x}" cy="${gallery.mapPosition.y}" r="3" fill="#4CAF50" stroke="#2E7D32" stroke-width="0.5"/>
                <text x="${gallery.mapPosition.x}" y="${gallery.mapPosition.y - 5}" text-anchor="middle" font-size="2" fill="#2E7D32" font-weight="bold">
                    ${getLocalizedText(gallery.name).slice(0, 4)}
                </text>
            `;
            marker.addEventListener('click', () => {
                if (currentGalleryId !== gallery.id) {
                    selectGallery(gallery.id);
                }
            });
            el.mapGalleries.appendChild(marker);
        });
        
        currentGalleryExhibits.forEach(exhibit => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            marker.setAttribute('class', `map-marker ${exhibit.id === currentExhibitId ? 'active' : ''}`);
            marker.setAttribute('data-exhibit-id', exhibit.id);
            const color = exhibit.id === currentExhibitId ? '#FF9800' : '#2196F3';
            const stroke = exhibit.id === currentExhibitId ? '#F57C00' : '#1976D2';
            marker.innerHTML = `
                <circle cx="${exhibit.mapPosition.x}" cy="${exhibit.mapPosition.y}" r="2.5" fill="${color}" stroke="${stroke}" stroke-width="0.5"/>
                <rect x="${exhibit.mapPosition.x - 1}" y="${exhibit.mapPosition.y - 1}" width="2" height="2" fill="white"/>
            `;
            marker.addEventListener('click', () => openExhibitModal(exhibit.id));
            el.mapExhibits.appendChild(marker);
        });
    }
    
    function getMapMarkers() {
        const el = initElements();
        const markers = [];
        const exhibitMarkers = el.mapExhibits ? el.mapExhibits.querySelectorAll('.map-marker') : [];
        
        exhibitMarkers.forEach(marker => {
            const circle = marker.querySelector('circle');
            if (circle) {
                markers.push({
                    exhibitId: marker.getAttribute('data-exhibit-id'),
                    x: parseFloat(circle.getAttribute('cx')),
                    y: parseFloat(circle.getAttribute('cy')),
                    radius: parseFloat(circle.getAttribute('r')),
                    isActive: marker.classList.contains('active')
                });
            }
        });
        
        return markers;
    }
    
    function updateMapMarkers() {
        document.querySelectorAll('#map-exhibits .map-marker').forEach(marker => {
            const exhibitId = marker.getAttribute('data-exhibit-id');
            const circle = marker.querySelector('circle');
            if (exhibitId === currentExhibitId) {
                marker.classList.add('active');
                circle.setAttribute('fill', '#FF9800');
                circle.setAttribute('stroke', '#F57C00');
            } else {
                marker.classList.remove('active');
                circle.setAttribute('fill', '#2196F3');
                circle.setAttribute('stroke', '#1976D2');
            }
        });
    }
    
    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
        }
    }
    
    async function openExhibitModal(exhibitId) {
        const el = initElements();
        currentExhibitId = exhibitId;
        const exhibit = currentGalleryExhibits.find(e => e.id === exhibitId);
        
        if (!exhibit) return;
        
        forceStopAllAudio();
        
        logAction({ exhibitId, galleryId: currentGalleryId, action: 'view_exhibit' });
        addPathRecord({ galleryId: currentGalleryId, exhibitId, action: 'view_exhibit' });
        
        populateModal(exhibit);
        
        document.querySelectorAll('.exhibit-item').forEach(item => {
            item.classList.toggle('active', item.dataset.exhibitId === exhibitId);
        });
        
        updateMapMarkers();
        
        if (el.modal) {
            el.modal.classList.add('active');
        }
        
        await loadLikes(exhibitId);
        await loadComments(exhibitId);
    }
    
    async function loadLikes(exhibitId) {
        const el = initElements();
        const result = await fetchData(`/api/likes/${exhibitId}?userId=${userId}`);
        
        if (result && el.likeCount && el.likeIcon && el.btnLike) {
            el.likeCount.textContent = result.count;
            el.likeIcon.textContent = result.isLiked ? '❤️' : '🤍';
            el.btnLike.classList.toggle('liked', result.isLiked);
        }
    }
    
    async function loadComments(exhibitId) {
        const el = initElements();
        if (!el.commentsList) return;
        
        const result = await fetchData(`/api/comments/${exhibitId}`);
        
        if (result) {
            renderComments(result.comments);
        }
    }
    
    function renderComments(comments) {
        const el = initElements();
        if (!el.commentsList) return;
        
        if (!comments || comments.length === 0) {
            el.commentsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💬</div>
                    <div class="empty-state-text" data-i18n="no-recommendations">暂无评论，来发表第一条吧！</div>
                </div>
            `;
            return;
        }
        
        el.commentsList.innerHTML = comments.map(comment => {
            const date = new Date(comment.timestamp);
            const formattedDate = date.toLocaleString(currentLang === 'zh' ? 'zh-CN' : currentLang === 'ja' ? 'ja-JP' : 'en-US');
            
            return `
                <div class="comment-item">
                    <div class="comment-item-header">
                        <span class="comment-item-user">${comment.userName}</span>
                        <span class="comment-item-time">${formattedDate}</span>
                    </div>
                    <div class="comment-item-content">${escapeHtml(comment.content)}</div>
                </div>
            `;
        }).join('');
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    async function toggleLike() {
        if (!currentExhibitId) return;
        
        const result = await fetchData('/api/likes/toggle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                exhibitId: currentExhibitId,
                userId
            })
        });
        
        if (result) {
            const el = initElements();
            if (el.likeCount && el.likeIcon && el.btnLike) {
                el.likeCount.textContent = result.count;
                el.likeIcon.textContent = result.isLiked ? '❤️' : '🤍';
                el.btnLike.classList.toggle('liked', result.isLiked);
            }
        }
    }
    
    async function submitComment() {
        const el = initElements();
        if (!el.commentInput || !currentExhibitId) return;
        
        const content = el.commentInput.value.trim();
        if (!content) return;
        
        const result = await fetchData('/api/comments/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                exhibitId: currentExhibitId,
                userId,
                userName: '博物馆访客',
                content,
                language: currentLang
            })
        });
        
        if (result) {
            el.commentInput.value = '';
            await loadComments(currentExhibitId);
        }
    }
    
    function populateModal(exhibit) {
        const el = initElements();
        if (!el.modal) return;
        
        el.modalExhibitName.textContent = getLocalizedText(exhibit.name);
        el.modalExhibitYear.textContent = getLocalizedText(exhibit.year);
        el.modalExhibitDescription.textContent = getLocalizedText(exhibit.description);
        
        const audioText = getLocalizedText(exhibit.audioText);
        estimatedDuration = audioText.length * 0.08;
        el.audioDuration.textContent = formatTime(estimatedDuration);
        
        el.audioStatus.innerHTML = `<span>${t('ready-to-play')}</span>`;
        el.audioCurrent.textContent = '0:00';
        el.progressFill.style.width = '0%';
        currentProgress = 0;
    }
    
    function closeModal() {
        const el = initElements();
        stopAudio();
        if (el.modal) {
            el.modal.classList.remove('active');
        }
        currentExhibitId = null;
        document.querySelectorAll('.exhibit-item').forEach(item => {
            item.classList.remove('active');
        });
        updateMapMarkers();
    }
    
    async function showPathView() {
        showSection('path-view');
        await renderPathView();
    }
    
    async function renderPathView() {
        const el = initElements();
        const paths = await getUserPaths();
        
        const visitedExhibits = new Set(paths.filter(p => p.exhibitId).map(p => p.exhibitId));
        const visitedGalleries = new Set(paths.filter(p => p.galleryId).map(p => p.galleryId));
        
        if (el.pathStats) {
            el.pathStats.innerHTML = `
                <div class="path-stat-item">
                    <div class="path-stat-value">${visitedExhibits.size}</div>
                    <div class="path-stat-label" data-i18n="visited-exhibits">${t('visited-exhibits')}</div>
                </div>
                <div class="path-stat-item">
                    <div class="path-stat-value">${visitedGalleries.size}</div>
                    <div class="path-stat-label" data-i18n="visited-galleries">${t('visited-galleries')}</div>
                </div>
                <div class="path-stat-item">
                    <div class="path-stat-value">${paths.length}</div>
                    <div class="path-stat-label" data-i18n="total-visits">${t('total-visits')}</div>
                </div>
            `;
        }
        
        if (el.pathList) {
            if (paths.length === 0) {
                el.pathList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📍</div>
                        <div class="empty-state-text" data-i18n="no-path-yet">${t('no-path-yet')}</div>
                        <div class="empty-state-text" data-i18n="start-exploring">${t('start-exploring')}</div>
                    </div>
                `;
                return;
            }
            
            el.pathList.innerHTML = paths.slice(0, 50).map(path => {
                const date = new Date(path.timestamp);
                const formattedTime = date.toLocaleString(currentLang === 'zh' ? 'zh-CN' : currentLang === 'ja' ? 'ja-JP' : 'en-US');
                
                let icon = '📍';
                let title = '';
                let subtitle = '';
                
                if (path.action === 'enter_gallery' && path.galleryId) {
                    const gallery = galleries.find(g => g.id === path.galleryId);
                    icon = '🚪';
                    title = gallery ? getLocalizedText(gallery.name) : path.galleryId;
                    subtitle = t('enter-gallery');
                } else if (path.exhibitId) {
                    const exhibit = exhibits.find(e => e.id === path.exhibitId);
                    icon = '🖼️';
                    title = exhibit ? getLocalizedText(exhibit.name) : path.exhibitId;
                    subtitle = t('view-exhibit');
                }
                
                return `
                    <div class="path-item">
                        <div class="path-item-icon">${icon}</div>
                        <div class="path-item-content">
                            <div class="path-item-title">${title}</div>
                            <div class="path-item-subtitle">${subtitle}</div>
                        </div>
                        <div class="path-item-time">${formattedTime}</div>
                    </div>
                `;
            }).join('');
        }
    }
    
    async function showRecommendView() {
        showSection('recommend-view');
        await renderRecommendView();
    }
    
    async function renderRecommendView() {
        const el = initElements();
        const result = await getRecommendations();
        
        if (el.recommendSummary && result) {
            el.recommendSummary.textContent = t('recommendation-summary')
                .replace('{visited}', result.visitedCount)
                .replace('{total}', result.totalExhibits);
        }
        
        if (el.recommendList) {
            if (!result || !result.recommendations || result.recommendations.length === 0) {
                el.recommendList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🎯</div>
                        <div class="empty-state-text" data-i18n="no-recommendations">${t('no-recommendations')}</div>
                    </div>
                `;
                return;
            }
            
            el.recommendList.innerHTML = result.recommendations.map((exhibit, index) => {
                const reasonLabel = exhibit.reason === 'similar_interest' ? t('similar-interest') : t('popular');
                const gallery = galleries.find(g => g.id === exhibit.galleryId);
                const galleryName = gallery ? getLocalizedText(gallery.name) : '';
                
                return `
                    <div class="recommend-item" data-exhibit-id="${exhibit.id}" data-gallery-id="${exhibit.galleryId}">
                        <div class="recommend-item-header">
                            <div class="recommend-item-rank">${index + 1}</div>
                            <div class="recommend-item-score">${exhibit.score}%</div>
                        </div>
                        <span class="recommend-item-reason">${reasonLabel}</span>
                        <h4>${getLocalizedText(exhibit.name)}</h4>
                        <p>${getLocalizedText(exhibit.description).slice(0, 100)}...</p>
                        <div style="margin-top: 0.5rem; color: #667eea; font-size: 0.85rem;">
                            ${galleryIcons[exhibit.galleryId] || '🏛️'} ${galleryName}
                        </div>
                    </div>
                `;
            }).join('');
            
            el.recommendList.querySelectorAll('.recommend-item').forEach(item => {
                item.addEventListener('click', async () => {
                    const galleryId = item.dataset.galleryId;
                    const exhibitId = item.dataset.exhibitId;
                    
                    if (galleryId) {
                        await selectGallery(galleryId);
                        if (exhibitId) {
                            setTimeout(() => openExhibitModal(exhibitId), 100);
                        }
                    }
                });
            });
        }
    }
    
    async function openArMode() {
        if (!currentExhibitId) return;
        
        const exhibit = currentGalleryExhibits.find(e => e.id === currentExhibitId);
        if (!exhibit) return;
        
        currentArExhibit = exhibit;
        
        const el = initElements();
        if (el.arExhibitName && el.arExhibitYear) {
            el.arExhibitName.textContent = getLocalizedText(exhibit.name);
            el.arExhibitYear.textContent = getLocalizedText(exhibit.year);
        }
        
        if (el.arModal) {
            el.arModal.classList.add('active');
        }
        
        if (el.arPlaceholder) {
            el.arPlaceholder.style.display = 'flex';
        }
        if (el.arOverlay) {
            el.arOverlay.style.display = 'none';
        }
    }
    
    async function startArCamera() {
        const el = initElements();
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showErrorToast(t('camera-not-supported'));
            return;
        }
        
        try {
            arStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false
            });
            
            if (el.arVideo) {
                el.arVideo.srcObject = arStream;
            }
            
            if (el.arPlaceholder) {
                el.arPlaceholder.style.display = 'none';
            }
            if (el.arOverlay) {
                el.arOverlay.style.display = 'block';
            }
            
            setupArCanvas();
            startArAnimation();
            
        } catch (error) {
            console.error('AR camera error:', error);
            showErrorToast(t('camera-not-supported'));
        }
    }
    
    function setupArCanvas() {
        const el = initElements();
        if (!el.arCanvas || !el.arVideo) return;
        
        const rect = el.arVideo.getBoundingClientRect();
        el.arCanvas.width = rect.width;
        el.arCanvas.height = rect.height;
        arCanvasCtx = el.arCanvas.getContext('2d');
    }
    
    function startArAnimation() {
        if (!arCanvasCtx) return;
        
        arAnimationEnabled = true;
        const el = initElements();
        if (el.btnToggleAnimation) {
            el.btnToggleAnimation.classList.add('active');
        }
        
        let rotation = 0;
        let scale = 1;
        let pulsePhase = 0;
        
        function animate() {
            if (!arAnimationEnabled) return;
            
            const el = initElements();
            if (!arCanvasCtx || !el.arCanvas || !currentArExhibit) {
                arAnimationId = requestAnimationFrame(animate);
                return;
            }
            
            const canvas = el.arCanvas;
            arCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const baseRadius = Math.min(canvas.width, canvas.height) * 0.2;
            
            rotation += 0.02;
            pulsePhase += 0.05;
            scale = 1 + Math.sin(pulsePhase) * 0.1;
            
            arCanvasCtx.save();
            arCanvasCtx.translate(centerX, centerY);
            arCanvasCtx.rotate(rotation);
            arCanvasCtx.scale(scale, scale);
            
            const gradient = arCanvasCtx.createRadialGradient(0, 0, 0, 0, 0, baseRadius);
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.8)');
            gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.6)');
            gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
            
            arCanvasCtx.fillStyle = gradient;
            arCanvasCtx.beginPath();
            arCanvasCtx.arc(0, 0, baseRadius, 0, Math.PI * 2);
            arCanvasCtx.fill();
            
            arCanvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            arCanvasCtx.lineWidth = 3;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                arCanvasCtx.beginPath();
                arCanvasCtx.moveTo(0, 0);
                arCanvasCtx.lineTo(
                    Math.cos(angle) * baseRadius * 0.8,
                    Math.sin(angle) * baseRadius * 0.8
                );
                arCanvasCtx.stroke();
            }
            
            for (let i = 0; i < 3; i++) {
                const ringRadius = baseRadius * (0.3 + i * 0.25);
                arCanvasCtx.strokeStyle = `rgba(255, 255, 255, ${0.6 - i * 0.15})`;
                arCanvasCtx.lineWidth = 2;
                arCanvasCtx.beginPath();
                arCanvasCtx.arc(0, 0, ringRadius, 0, Math.PI * 2);
                arCanvasCtx.stroke();
            }
            
            arCanvasCtx.restore();
            
            arAnimationId = requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    function stopArAnimation() {
        arAnimationEnabled = false;
        const el = initElements();
        if (el.btnToggleAnimation) {
            el.btnToggleAnimation.classList.remove('active');
        }
        if (arAnimationId) {
            cancelAnimationFrame(arAnimationId);
            arAnimationId = null;
        }
        if (arCanvasCtx && el.arCanvas) {
            arCanvasCtx.clearRect(0, 0, el.arCanvas.width, el.arCanvas.height);
        }
    }
    
    function toggleArAnimation() {
        if (arAnimationEnabled) {
            stopArAnimation();
        } else {
            startArAnimation();
        }
    }
    
    function takeSnapshot() {
        const el = initElements();
        if (!el.arVideo || !el.arCanvas) return;
        
        const snapshotCanvas = document.createElement('canvas');
        const rect = el.arVideo.getBoundingClientRect();
        snapshotCanvas.width = rect.width;
        snapshotCanvas.height = rect.height;
        const ctx = snapshotCanvas.getContext('2d');
        
        ctx.drawImage(el.arVideo, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
        ctx.drawImage(el.arCanvas, 0, 0);
        
        const link = document.createElement('a');
        link.download = `ar-snapshot-${Date.now()}.png`;
        link.href = snapshotCanvas.toDataURL();
        link.click();
    }
    
    function closeArMode() {
        const el = initElements();
        
        stopArAnimation();
        
        if (arStream) {
            arStream.getTracks().forEach(track => track.stop());
            arStream = null;
        }
        
        if (el.arVideo) {
            el.arVideo.srcObject = null;
        }
        
        if (el.arModal) {
            el.arModal.classList.remove('active');
        }
        
        currentArExhibit = null;
    }
    
    function getVoiceByLang() {
        if (!getSpeechSynthesis()) return null;
        
        const voices = getSpeechSynthesis().getVoices();
        const langMap = {
            zh: ['zh-CN', 'zh-TW', 'zh'],
            en: ['en-US', 'en-GB', 'en'],
            ja: ['ja-JP', 'ja']
        };
        const preferredCodes = langMap[currentLang] || langMap['zh'];
        
        for (const code of preferredCodes) {
            const voice = voices.find(v => v.lang.toLowerCase().startsWith(code.toLowerCase()));
            if (voice) return voice;
        }
        return voices[0] || null;
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function playAudio() {
        const el = initElements();
        if (!getSpeechSynthesis()) {
            alert(t('speech-not-supported'));
            return;
        }
        
        const exhibit = currentGalleryExhibits.find(e => e.id === currentExhibitId);
        if (!exhibit) return;
        
        if (currentUtterance && getSpeechSynthesis().paused) {
            getSpeechSynthesis().resume();
            startProgressTracking();
            el.playIcon.textContent = '⏸';
            el.audioStatus.innerHTML = `<span>${t('playing')}</span>`;
            logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'resume_audio' });
            return;
        }
        
        if (currentUtterance && getSpeechSynthesis().speaking) {
            getSpeechSynthesis().pause();
            stopProgressTracking();
            el.playIcon.textContent = '▶';
            el.audioStatus.innerHTML = `<span>${t('paused')}</span>`;
            logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'pause_audio' });
            return;
        }
        
        forceStopAllAudio();
        
        const audioText = getLocalizedText(exhibit.audioText);
        currentUtterance = new SpeechSynthesisUtterance(audioText);
        
        const voice = getVoiceByLang();
        if (voice) {
            currentUtterance.voice = voice;
        }
        currentUtterance.rate = 0.9;
        currentUtterance.pitch = 1;
        currentUtterance.lang = currentLang === 'zh' ? 'zh-CN' : currentLang === 'ja' ? 'ja-JP' : 'en-US';
        
        currentUtterance.onstart = () => {
            el.playIcon.textContent = '⏸';
            el.audioStatus.innerHTML = `<span>${t('playing')}</span>`;
            startProgressTracking();
            logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'play_audio' });
        };
        
        currentUtterance.onend = () => {
            el.playIcon.textContent = '▶';
            el.audioStatus.innerHTML = `<span>${t('finished')}</span>`;
            stopProgressTracking();
            currentProgress = 100;
            el.progressFill.style.width = '100%';
            el.audioCurrent.textContent = formatTime(estimatedDuration);
            currentUtterance = null;
        };
        
        currentUtterance.onerror = () => {
            el.playIcon.textContent = '▶';
            el.audioStatus.innerHTML = `<span>${t('stopped')}</span>`;
            stopProgressTracking();
            currentUtterance = null;
        };
        
        getSpeechSynthesis().speak(currentUtterance);
        
        return currentUtterance;
    }
    
    function forceStopAllAudio() {
        if (getSpeechSynthesis()) {
            try {
                getSpeechSynthesis().cancel();
            } catch (e) {
                console.warn('getSpeechSynthesis().cancel() failed:', e);
            }
        }
        stopProgressTracking();
        currentUtterance = null;
        currentProgress = 0;
        const el = initElements();
        if (el.playIcon) {
            el.playIcon.textContent = '▶';
        }
        if (el.progressFill) {
            el.progressFill.style.width = '0%';
        }
        if (el.audioCurrent) {
            el.audioCurrent.textContent = '0:00';
        }
    }
    
    function stopAudio() {
        forceStopAllAudio();
        const el = initElements();
        if (el.audioStatus && el.modal && el.modal.classList.contains('active')) {
            el.audioStatus.innerHTML = `<span>${t('stopped')}</span>`;
            if (currentExhibitId) {
                logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'stop_audio' });
            }
        }
    }
    
    function startProgressTracking() {
        stopProgressTracking();
        const el = initElements();
        const startTime = Date.now() - (currentProgress / 100 * estimatedDuration * 1000);
        progressInterval = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            currentProgress = Math.min((elapsed / estimatedDuration) * 100, 100);
            if (el.progressFill) {
                el.progressFill.style.width = `${currentProgress}%`;
            }
            if (el.audioCurrent) {
                el.audioCurrent.textContent = formatTime(elapsed);
            }
        }, 100);
    }
    
    function stopProgressTracking() {
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }
    
    function seekAudio(event) {
        const el = initElements();
        if (!currentUtterance) return;
        const rect = el.progressBar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        currentProgress = percent * 100;
        el.progressFill.style.width = `${currentProgress}%`;
        el.audioCurrent.textContent = formatTime((currentProgress / 100) * estimatedDuration);
        
        if (getSpeechSynthesis().speaking || getSpeechSynthesis().paused) {
            getSpeechSynthesis().cancel();
            currentUtterance = null;
        }
    }
    
    function getState() {
        return {
            currentLang,
            currentGalleryId,
            currentExhibitId,
            galleries: [...galleries],
            exhibits: [...exhibits],
            currentGalleryExhibits: [...currentGalleryExhibits],
            currentUtterance,
            estimatedDuration,
            currentProgress,
            userId
        };
    }
    
    function setState(newState) {
        if (newState.currentLang) currentLang = newState.currentLang;
        if (newState.currentGalleryId !== undefined) currentGalleryId = newState.currentGalleryId;
        if (newState.currentExhibitId !== undefined) currentExhibitId = newState.currentExhibitId;
        if (newState.galleries) galleries = newState.galleries;
        if (newState.exhibits) exhibits = newState.exhibits;
        if (newState.currentGalleryExhibits) currentGalleryExhibits = newState.currentGalleryExhibits;
    }
    
    function getAudioStatus() {
        const el = initElements();
        return {
            isPlaying: currentUtterance && getSpeechSynthesis() && getSpeechSynthesis().speaking,
            isPaused: currentUtterance && getSpeechSynthesis() && getSpeechSynthesis().paused,
            hasActiveUtterance: currentUtterance !== null,
            playIcon: el.playIcon ? el.playIcon.textContent : null,
            progress: currentProgress,
            statusText: el.audioStatus ? el.audioStatus.textContent : null
        };
    }
    
    function initEventListeners() {
        const el = initElements();
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
        });
        
        if (el.backToGalleries) {
            el.backToGalleries.addEventListener('click', () => {
                closeModal();
                currentGalleryId = null;
                showSection('gallery-selection');
                logAction({ action: 'back_to_galleries' });
            });
        }
        
        if (el.modalClose) {
            el.modalClose.addEventListener('click', closeModal);
        }
        
        if (el.modal) {
            el.modal.addEventListener('click', (e) => {
                if (e.target === el.modal) {
                    closeModal();
                }
            });
        }
        
        if (el.audioPlay) {
            el.audioPlay.addEventListener('click', playAudio);
        }
        
        if (el.audioStop) {
            el.audioStop.addEventListener('click', stopAudio);
        }
        
        if (el.progressBar) {
            el.progressBar.addEventListener('click', seekAudio);
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeArMode();
            }
        });
        
        if (getSpeechSynthesis()) {
            getSpeechSynthesis().onvoiceschanged = () => {
                getSpeechSynthesis().getVoices();
            };
        }
        
        if (el.btnPath) {
            el.btnPath.addEventListener('click', showPathView);
        }
        
        if (el.btnRecommend) {
            el.btnRecommend.addEventListener('click', showRecommendView);
        }
        
        if (el.backFromPath) {
            el.backFromPath.addEventListener('click', () => {
                showSection('gallery-selection');
            });
        }
        
        if (el.backFromRecommend) {
            el.backFromRecommend.addEventListener('click', () => {
                showSection('gallery-selection');
            });
        }
        
        if (el.btnLike) {
            el.btnLike.addEventListener('click', toggleLike);
        }
        
        if (el.btnAr) {
            el.btnAr.addEventListener('click', openArMode);
        }
        
        if (el.btnSubmitComment) {
            el.btnSubmitComment.addEventListener('click', submitComment);
        }
        
        if (el.commentInput) {
            el.commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    submitComment();
                }
            });
        }
        
        if (el.arClose) {
            el.arClose.addEventListener('click', closeArMode);
        }
        
        if (el.btnStartAr) {
            el.btnStartAr.addEventListener('click', startArCamera);
        }
        
        if (el.btnSnapshot) {
            el.btnSnapshot.addEventListener('click', takeSnapshot);
        }
        
        if (el.btnToggleAnimation) {
            el.btnToggleAnimation.addEventListener('click', toggleArAnimation);
        }
        
        if (el.arModal) {
            el.arModal.addEventListener('click', (e) => {
                if (e.target === el.arModal) {
                    closeArMode();
                }
            });
        }
    }
    
    async function init() {
        elements = getElements();
        initEventListeners();
        
        const mapData = await fetchData('/api/map');
        if (mapData) {
            galleries = mapData.galleries;
            exhibits = mapData.exhibits;
        } else {
            showErrorToast(t('network-error'));
        }
        
        renderGalleryGrid();
        updateUILanguage();
        logAction({ action: 'app_start' });
        
        return {
            getState,
            setState,
            setLanguage,
            getCurrentLang,
            selectGallery,
            openExhibitModal,
            closeModal,
            playAudio,
            stopAudio,
            forceStopAllAudio,
            getAudioStatus,
            getMapMarkers,
            renderMap,
            fetchData,
            showErrorToast,
            getLastToastMessage,
            showPathView,
            showRecommendView,
            getUserPaths,
            getRecommendations,
            toggleLike,
            submitComment,
            loadLikes,
            loadComments,
            openArMode,
            closeArMode,
            startArCamera,
            stopArAnimation,
            getUserId: () => userId
        };
    }
    
    return {
        init,
        i18n,
        i18nMessages,
        galleryIcons
    };
};

const app = createApp();

export default app;
export { createApp };
