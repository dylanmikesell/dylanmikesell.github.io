/**
 * Cache Manager - Local Storage Caching with 24-hour TTL
 * Constitutional Requirements: Performance optimization, API response caching
 */

class CacheManager {
  constructor() {
    this.defaultTTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    this.storagePrefix = 'dmsite_cache_';
    
    // Clean expired cache on initialization
    this.cleanExpiredCache();
  }

  /**
   * Set cache entry with TTL
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds (optional)
   */
  set(key, data, ttl = this.defaultTTL) {
    try {
      const expiryTime = Date.now() + ttl;
      const cacheEntry = {
        data: data,
        expiry: expiryTime,
        timestamp: Date.now()
      };
      
      const cacheKey = this.storagePrefix + key;
      localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
      
      console.log(`Cache set: ${key} (expires in ${Math.round(ttl / 1000 / 60)} minutes)`);
      return true;
    } catch (error) {
      console.warn('Cache set failed:', error);
      return false;
    }
  }

  /**
   * Get cache entry if not expired
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if expired/not found
   */
  get(key) {
    try {
      const cacheKey = this.storagePrefix + key;
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) {
        return null;
      }

      const cacheEntry = JSON.parse(cached);
      
      // Check if expired
      if (Date.now() > cacheEntry.expiry) {
        this.delete(key);
        console.log(`Cache expired: ${key}`);
        return null;
      }

      console.log(`Cache hit: ${key}`);
      return cacheEntry.data;
    } catch (error) {
      console.warn('Cache get failed:', error);
      this.delete(key); // Clean corrupted cache
      return null;
    }
  }

  /**
   * Delete cache entry
   * @param {string} key - Cache key
   */
  delete(key) {
    try {
      const cacheKey = this.storagePrefix + key;
      localStorage.removeItem(cacheKey);
      console.log(`Cache deleted: ${key}`);
    } catch (error) {
      console.warn('Cache delete failed:', error);
    }
  }

  /**
   * Clear all cache entries
   */
  clear() {
    try {
      const keys = Object.keys(localStorage);
      let deletedCount = 0;
      
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          localStorage.removeItem(key);
          deletedCount++;
        }
      });
      
      console.log(`Cache cleared: ${deletedCount} entries deleted`);
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }

  /**
   * Clean expired cache entries
   */
  cleanExpiredCache() {
    try {
      const keys = Object.keys(localStorage);
      let cleanedCount = 0;
      
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const cacheEntry = JSON.parse(cached);
              if (Date.now() > cacheEntry.expiry) {
                localStorage.removeItem(key);
                cleanedCount++;
              }
            }
          } catch (parseError) {
            // Remove corrupted cache entries
            localStorage.removeItem(key);
            cleanedCount++;
          }
        }
      });
      
      if (cleanedCount > 0) {
        console.log(`Cache cleaned: ${cleanedCount} expired entries removed`);
      }
    } catch (error) {
      console.warn('Cache cleaning failed:', error);
    }
  }

  /**
   * Get cache statistics
   * @returns {object} Cache statistics
   */
  getStats() {
    try {
      const keys = Object.keys(localStorage);
      let totalEntries = 0;
      let totalSize = 0;
      let expiredEntries = 0;
      
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          totalEntries++;
          const value = localStorage.getItem(key);
          totalSize += new Blob([value]).size;
          
          try {
            const cacheEntry = JSON.parse(value);
            if (Date.now() > cacheEntry.expiry) {
              expiredEntries++;
            }
          } catch (parseError) {
            expiredEntries++;
          }
        }
      });
      
      return {
        totalEntries,
        expiredEntries,
        activeEntries: totalEntries - expiredEntries,
        totalSizeBytes: totalSize,
        totalSizeKB: Math.round(totalSize / 1024 * 100) / 100
      };
    } catch (error) {
      console.warn('Cache stats failed:', error);
      return null;
    }
  }

  /**
   * Check if localStorage is available
   * @returns {boolean} True if localStorage is available
   */
  isAvailable() {
    try {
      const test = '__cache_test__';
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Cached fetch wrapper
   * @param {string} url - URL to fetch
   * @param {object} options - Fetch options (optional)
   * @param {number} cacheTTL - Cache TTL in milliseconds (optional)
   * @returns {Promise} Fetch promise
   */
  async cachedFetch(url, options = {}, cacheTTL = this.defaultTTL) {
    const cacheKey = `fetch_${url}_${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = this.get(cacheKey);
    if (cached) {
      return Promise.resolve(cached);
    }

    try {
      // Fetch from network
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the response
      this.set(cacheKey, data, cacheTTL);
      
      return data;
    } catch (error) {
      console.error('Cached fetch failed:', error);
      throw error;
    }
  }
}

// Export for use in other scripts
window.CacheManager = CacheManager;

// Initialize global cache manager
window.cacheManager = new CacheManager();

// Performance monitoring
window.addEventListener('load', function() {
  if (window.cacheManager.isAvailable()) {
    const stats = window.cacheManager.getStats();
    console.log('Cache Manager initialized:', stats);
    
    // Clean cache on page load
    window.cacheManager.cleanExpiredCache();
  } else {
    console.warn('localStorage not available - caching disabled');
  }
});

// Clean cache before page unload (for performance)
window.addEventListener('beforeunload', function() {
  if (window.cacheManager && window.cacheManager.isAvailable()) {
    window.cacheManager.cleanExpiredCache();
  }
});