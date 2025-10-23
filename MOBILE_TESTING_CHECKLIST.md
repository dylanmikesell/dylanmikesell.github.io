# Mobile Testing Checklist (T037-T038)

## Server Info
- Local URL: http://127.0.0.1:4000
- Server Status: ✅ Running

## Manual Testing Instructions

### Chrome DevTools Device Mode Testing

1. **Open site in Chrome**: http://127.0.0.1:4000
2. **Open DevTools**: Press F12 or Ctrl+Shift+I
3. **Enable Device Mode**: Click device icon or press Ctrl+Shift+M
4. **Test these devices**:
   - iPhone SE (375x667) - smallest
   - iPhone 14 Pro (393x852)
   - Samsung Galaxy S20 (360x800)
   - iPad Air (820x1180)

### Font Size & Readability Tests (T032)
- [ ] Base text is 18px (1.125rem) - check with DevTools Inspector
- [ ] No pinch-to-zoom needed to read content
- [ ] Line height is comfortable (1.6)
- [ ] All text is readable on smallest device (iPhone SE)

### Touch Target Tests (T033)
- [ ] All contact links are minimum 44px tap targets
- [ ] Email link shows proper padding/spacing
- [ ] Phone link shows proper padding/spacing
- [ ] No accidental taps between close elements
- [ ] Hover states work (background color change)

### Native App Integration Tests (T033)
**Desktop Browser Test:**
- [ ] Email link format: `mailto:` in href attribute
- [ ] Phone link format: `tel:` in href attribute
- [ ] Mobile hints are hidden on desktop (>768px width)

**Mobile Device Test (if available):**
- [ ] iOS Safari: Tap email opens Mail app
- [ ] iOS Safari: Tap phone opens Phone app
- [ ] Android Chrome: Tap email shows app chooser
- [ ] Android Chrome: Tap phone opens Dialer

### Responsive Layout Tests
- [ ] Navigation collapses to hamburger menu on mobile
- [ ] All content fits within viewport (no horizontal scroll)
- [ ] Images scale appropriately
- [ ] Publication details expand/collapse smoothly
- [ ] Contact form is usable on mobile

### Lighthouse Testing (Alternative)
Since Lighthouse CLI has Chrome issues in WSL, use one of these:

**Option 1: Chrome DevTools Lighthouse**
1. Open http://127.0.0.1:4000 in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select: Mobile, Performance, Accessibility, Best Practices
5. Click "Analyze page load"

**Option 2: PageSpeed Insights (after deployment)**
1. Deploy to GitHub Pages
2. Visit https://pagespeed.web.dev/
3. Enter: https://dylanmikesell.github.io
4. Review scores

### Performance Targets (Constitutional Requirements)
- [ ] Performance Score: 90+ (target: 95+)
- [ ] Accessibility Score: 90+ (target: 95+)
- [ ] Best Practices Score: 90+
- [ ] First Contentful Paint (FCP): <1.8s
- [ ] Largest Contentful Paint (LCP): <2.5s
- [ ] Cumulative Layout Shift (CLS): <0.1
- [ ] Total Blocking Time (TBT): <300ms

### Accessibility Tests
- [ ] All interactive elements have focus indicators
- [ ] ARIA labels present on contact links
- [ ] Tab navigation works logically
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Form fields have visible labels
- [ ] Screen reader compatibility (if available)

### Next Steps After Testing
1. Document results in this file
2. Fix any issues found
3. Update tasks.md to mark T037-T038 complete
4. Consider deploying to GitHub Pages for production testing

## Results

### Test Date: ____________________

#### Chrome DevTools Device Mode Results
- Font readability: ___/5 pass
- Touch targets: ___/5 pass
- Responsive layout: ___/5 pass
- Native app links: ___/4 pass (desktop only)

#### Lighthouse Scores (if tested)
- Performance: ___/100
- Accessibility: ___/100
- Best Practices: ___/100
- SEO: ___/100

#### Issues Found
1. _______________________________________
2. _______________________________________
3. _______________________________________

#### Notes
_________________________________________________
_________________________________________________
_________________________________________________
