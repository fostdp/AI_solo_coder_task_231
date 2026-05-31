const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const LOG_FILE = path.join(DATA_DIR, 'access-logs.json');
const PATH_FILE = path.join(DATA_DIR, 'paths.json');
const COMMENT_FILE = path.join(DATA_DIR, 'comments.json');
const LIKE_FILE = path.join(DATA_DIR, 'likes.json');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
}

if (!fs.existsSync(PATH_FILE)) {
    fs.writeFileSync(PATH_FILE, JSON.stringify([]));
}

if (!fs.existsSync(COMMENT_FILE)) {
    fs.writeFileSync(COMMENT_FILE, JSON.stringify([]));
}

if (!fs.existsSync(LIKE_FILE)) {
    fs.writeFileSync(LIKE_FILE, JSON.stringify({}));
}

app.get('/api/galleries', (req, res) => {
    const dataPath = path.join(DATA_DIR, 'exhibits.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json({ galleries: data.galleries });
});

app.get('/api/exhibits/:galleryId', (req, res) => {
    const { galleryId } = req.params;
    const dataPath = path.join(DATA_DIR, 'exhibits.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const galleryExhibits = data.exhibits.filter(e => e.galleryId === galleryId);
    const gallery = data.galleries.find(g => g.id === galleryId);
    
    res.json({
        gallery: gallery || null,
        exhibits: galleryExhibits
    });
});

app.get('/api/exhibit/:exhibitId', (req, res) => {
    const { exhibitId } = req.params;
    const dataPath = path.join(DATA_DIR, 'exhibits.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const exhibit = data.exhibits.find(e => e.id === exhibitId);
    
    if (exhibit) {
        res.json({ exhibit });
    } else {
        res.status(404).json({ error: 'Exhibit not found' });
    }
});

app.get('/api/map', (req, res) => {
    const dataPath = path.join(DATA_DIR, 'exhibits.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json({
        galleries: data.galleries,
        exhibits: data.exhibits
    });
});

app.post('/api/log', (req, res) => {
    const { exhibitId, galleryId, action, language } = req.body;
    
    const logEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        exhibitId: exhibitId || null,
        galleryId: galleryId || null,
        action: action || 'view',
        language: language || 'zh',
        userAgent: req.headers['user-agent'] || 'unknown',
        ip: req.ip || req.connection.remoteAddress || 'unknown'
    };
    
    try {
        const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
        logs.push(logEntry);
        fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
        res.json({ success: true, log: logEntry });
    } catch (error) {
        console.error('Error writing log:', error);
        res.status(500).json({ error: 'Failed to write log' });
    }
});

app.get('/api/logs', (req, res) => {
    try {
        const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
        const { limit } = req.query;
        const result = limit ? logs.slice(-parseInt(limit)) : logs;
        res.json({ logs: result.reverse() });
    } catch (error) {
        console.error('Error reading logs:', error);
        res.status(500).json({ error: 'Failed to read logs' });
    }
});

app.get('/api/stats', (req, res) => {
    try {
        const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
        const today = new Date().toISOString().split('T')[0];
        
        const stats = {
            totalVisits: logs.length,
            todayVisits: logs.filter(l => l.timestamp.startsWith(today)).length,
            byGallery: {},
            byLanguage: {}
        };
        
        logs.forEach(log => {
            if (log.galleryId) {
                stats.byGallery[log.galleryId] = (stats.byGallery[log.galleryId] || 0) + 1;
            }
            if (log.language) {
                stats.byLanguage[log.language] = (stats.byLanguage[log.language] || 0) + 1;
            }
        });
        
        res.json(stats);
    } catch (error) {
        console.error('Error calculating stats:', error);
        res.status(500).json({ error: 'Failed to calculate stats' });
    }
});

app.post('/api/path/add', (req, res) => {
    const { userId, galleryId, exhibitId, action } = req.body;
    
    const pathEntry = {
        id: Date.now().toString(),
        userId: userId || 'anonymous',
        galleryId: galleryId || null,
        exhibitId: exhibitId || null,
        action: action || 'visit',
        timestamp: new Date().toISOString()
    };
    
    try {
        const paths = JSON.parse(fs.readFileSync(PATH_FILE, 'utf8'));
        paths.push(pathEntry);
        fs.writeFileSync(PATH_FILE, JSON.stringify(paths, null, 2));
        res.json({ success: true, path: pathEntry });
    } catch (error) {
        console.error('Error writing path:', error);
        res.status(500).json({ error: 'Failed to save path' });
    }
});

app.get('/api/path/:userId', (req, res) => {
    const { userId } = req.params;
    
    try {
        const paths = JSON.parse(fs.readFileSync(PATH_FILE, 'utf8'));
        const userPaths = paths.filter(p => p.userId === userId || (userId === 'anonymous' && !p.userId));
        res.json({ paths: userPaths.reverse() });
    } catch (error) {
        console.error('Error reading paths:', error);
        res.status(500).json({ error: 'Failed to read paths' });
    }
});

app.get('/api/recommendations/:userId', (req, res) => {
    const { userId } = req.params;
    
    try {
        const paths = JSON.parse(fs.readFileSync(PATH_FILE, 'utf8'));
        const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
        const dataPath = path.join(DATA_DIR, 'exhibits.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        const userPaths = paths.filter(p => p.userId === userId || (userId === 'anonymous' && !p.userId));
        
        const visitedExhibits = new Set(userPaths.filter(p => p.exhibitId).map(p => p.exhibitId));
        const visitedGalleries = new Set(userPaths.filter(p => p.galleryId).map(p => p.galleryId));
        
        const galleryVisitCount = {};
        userPaths.forEach(p => {
            if (p.galleryId) {
                galleryVisitCount[p.galleryId] = (galleryVisitCount[p.galleryId] || 0) + 1;
            }
        });
        
        const globalPopular = {};
        logs.forEach(log => {
            if (log.exhibitId) {
                globalPopular[log.exhibitId] = (globalPopular[log.exhibitId] || 0) + 1;
            }
        });
        
        let recommendations = [];
        
        const unvisitedExhibits = data.exhibits.filter(e => !visitedExhibits.has(e.id));
        
        if (visitedGalleries.size > 0) {
            const favoriteGallery = Object.entries(galleryVisitCount)
                .sort((a, b) => b[1] - a[1])[0]?.[0];
            
            if (favoriteGallery) {
                const galleryExhibits = unvisitedExhibits.filter(e => e.galleryId === favoriteGallery);
                recommendations.push(...galleryExhibits.slice(0, 3));
            }
        }
        
        if (recommendations.length < 5) {
            const popularSorted = Object.entries(globalPopular)
                .sort((a, b) => b[1] - a[1])
                .map(([id]) => data.exhibits.find(e => e.id === id))
                .filter(e => e && !visitedExhibits.has(e.id));
            
            recommendations.push(...popularSorted.slice(0, 5 - recommendations.length));
        }
        
        if (recommendations.length < 5) {
            const remaining = unvisitedExhibits.filter(e => 
                !recommendations.find(r => r.id === e.id)
            );
            recommendations.push(...remaining.slice(0, 5 - recommendations.length));
        }
        
        const recommendationsWithScore = recommendations.map((exhibit, index) => ({
            ...exhibit,
            score: Math.max(100 - index * 10, 10),
            reason: visitedGalleries.has(exhibit.galleryId) ? 'similar_interest' : 'popular'
        }));
        
        res.json({ 
            recommendations: recommendationsWithScore.slice(0, 5),
            visitedCount: visitedExhibits.size,
            totalExhibits: data.exhibits.length
        });
    } catch (error) {
        console.error('Error getting recommendations:', error);
        res.status(500).json({ error: 'Failed to get recommendations' });
    }
});

app.get('/api/comments/:exhibitId', (req, res) => {
    const { exhibitId } = req.params;
    
    try {
        const comments = JSON.parse(fs.readFileSync(COMMENT_FILE, 'utf8'));
        const exhibitComments = comments.filter(c => c.exhibitId === exhibitId);
        res.json({ comments: exhibitComments.reverse() });
    } catch (error) {
        console.error('Error reading comments:', error);
        res.status(500).json({ error: 'Failed to read comments' });
    }
});

app.post('/api/comments/add', (req, res) => {
    const { exhibitId, userId, userName, content, language } = req.body;
    
    if (!exhibitId || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const comment = {
        id: Date.now().toString(),
        exhibitId,
        userId: userId || 'anonymous',
        userName: userName || '匿名用户',
        content: content.trim(),
        language: language || 'zh',
        timestamp: new Date().toISOString(),
        likes: 0
    };
    
    try {
        const comments = JSON.parse(fs.readFileSync(COMMENT_FILE, 'utf8'));
        comments.push(comment);
        fs.writeFileSync(COMMENT_FILE, JSON.stringify(comments, null, 2));
        res.json({ success: true, comment });
    } catch (error) {
        console.error('Error writing comment:', error);
        res.status(500).json({ error: 'Failed to save comment' });
    }
});

app.post('/api/likes/toggle', (req, res) => {
    const { exhibitId, userId } = req.body;
    
    if (!exhibitId) {
        return res.status(400).json({ error: 'Missing exhibitId' });
    }
    
    const userKey = userId || 'anonymous';
    
    try {
        const likes = JSON.parse(fs.readFileSync(LIKE_FILE, 'utf8'));
        
        if (!likes[exhibitId]) {
            likes[exhibitId] = {
                count: 0,
                users: []
            };
        }
        
        const userIndex = likes[exhibitId].users.indexOf(userKey);
        let isLiked;
        
        if (userIndex === -1) {
            likes[exhibitId].users.push(userKey);
            likes[exhibitId].count++;
            isLiked = true;
        } else {
            likes[exhibitId].users.splice(userIndex, 1);
            likes[exhibitId].count = Math.max(0, likes[exhibitId].count - 1);
            isLiked = false;
        }
        
        fs.writeFileSync(LIKE_FILE, JSON.stringify(likes, null, 2));
        res.json({ 
            success: true, 
            isLiked, 
            count: likes[exhibitId].count 
        });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ error: 'Failed to toggle like' });
    }
});

app.get('/api/likes/:exhibitId', (req, res) => {
    const { exhibitId } = req.params;
    const { userId } = req.query;
    
    try {
        const likes = JSON.parse(fs.readFileSync(LIKE_FILE, 'utf8'));
        const exhibitLikes = likes[exhibitId] || { count: 0, users: [] };
        const userKey = userId || 'anonymous';
        const isLiked = exhibitLikes.users.includes(userKey);
        
        res.json({ 
            count: exhibitLikes.count, 
            isLiked 
        });
    } catch (error) {
        console.error('Error reading likes:', error);
        res.status(500).json({ error: 'Failed to read likes' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`博物馆语音导览服务已启动: http://localhost:${PORT}`);
    console.log(`访问日志存储在: ${LOG_FILE}`);
});
