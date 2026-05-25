// Selectors for YouTube Shorts elements
const shortsSelectors = [
  'ytd-guide-entry-renderer a[title="Shorts"]', // Left sidebar
  'ytd-mini-guide-entry-renderer a[title="Shorts"]', // Collapsed sidebar
  'ytm-pivot-bar-item-renderer a[href="/shorts"]', // Mobile bottom bar
  "ytd-reel-shelf-renderer", // Shorts shelf on homepage
  'ytd-rich-shelf-renderer:has([href*="/shorts/"])', // Rich shelf shorts
  '[href^="/shorts/"]', // Any link to /shorts/
  'ytd-rich-item-renderer:has([href^="/shorts/"])', // Individual Shorts in grid
  'ytd-video-renderer:has([href^="/shorts/"])', // Shorts in search results
];

// Selectors for Community Posts
const communitySelectors = [
  'ytd-item-section-renderer:has(#header-description[href*="/community"])',
  "ytd-backstage-post-renderer", // Individual community posts
  "#contents ytd-backstage-post-renderer", // Posts in subscription feed
  'ytd-shelf-renderer:has([title*="Community"])', // Community shelf
];

// Function to hide elements matching given selectors
function hideElements(selectors) {
  selectors.forEach((selector) => {
    try {
      document.querySelectorAll(selector).forEach((el) => {
        el.style.display = "none";
      });
    } catch (e) {
      // Silently handle invalid selectors
    }
  });
}

// Main function to remove all distractions
function removeDistractions() {
  hideElements(shortsSelectors);
  hideElements(communitySelectors);
}

// Run immediately
removeDistractions();

// Watch for dynamically loaded content (infinite scroll)
const observer = new MutationObserver(() => {
  removeDistractions();
});

// Start observing DOM changes
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
