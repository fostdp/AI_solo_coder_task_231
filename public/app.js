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
        'speech-not-supported': '您的浏览器不支持语音合成功能'
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
        'speech-not-supported': 'Your browser does not support speech synthesis'
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
        'speech-not-supported': 'お使いのブラウザは音声合成に対応していません'
    }
};

const galleryIcons = {
    gallery1: '🏮',
    gallery2: '🎨',
    gallery3: '🖼️',
    gallery4: '🏺'
};

const API_BASE = '';

let currentLang = 'zh';
let currentGalleryId = null;
let currentExhibitId = null;
let galleries = [];
let exhibits = [];
let currentGalleryExhibits = [];

let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let estimatedDuration = 0;
let progressInterval = null;
let currentProgress = 0;

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

const elements = {
    gallerySelection: document.getElementById('gallery-selection'),
    galleryView: document.getElementById('gallery-view'),
    galleryGrid: document.getElementById('gallery-grid'),
    galleryTitle: document.getElementById('gallery-title'),
    galleryDescription: document.getElementById('gallery-description'),
    exhibitList: document.getElementById('exhibit-list'),
    mapGalleries: document.getElementById('map-galleries'),
    mapExhibits: document.getElementById('map-exhibits'),
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
    backToGalleries: document.getElementById('back-to-galleries')
};

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
}

function setLanguage(lang) {
    if (i18n[lang]) {
        currentLang = lang;
        
        forceStopAllAudio();
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        updateUILanguage();
        if (currentGalleryId) {
            renderGalleryView();
            renderMap();
        } else {
            renderGalleryGrid();
        }
        if (elements.modal.classList.contains('active') && currentExhibitId) {
            const exhibit = currentGalleryExhibits.find(e => e.id === currentExhibitId);
            if (exhibit) {
                populateModal(exhibit);
            }
        }
    }
}

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        showErrorToast(i18nMessages[currentLang]['network-error']);
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

function renderGalleryGrid() {
    elements.galleryGrid.innerHTML = '';
    galleries.forEach(gallery => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = `
            <div class="gallery-card-icon">${galleryIcons[gallery.id] || '🏛️'}</div>
            <h3>${getLocalizedText(gallery.name)}</h3>
            <p>${getLocalizedText(gallery.description)}</p>
        `;
        card.addEventListener('click', () => selectGallery(gallery.id));
        elements.galleryGrid.appendChild(card);
    });
}

async function selectGallery(galleryId) {
    forceStopAllAudio();
    currentGalleryId = galleryId;
    const data = await fetchData(`/api/exhibits/${galleryId}`);
    if (data) {
        currentGalleryExhibits = data.exhibits;
        logAction({ galleryId, action: 'enter_gallery' });
        showSection('gallery-view');
        renderGalleryView();
        renderMap();
    }
}

function renderGalleryView() {
    const gallery = galleries.find(g => g.id === currentGalleryId);
    if (gallery) {
        elements.galleryTitle.textContent = getLocalizedText(gallery.name);
        elements.galleryDescription.textContent = getLocalizedText(gallery.description);
    }
    
    elements.exhibitList.innerHTML = '';
    currentGalleryExhibits.forEach(exhibit => {
        const item = document.createElement('div');
        item.className = 'exhibit-item';
        item.dataset.exhibitId = exhibit.id;
        item.innerHTML = `
            <h4>${getLocalizedText(exhibit.name)}</h4>
            <p class="exhibit-year">${getLocalizedText(exhibit.year)}</p>
        `;
        item.addEventListener('click', () => openExhibitModal(exhibit.id));
        elements.exhibitList.appendChild(item);
    });
}

function renderMap() {
    const mapSvg = document.getElementById('museum-map');
    if (!mapSvg) return;
    
    elements.mapGalleries.innerHTML = '';
    elements.mapExhibits.innerHTML = '';
    
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
        elements.mapGalleries.appendChild(marker);
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
        elements.mapExhibits.appendChild(marker);
    });
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
    document.getElementById(sectionId).classList.add('active');
}

async function openExhibitModal(exhibitId) {
    currentExhibitId = exhibitId;
    const exhibit = currentGalleryExhibits.find(e => e.id === exhibitId);
    
    if (!exhibit) return;
    
    stopAudio();
    
    logAction({ exhibitId, galleryId: currentGalleryId, action: 'view_exhibit' });
    
    populateModal(exhibit);
    
    document.querySelectorAll('.exhibit-item').forEach(item => {
        item.classList.toggle('active', item.dataset.exhibitId === exhibitId);
    });
    
    updateMapMarkers();
    
    elements.modal.classList.add('active');
}

function populateModal(exhibit) {
    elements.modalExhibitName.textContent = getLocalizedText(exhibit.name);
    elements.modalExhibitYear.textContent = getLocalizedText(exhibit.year);
    elements.modalExhibitDescription.textContent = getLocalizedText(exhibit.description);
    
    const audioText = getLocalizedText(exhibit.audioText);
    estimatedDuration = audioText.length * 0.08;
    elements.audioDuration.textContent = formatTime(estimatedDuration);
    
    elements.audioStatus.innerHTML = `<span>${t('ready-to-play')}</span>`;
    elements.audioCurrent.textContent = '0:00';
    elements.progressFill.style.width = '0%';
    currentProgress = 0;
}

function closeModal() {
    stopAudio();
    elements.modal.classList.remove('active');
    currentExhibitId = null;
    document.querySelectorAll('.exhibit-item').forEach(item => {
        item.classList.remove('active');
    });
    updateMapMarkers();
}

function getVoiceByLang() {
    const voices = speechSynthesis.getVoices();
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
    if (!speechSynthesis) {
        alert(t('speech-not-supported'));
        return;
    }
    
    const exhibit = currentGalleryExhibits.find(e => e.id === currentExhibitId);
    if (!exhibit) return;
    
    if (currentUtterance && speechSynthesis.paused) {
        speechSynthesis.resume();
        startProgressTracking();
        elements.playIcon.textContent = '⏸';
        elements.audioStatus.innerHTML = `<span>${t('playing')}</span>`;
        logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'resume_audio' });
        return;
    }
    
    if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.pause();
        stopProgressTracking();
        elements.playIcon.textContent = '▶';
        elements.audioStatus.innerHTML = `<span>${t('paused')}</span>`;
        logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'pause_audio' });
        return;
    }
    
    stopAudio();
    
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
        elements.playIcon.textContent = '⏸';
        elements.audioStatus.innerHTML = `<span>${t('playing')}</span>`;
        startProgressTracking();
        logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'play_audio' });
    };
    
    currentUtterance.onend = () => {
        elements.playIcon.textContent = '▶';
        elements.audioStatus.innerHTML = `<span>${t('finished')}</span>`;
        stopProgressTracking();
        currentProgress = 100;
        elements.progressFill.style.width = '100%';
        elements.audioCurrent.textContent = formatTime(estimatedDuration);
        currentUtterance = null;
    };
    
    currentUtterance.onerror = () => {
        elements.playIcon.textContent = '▶';
        elements.audioStatus.innerHTML = `<span>${t('stopped')}</span>`;
        stopProgressTracking();
        currentUtterance = null;
    };
    
    speechSynthesis.speak(currentUtterance);
}

function forceStopAllAudio() {
    if (speechSynthesis) {
        try {
            speechSynthesis.cancel();
        } catch (e) {
            console.warn('speechSynthesis.cancel() failed:', e);
        }
    }
    stopProgressTracking();
    currentUtterance = null;
    currentProgress = 0;
    if (elements.playIcon) {
        elements.playIcon.textContent = '▶';
    }
    if (elements.progressFill) {
        elements.progressFill.style.width = '0%';
    }
    if (elements.audioCurrent) {
        elements.audioCurrent.textContent = '0:00';
    }
}

function stopAudio() {
    forceStopAllAudio();
    if (elements.audioStatus && elements.modal.classList.contains('active')) {
        elements.audioStatus.innerHTML = `<span>${t('stopped')}</span>`;
        if (currentExhibitId) {
            logAction({ exhibitId: currentExhibitId, galleryId: currentGalleryId, action: 'stop_audio' });
        }
    }
}

function startProgressTracking() {
    stopProgressTracking();
    const startTime = Date.now() - (currentProgress / 100 * estimatedDuration * 1000);
    progressInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        currentProgress = Math.min((elapsed / estimatedDuration) * 100, 100);
        elements.progressFill.style.width = `${currentProgress}%`;
        elements.audioCurrent.textContent = formatTime(elapsed);
    }, 100);
}

function stopProgressTracking() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function seekAudio(event) {
    if (!currentUtterance) return;
    const rect = elements.progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    currentProgress = percent * 100;
    elements.progressFill.style.width = `${currentProgress}%`;
    elements.audioCurrent.textContent = formatTime((currentProgress / 100) * estimatedDuration);
    
    if (speechSynthesis.speaking || speechSynthesis.paused) {
        speechSynthesis.cancel();
        currentUtterance = null;
    }
}

function initEventListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    
    elements.backToGalleries.addEventListener('click', () => {
        closeModal();
        currentGalleryId = null;
        showSection('gallery-selection');
        logAction({ action: 'back_to_galleries' });
    });
    
    elements.modalClose.addEventListener('click', closeModal);
    
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });
    
    elements.audioPlay.addEventListener('click', playAudio);
    elements.audioStop.addEventListener('click', stopAudio);
    elements.progressBar.addEventListener('click', seekAudio);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    if (speechSynthesis) {
        speechSynthesis.onvoiceschanged = () => {
            speechSynthesis.getVoices();
        };
    }
}

async function init() {
    initEventListeners();
    
    const mapData = await fetchData('/api/map');
    if (mapData) {
        galleries = mapData.galleries;
        exhibits = mapData.exhibits;
    }
    
    renderGalleryGrid();
    updateUILanguage();
    logAction({ action: 'app_start' });
}

document.addEventListener('DOMContentLoaded', init);
