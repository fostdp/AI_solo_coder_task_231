const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const htmlContent = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>博物馆藏品语音导览</title>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <h1 class="logo">🏛️ <span data-i18n="app-title">博物馆藏品语音导览</span></h1>
            <div class="header-controls">
                <div class="language-selector">
                    <button class="lang-btn active" data-lang="zh">中文</button>
                    <button class="lang-btn" data-lang="en">English</button>
                    <button class="lang-btn" data-lang="ja">日本語</button>
                </div>
                <button class="header-btn" id="btn-path">
                    📍 <span data-i18n="my-path">我的路径</span>
                </button>
                <button class="header-btn" id="btn-recommend">
                    💡 <span data-i18n="recommend">推荐路线</span>
                </button>
            </div>
        </div>
    </header>

    <main class="main-container">
        <section id="gallery-selection" class="section active">
            <h2 data-i18n="select-gallery">选择展厅</h2>
            <div class="gallery-grid" id="gallery-grid"></div>
        </section>

        <section id="gallery-view" class="section">
            <button class="back-btn" id="back-to-galleries">
                ← <span data-i18n="back">返回</span>
            </button>
            <div class="gallery-header">
                <h2 id="gallery-title"></h2>
                <p id="gallery-description" class="gallery-desc"></p>
            </div>
            
            <div class="gallery-layout">
                <div class="exhibit-list-section">
                    <h3 data-i18n="exhibit-list">藏品列表</h3>
                    <div class="exhibit-list" id="exhibit-list"></div>
                </div>
                
                <div class="map-section">
                    <h3 data-i18n="floor-map">展厅地图</h3>
                    <div class="map-container" id="map-container">
                        <svg class="museum-map" viewBox="0 0 100 100" id="museum-map">
                            <rect class="map-bg" x="0" y="0" width="100" height="100" fill="#f5f5f5"/>
                            <g id="map-galleries"></g>
                            <g id="map-exhibits"></g>
                            <g id="map-path"></g>
                        </svg>
                    </div>
                </div>
            </div>
        </section>

        <section id="path-view" class="section">
            <button class="back-btn" id="back-from-path">
                ← <span data-i18n="back">返回</span>
            </button>
            <div class="path-header">
                <h2 data-i18n="my-path">我的游览路径</h2>
                <div class="path-stats" id="path-stats"></div>
            </div>
            <div class="path-list" id="path-list">
            </div>
        </section>

        <section id="recommend-view" class="section">
            <button class="back-btn" id="back-from-recommend">
                ← <span data-i18n="back">返回</span>
            </button>
            <div class="recommend-header">
                <h2 data-i18n="recommend">个性化推荐路线</h2>
                <p id="recommend-summary" class="recommend-summary"></p>
            </div>
            <div class="recommend-list" id="recommend-list">
            </div>
        </section>

        <div id="exhibit-modal" class="modal">
            <div class="modal-content">
                <button class="modal-close" id="modal-close">×</button>
                <div class="modal-header">
                    <h2 id="modal-exhibit-name"></h2>
                    <div class="modal-actions">
                        <button class="action-btn like-btn" id="btn-like">
                            <span id="like-icon">🤍</span>
                            <span id="like-count">0</span>
                        </button>
                        <button class="action-btn ar-btn" id="btn-ar">
                            📷 <span data-i18n="ar-mode">AR模式</span>
                        </button>
                    </div>
                </div>
                <p class="exhibit-year" id="modal-exhibit-year"></p>
                
                <div class="audio-player">
                    <button class="audio-btn play-btn" id="audio-play">
                        <span id="play-icon">▶</span>
                    </button>
                    <div class="audio-controls">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="audio-info">
                            <span id="audio-current">0:00</span>
                            <span id="audio-duration">0:00</span>
                        </div>
                    </div>
                    <button class="audio-btn stop-btn" id="audio-stop">⏹</button>
                </div>
                
                <div class="audio-status" id="audio-status">
                    <span data-i18n="ready-to-play">准备播放语音解说</span>
                </div>
                
                <div class="description-section">
                    <h4 data-i18n="text-introduction">文字介绍</h4>
                    <p id="modal-exhibit-description"></p>
                </div>

                <div class="community-section">
                    <h4 data-i18n="community">社区互动</h4>
                    
                    <div class="comment-input-section">
                        <input type="text" id="comment-input" class="comment-input" placeholder="写下您的评论...">
                        <button class="comment-submit-btn" id="btn-submit-comment" data-i18n="submit-comment">发布</button>
                    </div>
                    
                    <div class="comments-list" id="comments-list">
                    </div>
                </div>
            </div>
        </div>

        <div id="ar-modal" class="modal ar-modal">
            <div class="ar-content">
                <div class="ar-header">
                    <h2 data-i18n="ar-view">AR展品展示</h2>
                    <button class="modal-close" id="ar-close">×</button>
                </div>
                
                <div class="ar-container">
                    <video id="ar-video" autoplay playsinline muted></video>
                    <canvas id="ar-canvas"></canvas>
                    <div class="ar-overlay" id="ar-overlay">
                        <div class="ar-info">
                            <h3 id="ar-exhibit-name"></h3>
                            <p id="ar-exhibit-year"></p>
                        </div>
                    </div>
                </div>
                
                <div class="ar-controls">
                    <button class="ar-action-btn" id="btn-snapshot">📸 拍照</button>
                    <button class="ar-action-btn" id="btn-toggle-animation">✨ 动画</button>
                </div>
                
                <div class="ar-placeholder" id="ar-placeholder">
                    <p data-i18n="camera-permission">点击下方按钮开启AR体验</p>
                    <button class="ar-start-btn" id="btn-start-ar" data-i18n="start-ar">开启摄像头</button>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <p data-i18n="footer-text">© 2026 博物馆语音导览系统 - 让艺术触手可及</p>
    </footer>
</body>
</html>
`;

function resetDOM() {
    document.documentElement.innerHTML = '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.documentElement.innerHTML = doc.documentElement.innerHTML;
}

class MockSpeechSynthesisUtterance {
    constructor(text) {
        this.text = text;
        this.lang = 'zh-CN';
        this.rate = 1;
        this.pitch = 1;
        this.volume = 1;
        this.voice = null;
        this.onstart = null;
        this.onend = null;
        this.onerror = null;
        this.onpause = null;
        this.onresume = null;
        this._listeners = {};
    }
    
    addEventListener(event, callback) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
    }
    
    removeEventListener(event, callback) {
        if (this._listeners[event]) {
            this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
        }
    }
    
    dispatchEvent(eventName) {
        if (this._listeners[eventName]) {
            this._listeners[eventName].forEach(cb => cb({ type: eventName }));
        }
        const handler = this['on' + eventName];
        if (handler) {
            handler({ type: eventName });
        }
    }
}

global.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

const mockVoices = [
    { name: 'Microsoft Huihui', lang: 'zh-CN', default: true },
    { name: 'Microsoft David', lang: 'en-US', default: false },
    { name: 'Microsoft Ayumi', lang: 'ja-JP', default: false }
];

let speechQueue = [];
let isSpeaking = false;
let isPaused = false;

const mockSpeechSynthesis = {
    getVoices: jest.fn(() => mockVoices),
    speak: jest.fn((utterance) => {
        speechQueue.push(utterance);
        isSpeaking = true;
        isPaused = false;
        setTimeout(() => {
            if (utterance.onstart) {
                utterance.onstart({ type: 'start' });
            }
        }, 10);
    }),
    cancel: jest.fn(() => {
        speechQueue = [];
        isSpeaking = false;
        isPaused = false;
    }),
    pause: jest.fn(() => {
        if (isSpeaking && !isPaused) {
            isPaused = true;
        }
    }),
    resume: jest.fn(() => {
        if (isPaused) {
            isPaused = false;
        }
    }),
    get speaking() {
        return isSpeaking;
    },
    get paused() {
        return isPaused;
    },
    get pending() {
        return speechQueue.length > 0;
    },
    onvoiceschanged: null
};

global.speechSynthesis = mockSpeechSynthesis;
window.speechSynthesis = mockSpeechSynthesis;

let fetchMockData = {};
let fetchShouldFail = false;
let fetchErrorType = 'network';
let fetchCalls = [];

global.fetch = jest.fn((url, options = {}) => {
    fetchCalls.push({ url, options });
    
    if (fetchShouldFail) {
        if (fetchErrorType === 'network') {
            return Promise.reject(new TypeError('Failed to fetch'));
        } else {
            return Promise.resolve({
                ok: false,
                status: 500,
                json: () => Promise.reject(new Error('HTTP error'))
            });
        }
    }
    
    const mockResponse = fetchMockData[url];
    if (mockResponse) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        });
    }
    
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
    });
});

window.fetch = global.fetch;

global.setFetchMockData = (data) => {
    fetchMockData = { ...fetchMockData, ...data };
};

global.clearFetchMockData = () => {
    fetchMockData = {};
    fetchCalls = [];
};

global.getFetchCalls = () => [...fetchCalls];

global.setFetchShouldFail = (fail = true, type = 'network') => {
    fetchShouldFail = fail;
    fetchErrorType = type;
};

global.resetFetch = () => {
    fetchShouldFail = false;
    fetchErrorType = 'network';
};

global.resetSpeechSynthesis = () => {
    speechQueue = [];
    isSpeaking = false;
    isPaused = false;
    mockSpeechSynthesis.speak.mockClear();
    mockSpeechSynthesis.cancel.mockClear();
    mockSpeechSynthesis.pause.mockClear();
    mockSpeechSynthesis.resume.mockClear();
};

global.getSpeechQueue = () => speechQueue;
global.isSpeaking = () => isSpeaking;
global.isPaused = () => isPaused;

global.clearAllTimeouts = () => {
    jest.clearAllTimers();
};

resetDOM();

beforeEach(() => {
    resetDOM();
    global.window.speechSynthesis = global.speechSynthesis;
    window.speechSynthesis = global.speechSynthesis;
    global.resetSpeechSynthesis();
    global.clearFetchMockData();
    global.resetFetch();
});
