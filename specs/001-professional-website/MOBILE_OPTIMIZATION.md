# Mobile Optimization Guide

## Overview
This document describes the mobile-first optimizations implemented for Phase 4 (User Story 6: Mobile Professional Browsing).

## Constitutional Requirements
- **Performance**: Page loads <3 seconds on 3G connection
- **Touch Targets**: Minimum 44px tap targets for all interactive elements
- **Accessibility**: WCAG 2.1 AA compliance with focus indicators
- **Readability**: Comfortable reading without pinch-to-zoom

## Completed Optimizations

### T032: Font Size Optimization ✅
**File**: `_sass/base.scss`

**Changes**:
- Increased base font size from 16px to 18px (1.125rem)
- Increased line height from 1.5 to 1.6 for better reading comfort
- Adjusted all font size variables proportionally:
  - `--font-size-sm`: 0.875rem → 1rem
  - `--font-size-lg`: 1.125rem → 1.25rem
  - `--font-size-xl`: 1.25rem → 1.5rem
  - `--font-size-2xl`: 1.5rem → 1.875rem
  - `--font-size-3xl`: 1.875rem → 2.25rem

**Testing**: Verify text is readable on mobile without zooming

### T033: Native Mobile App Integration ✅
**File**: `_includes/contact-info.html`

**Features**:
- **Email Links**: `mailto:` protocol for native email app launching
- **Phone Links**: `tel:` protocol for native phone app launching
- **Touch Targets**: 44px minimum height/width for all contact links
- **Mobile Hints**: "Tap to open your email app" / "Tap to call directly" (hidden on desktop)
- **Accessibility**: ARIA labels, focus indicators, keyboard navigation
- **Animations**: Scale feedback on touch with `transform: scale(0.98)` on active state

**Configuration**:
```yaml
# _data/contact.yml
email: "your.email@example.com"  # Uncomment to enable
phone: "+1-555-123-4567"          # Uncomment to enable
office: "Building Name, Room 123" # Optional
office_hours: "By appointment"    # Optional
```

**CSS Features**:
- Touch target padding: 0.75rem on mobile
- Hover states with background color change
- Focus outline: 3px solid with 2px offset
- Active state feedback with scale transform
- Reduced motion support for accessibility

**Testing Checklist**:
- [ ] iOS Safari: Tap email link opens Mail app
- [ ] iOS Safari: Tap phone link opens Phone app with number pre-filled
- [ ] Android Chrome: Tap email link shows app chooser (Gmail, etc.)
- [ ] Android Chrome: Tap phone link opens Dialer app
- [ ] Desktop: Links work but no mobile hints visible
- [ ] Keyboard navigation: Tab through links, Enter to activate
- [ ] Screen reader: ARIA labels announce correctly

## Existing Optimizations (Pre-Phase 4)

### T030: Mobile-First Responsive Design ✅
**File**: `_sass/responsive.scss`

**Features**:
- Mobile-first breakpoint system
- Touch-friendly spacing and padding
- Responsive grid layouts
- `.touch-target` utility class (44px minimum)

### T031: Mobile Navigation ✅
**File**: `_includes/header.html`

**Features**:
- Hamburger menu toggle
- Collapsible mobile navigation
- Transform animations for menu slide-in
- Accessible focus management

### T034: Viewport Meta Tags ✅
**File**: `_layouts/default.html`

**Tag**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### T035: CSS Grid Layouts ✅
**File**: `_sass/responsive.scss`

**Features**:
- Mobile-first grid with 1 column
- Responsive breakpoints for 2/3/4 columns
- Auto-fit/auto-fill grid templates

## Pending Optimizations

### T036: Image Optimization
**Status**: TODO

**Requirements**:
- Responsive image srcset with multiple sizes
- WebP format with fallback to JPEG/PNG
- Lazy loading for below-the-fold images
- Aspect ratio boxes to prevent layout shift

**Implementation Plan**:
```liquid
<!-- _includes/responsive-image.html -->
<picture>
  <source 
    srcset="/assets/images/profile-320w.webp 320w,
            /assets/images/profile-768w.webp 768w,
            /assets/images/profile-1024w.webp 1024w"
    sizes="(max-width: 768px) 100vw, 50vw"
    type="image/webp">
  <img 
    src="/assets/images/profile-768w.jpg"
    alt="{{ include.alt }}"
    loading="lazy"
    width="{{ include.width }}"
    height="{{ include.height }}">
</picture>
```

**Tools**:
- `imagemagick` or `sharp` for image conversion
- Jekyll plugin: `jekyll-responsive-image` or custom build script

### T037-T038: Mobile Testing
**Status**: TODO

**Testing Devices**:
- iOS: iPhone SE (smallest), iPhone 14 Pro (standard), iPad Air
- Android: Pixel 7, Samsung Galaxy S23
- Browsers: Safari (iOS), Chrome (Android), Firefox (both)

**Testing Tools**:
- Chrome DevTools Device Mode
- BrowserStack or Sauce Labs for real device testing
- Lighthouse CI for automated performance testing

**Performance Targets**:
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Total Blocking Time (TBT): <300ms
- Cumulative Layout Shift (CLS): <0.1
- Lighthouse Performance Score: 90+
- Lighthouse Accessibility Score: 95+

## Mobile Testing Checklist

### Functionality Testing
- [ ] All navigation links work on mobile
- [ ] Contact form submits successfully
- [ ] Publications collapsible sections expand/collapse
- [ ] Email links open native mail app
- [ ] Phone links open native phone/dialer app
- [ ] External links open in new tab
- [ ] Back button navigation works correctly

### Visual Testing
- [ ] Text is readable without zooming (font size 18px+)
- [ ] Line length is comfortable (50-75 characters)
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scrolling required
- [ ] Images fit viewport and don't overflow
- [ ] Proper spacing between interactive elements
- [ ] Focus indicators are visible and clear

### Performance Testing
- [ ] Page loads in <3s on 3G connection
- [ ] No layout shifts during page load (CLS < 0.1)
- [ ] Smooth scrolling and animations (60fps)
- [ ] No janky transitions or touch delays
- [ ] Lighthouse Performance score 90+
- [ ] Lighthouse Accessibility score 95+

### Accessibility Testing
- [ ] Screen reader announces all content correctly
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus order is logical
- [ ] ARIA labels are present and accurate
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Form fields have visible labels
- [ ] Error messages are clear and helpful

## Troubleshooting

### Issue: Touch targets feel unresponsive
**Solution**: Verify `min-height: 44px` and `min-width: 44px` are applied. Check for overlapping elements or z-index conflicts.

### Issue: Mobile app links don't work
**Solution**: 
1. Verify `mailto:` and `tel:` protocols are correctly formatted
2. Check mobile browser settings allow app launching
3. Test in private/incognito mode to rule out extension conflicts
4. Ensure links have proper `href` attribute (not `onclick` handlers)

### Issue: Text too small on mobile
**Solution**: Verify `--font-size-base` is set to `1.125rem` (18px) in `_sass/base.scss`. Check for any overriding styles in components.

### Issue: Horizontal scrolling on mobile
**Solution**:
1. Add `overflow-x: hidden` to `body` in base styles
2. Verify all container max-widths are `100%` or `100vw`
3. Check for fixed-width elements that exceed viewport
4. Use `box-sizing: border-box` globally

### Issue: Layout shift during page load
**Solution**:
1. Add explicit width/height to all images
2. Use aspect ratio boxes: `aspect-ratio: 16/9` CSS property
3. Preload critical resources in `<head>`
4. Avoid inserting content above existing content (DOM injection)

## Resources

### Documentation
- [Web.dev Mobile Guide](https://web.dev/mobile/)
- [MDN Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Apple iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Google Material Design Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)

### Testing Tools
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)
- [BrowserStack](https://www.browserstack.com/) (Real device testing)
- [WAVE Accessibility Checker](https://wave.webaim.org/)

### Performance Monitoring
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Pingdom Website Speed Test](https://tools.pingdom.com/)

## Changelog

### 2025-01-XX - Phase 4 Mobile Optimization
- ✅ T032: Increased base font size from 16px to 18px
- ✅ T032: Enhanced line heights for mobile readability
- ✅ T033: Added native mobile app integration for email/phone
- ✅ T033: Implemented 44px touch targets for contact links
- ✅ T033: Added mobile-specific hints for app launching
- ⏳ T036: Image optimization (pending)
- ⏳ T037-T038: Mobile testing across devices (pending)
