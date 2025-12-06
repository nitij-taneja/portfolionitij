# Design Guidelines: Nitij Taneja - AI/ML Portfolio

## Design Approach
**Reference-Based Approach** inspired by modern developer portfolios (Vercel, Linear, GitHub profiles) combined with AI-focused company aesthetics (Anthropic, OpenAI). Emphasize technical credibility, visual sophistication, and interactive project demonstrations.

## Core Design Principles
1. **Content-First Hierarchy**: Projects and technical work are the hero
2. **Kinetic Energy**: Subtle animations that suggest AI/automation (typing effects, smooth transitions)
3. **Technical Professionalism**: Clean, modern aesthetic appealing to recruiters and tech companies
4. **Visual Proof**: Prominent project demos (GIFs/videos) as primary engagement drivers

---

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm (e.g., py-20, gap-8, px-6)

**Container Strategy**:
- Full-width sections with inner max-w-7xl for content
- Project cards: max-w-6xl grid layouts
- Text content: max-w-3xl for readability

**Grid Patterns**:
- Projects: 1 column mobile, 2 columns tablet (md:), 3 columns desktop (lg:) where appropriate
- Tech stack: 3-4 columns mobile, 6-8 columns desktop for badge grids
- Timeline: Single column with left border accent

---

## Typography Hierarchy

**Font Families** (via Google Fonts CDN):
- **Primary**: Inter (weights: 400, 500, 600, 700) - body text, UI elements
- **Display**: Space Grotesk (weights: 500, 600, 700) - headings, hero
- **Monospace**: Fira Code (weight: 400) - code snippets, tech tags

**Scale**:
- Hero Heading: text-5xl md:text-6xl lg:text-7xl (Space Grotesk, font-bold)
- Section Headings: text-3xl md:text-4xl (Space Grotesk, font-semibold)
- Project Titles: text-xl md:text-2xl (Space Grotesk, font-medium)
- Body: text-base md:text-lg (Inter, font-normal)
- Captions/Tags: text-sm (Fira Code for tech tags, Inter for general)

---

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with centered content
- Animated typing effect displaying role variations
- Multilingual greeting (नमस्कार | Hello | ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ) in smaller text above name
- CTA buttons: "View Projects" (primary) + "Download Resume" (secondary) with blurred backgrounds
- Subtle particle/grid background animation (CSS/SVG based)
- Profile image: rounded-2xl with subtle glow/border effect

### Navigation
- Sticky header with backdrop blur (backdrop-blur-lg)
- Logo/name left, nav links center, social icons right
- Mobile: hamburger menu with slide-in drawer
- Smooth scroll behavior to sections

### Project Showcase (Primary Focus)
- Large cards with embedded GIF/video demos (16:9 aspect ratio)
- Hover: subtle scale transform (scale-105), enhanced shadow
- Each card includes: project thumbnail, title, description, tech stack tags, GitHub link icon
- Featured projects get larger cards (full-width or 2-column span)
- "View All Projects" link to GitHub at bottom

### Tech Stack Section
- Categorized badge grids with section headers
- Icon + label badges using shields.io style or custom SVG icons
- Categories: Programming Languages, AI/ML Frameworks, Data Science Tools, Cloud/DevOps, Databases
- Grid layout with gap-4, badges have rounded-full or rounded-lg with subtle borders

### Experience Timeline
- Vertical timeline with connecting line (left border accent)
- Each entry: Company logo/icon, title, date range, bullet points
- Alternating card positions for visual interest (optional on desktop)

### Achievements Section
- Stat cards in grid (2x2 mobile, 4 columns desktop)
- Large numbers (rank 23, 5k+ views, 1st place) with labels
- Icons representing achievement type (trophy, certificate, etc.)
- Certification badges with institution logos

### Resume Section
- Embedded PDF viewer OR beautifully formatted HTML version
- Prominent download button (PDF format)
- Quick stats summary above resume: Years of Experience, Projects Completed, Skills Count

### Contact Section
- Two-column layout: Contact form left, social links + info right
- Form fields: Name, Email, Message (all required)
- Social media icon grid with platform badges (LinkedIn, GitHub, Kaggle, YouTube, etc.)
- Success/error toast notifications for form submission

### GitHub Activity
- Contribution graph integration (using GitHub API or third-party service)
- Stats cards: Total repos, Stars received, Commits this year
- Top languages donut/bar chart

### Footer
- Three columns: Quick Links (sections), Social Media, Copyright
- Subtle top border, minimal padding

---

## Animations & Interactions

**Use Sparingly**:
- Hero typing animation (text cycling effect)
- Smooth scroll to sections (scroll-smooth)
- Project card hover transforms (scale-105, shadow enhancement)
- Fade-in on scroll for section entries (using Intersection Observer)
- Button hover states: slight brightness increase, no transform

**Avoid**:
- Parallax scrolling
- Complex scroll-triggered animations
- Auto-playing videos (GIFs are acceptable)

---

## Images

**Hero Section**: 
- Professional headshot or AI-themed illustration (coding setup, abstract neural network visualization)
- Placement: Right side of hero on desktop, above text on mobile
- Size: ~400-500px square, rounded with subtle shadow/glow

**Project Demos**:
- Use the provided GIF URLs from GitHub repos
- Aspect ratio: 16:9 maintained
- Loading: Lazy load with placeholder blur-up effect

**Background Elements**:
- Subtle gradient mesh or grid pattern in hero
- Section dividers with faint geometric shapes (optional)

---

## Accessibility & Polish

- Semantic HTML5 structure (header, nav, main, section, footer)
- ARIA labels for icon-only buttons
- Focus states visible with ring-2 offset
- Color contrast ratios meet WCAG AA standards minimum
- Alt text for all images
- Keyboard navigation support

---

**Icons**: Use Heroicons via CDN for UI elements (external link, download, menu, social icons)

**Performance**: Lazy load project GIFs, optimize images via next-gen formats, minimize JavaScript bundle