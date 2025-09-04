// Оптимизация производительности

// Lazy loading для изображений
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Оптимизация шрифтов
function optimizeFonts() {
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('300 16px Inter'),
            document.fonts.load('400 16px Inter'),
            document.fonts.load('500 16px Inter'),
            document.fonts.load('600 16px Inter'),
            document.fonts.load('700 16px Inter')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
}

// Оптимизация скролла
function optimizeScroll() {
    let ticking = false;
    
    function updateScroll() {
        // Добавляем класс для оптимизации скролла
        if (window.scrollY > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Оптимизация анимаций
function optimizeAnimations() {
    // Проверяем предпочтения пользователя
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Оптимизация загрузки ресурсов
function optimizeResourceLoading() {
    // Предзагрузка критических ресурсов
    const criticalResources = [
        '/css/bit-custom.css',
        '/components/header.html',
        '/components/footer.html'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'fetch';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Оптимизация метрик производительности
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                
                // Отправляем метрики в Google Analytics или другое аналитическое решение
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        name: 'load',
                        value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                    });
                }
                
                // Логируем метрики в консоль для разработки
                console.log('Performance metrics:', {
                    'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    'First Paint': Math.round(performance.getEntriesByName('first-paint')[0]?.startTime || 0),
                    'First Contentful Paint': Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0)
                });
            }, 0);
        });
    }
}

// Оптимизация для мобильных устройств
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Оптимизируем touch события
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Свайп вверх
                    console.log('Swipe up detected');
                } else {
                    // Свайп вниз
                    console.log('Swipe down detected');
                }
            }
        }
    }
}

// Оптимизация кэширования
function optimizeCaching() {
    // Проверяем поддержку Service Worker
    if ('serviceWorker' in navigator) {
        // Кэшируем статические ресурсы
        const staticResources = [
            '/css/bit-custom.css',
            '/js/performance.js',
            '/images/logo_cyberbit.png'
        ];
        
        if ('caches' in window) {
            caches.open('static-v1').then(cache => {
                cache.addAll(staticResources);
            });
        }
    }
}

// Основная функция инициализации
function initPerformanceOptimizations() {
    // Запускаем все оптимизации
    lazyLoadImages();
    optimizeFonts();
    optimizeScroll();
    optimizeAnimations();
    optimizeResourceLoading();
    trackPerformance();
    optimizeForMobile();
    optimizeCaching();
    
    console.log('Performance optimizations initialized');
}

// Запускаем оптимизации после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
    initPerformanceOptimizations();
}

// Экспортируем функции для использования в других скриптах
window.PerformanceOptimizer = {
    lazyLoadImages,
    optimizeFonts,
    optimizeScroll,
    optimizeAnimations,
    optimizeResourceLoading,
    trackPerformance,
    optimizeForMobile,
    optimizeCaching
};
