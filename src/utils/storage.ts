const STORAGE_PREFIX = 'thakaa_';

export const Storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const val = localStorage.getItem(STORAGE_PREFIX + key);
      return val !== null ? (JSON.parse(val) as T) : defaultValue;
    } catch (e) {
      console.warn('Storage.get error:', e);
      return defaultValue;
    }
  },
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage.set error:', e);
      return false;
    }
  },
  remove(key: string): boolean {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (e) {
      console.warn('Storage.remove error:', e);
      return false;
    }
  },
  push<T>(key: string, value: T): boolean {
    const arr = Storage.get<T[]>(key, []);
    arr.push(value);
    return Storage.set(key, arr);
  },
  getSavedTools(): number[] {
    return Storage.get<number[]>('savedTools', []);
  },
  isToolSaved(id: number): boolean {
    const list = Storage.getSavedTools();
    return list.includes(id);
  },
  toggleSavedTool(id: number): boolean {
    const list = Storage.getSavedTools();
    const index = list.indexOf(id);
    let isSaved = false;
    if (index > -1) {
      list.splice(index, 1);
      isSaved = false;
    } else {
      list.push(id);
      isSaved = true;
    }
    Storage.set('savedTools', list);
    return isSaved;
  }
};

export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = type === 'success' ? '✓' : '✗';
  
  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

export const getAffiliateStats = () => {
  const clicks = Storage.get<any[]>('affiliateClicks', []);
  const subscribers = Storage.get<any[]>('newsletterSubscribers', []);
  const submissions = Storage.get<any[]>('toolSubmissions', []);

  const estimatedConversions = Math.floor(clicks.length * 0.02);
  const estimatedRevenue = estimatedConversions * 49 * 0.30 * 8;

  return {
    clicks: clicks.length,
    subscribers: subscribers.length,
    submissions: submissions.length,
    revenue: estimatedRevenue
  };
};
