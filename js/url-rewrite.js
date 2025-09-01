// Простой URL Rewrite для красивых адресов
console.log('URL Rewrite скрипт загружен');

// Функция для скрытия реальных путей
function hideRealPaths() {
    const currentPath = window.location.pathname;
    console.log('Текущий путь:', currentPath);
    
    let newPath = currentPath;
    
    // Если в пути есть /pages/, скрываем это
    if (currentPath.includes('/pages/')) {
        newPath = currentPath
            .replace('/pages/services/', '/services/')
            .replace('/pages/products/', '/products/')
            .replace('.html', '');
        
        console.log('Новый путь:', newPath);
        
        // Обновляем URL без перезагрузки страницы
        window.history.replaceState({}, '', newPath);
    }
    
    // Если в конце .html, убираем
    if (currentPath.endsWith('.html') && !currentPath.includes('/pages/')) {
        newPath = currentPath.replace('.html', '');
        console.log('Убираем .html:', newPath);
        window.history.replaceState({}, '', newPath);
    }
}

// Функция для обработки внутренних ссылок
function handleInternalLinks() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;
        
        console.log('Клик по ссылке:', href);
        
        // Если ссылка ведет на /pages/, обновляем URL
        if (href.includes('/pages/')) {
            e.preventDefault();
            const newHref = href
                .replace('/pages/services/', '/services/')
                .replace('/pages/products/', '/products/')
                .replace('.html', '');
            
            console.log('Обновляем ссылку на:', newHref);
            
            // Обновляем URL и переходим
            window.history.pushState({}, '', newHref);
            window.location.href = href; // Переходим по реальному пути
        }
    });
}

// Запускаем при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM загружен, запускаем URL Rewrite');
        hideRealPaths();
        handleInternalLinks();
    });
} else {
    console.log('DOM уже загружен, запускаем URL Rewrite');
    hideRealPaths();
    handleInternalLinks();
}

// Также запускаем при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
    hideRealPaths();
});

console.log('URL Rewrite инициализирован');
