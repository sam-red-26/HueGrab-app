// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update download links when builds are ready
// Replace these URLs with actual build download URLs after building
const ANDROID_APK_URL = 'YOUR_ANDROID_APK_URL'; // Will be updated after build
const IOS_IPA_URL = 'YOUR_IOS_IPA_URL'; // Will be updated after build

const androidDownloadBtn = document.getElementById('androidDownload');
const iosDownloadBtn = document.getElementById('iosDownload');

// Check if download URLs are set
if (ANDROID_APK_URL !== 'YOUR_ANDROID_APK_URL') {
    androidDownloadBtn.href = ANDROID_APK_URL;
} else {
    androidDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Android build is being prepared. Please check back soon!');
    });
}

if (IOS_IPA_URL !== 'YOUR_IOS_IPA_URL') {
    iosDownloadBtn.href = IOS_IPA_URL;
} else {
    iosDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('iOS build is being prepared. Please check back soon!');
    });
}

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, steps, and download cards
document.querySelectorAll('.feature-card, .step, .download-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Track download clicks for analytics (optional)
function trackDownload(platform) {
    console.log(`Download initiated for ${platform}`);
    // Add your analytics code here if needed
}

androidDownloadBtn.addEventListener('click', () => trackDownload('Android'));
iosDownloadBtn.addEventListener('click', () => trackDownload('iOS'));
