class FavoriteButton {
  constructor() {
    this.button = document.querySelector('.favorite-btn');
    this.productId = this.button.closest('.favorite-button').dataset.productId;
    this.productTitle = document.querySelector('.product-title')?.textContent || 'Product';
    this.init();
  }

  init() {
    this.loadFavorites();
    this.setupEventListeners();
    this.updateTooltip();
  }

  setupEventListeners() {
    this.button.addEventListener('click', () => this.toggleFavorite());
  }

  loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(this.productId)) {
      this.button.classList.add('active');
    }
  }

  updateTooltip() {
    const isFavorite = this.button.classList.contains('active');
    this.button.setAttribute('data-tooltip', isFavorite ? 'Remove from favorites' : 'Add to favorites');
  }

  showNotification(message, isRemove = false) {
    const notification = document.createElement('div');
    notification.className = `favorite-notification${isRemove ? ' remove' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger reflow
    notification.offsetHeight;
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(this.productId);
    const isRemove = index !== -1;

    if (isRemove) {
      favorites.splice(index, 1);
      this.button.classList.remove('active');
      this.showNotification(`${this.productTitle} removed from favorites`, true);
    } else {
      favorites.push(this.productId);
      this.button.classList.add('active');
      this.showNotification(`${this.productTitle} added to favorites`);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.updateTooltip();
  }
}

// Initialize all favorite buttons on the page
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.favorite-button').forEach(button => {
    new FavoriteButton();
  });
}); 