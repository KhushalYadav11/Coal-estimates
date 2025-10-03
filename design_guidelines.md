# Design Guidelines: Coal Volume & Weight Estimation System

## Design Approach
**System Selected:** Material Design with Carbon Design influences for data-heavy enterprise applications
**Justification:** This industrial productivity tool requires clarity, precision, and professional aesthetics. Material Design provides robust component patterns while Carbon Design's data visualization principles ensure effective analytics presentation.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary Interface)**
- Primary: 210 100% 55% (Blue - measurement tools, CTAs)
- Surface Background: 220 15% 12% (Dark charcoal for main canvas)
- Surface Elevated: 220 12% 18% (Cards, panels, modals)
- Surface Subtle: 220 10% 22% (Hover states, secondary surfaces)
- Success: 145 65% 45% (Quality indicators, completed measurements)
- Warning: 35 90% 60% (Alerts, calibration needs)
- Error: 0 70% 55% (Quality issues, validation errors)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%
- Border: 220 10% 25%

**Light Mode (Reports & Analytics)**
- Primary: 210 100% 45%
- Surface: 0 0% 98%
- Surface Elevated: 0 0% 100%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%

### B. Typography
- **Primary Font:** Inter (Google Fonts)
- **Monospace Font:** JetBrains Mono (for measurements, coordinates)
- **Headings:** font-semibold, tracking-tight
  - H1: text-3xl (Project titles)
  - H2: text-2xl (Section headers)
  - H3: text-xl (Card titles)
  - H4: text-lg (Subsections)
- **Body:** text-base, leading-relaxed
- **Data/Metrics:** text-sm font-mono (measurements, coordinates, calculations)
- **Labels:** text-sm font-medium uppercase tracking-wide (form labels, table headers)

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section gaps: gap-6 to gap-8
- Card spacing: p-6
- Form elements: gap-4
- Dashboard grid: gap-6

**Grid Structure:**
- Main workspace: 70% 3D viewer + 30% measurement panel (lg:grid-cols-10 with 7+3 split)
- Dashboard: 4-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Project list: 3-column cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

### D. Component Library

**Navigation**
- Top navigation bar: Fixed header with project selector, measurement count badge, user menu
- Sidebar (collapsed/expanded): Icon-based navigation with measurement tools, analytics, reports, settings
- Breadcrumbs: For project hierarchy navigation

**3D Viewer Container**
- Full-height canvas with dark background (bg-gray-950)
- Floating control panel (top-right): Rotation controls, measurement mode toggle, view presets
- Measurement overlay: Dimension lines with labeled values, coordinate markers
- Bottom toolbar: Scale calibration, snapshot, reset view

**Data Input & Forms**
- Measurement input cards: Grouped inputs for L/W/H with unit selectors
- Coal type selector: Dropdown with density display
- Volume method selector: Radio cards showing accuracy percentages
- Quality assessment: Star rating or badge system
- File upload: Drag-drop zone with file list preview

**Data Display**
- Metric cards: Large number display with label, trend indicator, and icon
- Data tables: Alternating row colors, sortable headers, action column
- Quality badges: Colored pills (Excellent: green, Good: blue, Fair: yellow, Poor: red)
- Progress indicators: Circular progress for daily measurement quota (50-60)
- Calculation breakdown: Expandable accordion showing volume formula steps

**Charts & Visualizations**
- Line charts: Hourly activity trends (Chart.js)
- Pie charts: Coal type distribution
- Bar charts: Quality rate comparison
- Scatter plots: Volume vs weight correlation
- Chart container: White/light background in dark mode for better data readability

**Reports**
- Report builder: Template selector with live preview
- Export options: Button group with format icons (PDF, CSV, Excel, Word)
- Report sections: Collapsible panels for methodology, data, charts, quality assessment
- Print-optimized layout: Simplified styles for PDF generation

**Modals & Overlays**
- Modal backdrop: Semi-transparent dark overlay (bg-black/50)
- Modal content: Rounded corners (rounded-lg), shadow-2xl
- Confirmation dialogs: Icon + title + description + action buttons
- Toast notifications: Bottom-right corner, auto-dismiss, color-coded by type

### E. Interaction Patterns

**3D Viewer Controls**
- Left-click drag: Rotate model
- Right-click drag: Pan view
- Scroll: Zoom in/out
- Click measurement mode: Click to add measurement points
- Hover feedback: Highlight interactive areas

**Data Entry**
- Real-time validation: Inline error messages
- Auto-calculation: Update volume/weight on dimension change
- Keyboard shortcuts: Tab navigation, Enter to save, Esc to cancel

**Dashboard**
- Card hover: Subtle lift effect (shadow increase)
- Chart interactivity: Hover tooltips, click to filter
- Refresh indicator: Spinning icon for data updates

**Animations:** Use sparingly
- Page transitions: Fade in (150ms)
- Modal open/close: Scale + fade (200ms)
- Toast notifications: Slide in from right (250ms)
- Chart data updates: Smooth transitions (300ms)
- No parallax or scroll-triggered animations

## Images
**No hero images required** - This is a functional application focused on data and 3D visualization.

**3D Model Placeholder:** When no model loaded, display wireframe grid with "Upload .obj file" centered message

**Icon Usage:** Material Icons via CDN for navigation, actions, and status indicators

## Critical Design Principles
- **Information Hierarchy:** Measurement data and 3D viewer always prominent
- **Dark Mode First:** Optimized for extended use with 3D rendering
- **Density Control:** Compact layouts for data-heavy screens, spacious for forms
- **Consistent Feedback:** Clear visual states for all interactions
- **Professional Aesthetics:** Clean, technical appearance suitable for industrial clients