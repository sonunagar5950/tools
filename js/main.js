// Load header and footer components
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');
    initializeSearch();
    loadCategories();
    loadPopularTools();
});

// Function to load HTML components
async function loadComponent(elementId, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${path}:`, error);
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load categories
function loadCategories() {
    const categories = [
        { name: 'Image Tools', icon: 'fa-image', count: 10 },
        { name: 'SEO Tools', icon: 'fa-search', count: 10 },
        { name: 'Text Tools', icon: 'fa-font', count: 10 },
        { name: 'Developer Tools', icon: 'fa-code', count: 10 },
        { name: 'Math & Calculators', icon: 'fa-calculator', count: 10 },
        { name: 'Unit Converters', icon: 'fa-exchange-alt', count: 10 }
    ];

    const container = document.getElementById('categories-container');
    if (container) {
        categories.forEach(category => {
            const categoryHtml = `
                <div class="col-md-4 col-lg-3">
                    <div class="category-card">
                        <i class="fas ${category.icon} category-icon"></i>
                        <h3 class="h5">${category.name}</h3>
                        <p class="text-muted">${category.count} tools</p>
                    </div>
                </div>
            `;
            container.innerHTML += categoryHtml;
        });
    }
}

// Load popular tools
function loadPopularTools() {
    const popularTools = [
        { name: 'Image to PNG', icon: 'fa-image', description: 'Convert images to PNG format' },
        { name: 'Word Counter', icon: 'fa-font', description: 'Count words and characters in text' },
        { name: 'JSON Formatter', icon: 'fa-code', description: 'Format and validate JSON data' },
        { name: 'Meta Tag Generator', icon: 'fa-tags', description: 'Generate meta tags for SEO' }
    ];

    const container = document.getElementById('popular-tools-container');
    if (container) {
        popularTools.forEach(tool => {
            const toolHtml = `
                <div class="col-md-6 col-lg-3">
                    <div class="card tool-card h-100">
                        <div class="card-body text-center">
                            <i class="fas ${tool.icon} tool-icon"></i>
                            <h5 class="card-title">${tool.name}</h5>
                            <p class="card-text text-muted">${tool.description}</p>
                            <a href="/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}.html" class="btn btn-primary">Use Tool</a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += toolHtml;
        });
    }
}

// Show loading animation
function showLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('active');
    }
}

// Hide loading animation
function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.remove('active');
    }
}

// Handle form submissions
function handleFormSubmit(event, callback) {
    event.preventDefault();
    showLoading();
    
    try {
        callback();
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Show success message
function showSuccess(message) {
    const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.querySelector('.tool-container').insertAdjacentHTML('afterbegin', alertHtml);
}

// Show error message
function showError(message) {
    const alertHtml = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.querySelector('.tool-container').insertAdjacentHTML('afterbegin', alertHtml);
} 