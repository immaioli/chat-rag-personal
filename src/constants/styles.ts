/**
 * ============================================================================
 * DESIGN TOKENS & SYSTEM STYLES
 * ============================================================================
 * * This file serves as the Single Source of Truth (SSOT) for the application's 
 * UI styling. It is highly optimized for the Tailwind CSS v4 JIT compiler.
 * * * ⚠️ STRICT ARCHITECTURAL RULES:
 * * * 1. NO STRING INTERPOLATION FOR CLASSES
 * Tailwind's scanner analyzes static files. Dynamic strings hide classes 
 * from the compiler.
 * - BAD: `bg-${color}-500` (Compiler ignores this)
 * - GOOD: 'bg-blue-500' (Explicitly defined as an ATOM)
 * * * 2. THE "OUTSIDE-IN" COMPOSITION PATTERN
 * When combining strings for components, always write classes in this exact order:
 * - Layer 1 (Layout & Box Model): Position, display, sizing, spacing 
 * (e.g., 'absolute flex w-full p-4')
 * - Layer 2 (Appearance): Shape, borders, typography, static colors 
 * (e.g., 'rounded-xl border border-gray-200 bg-white text-sm')
 * - Layer 3 (Behavior & States): Hover, active, focus, transitions, depth 
 * (e.g., 'hover:bg-gray-100 shadow-lg transition-colors')
 * 
 * * * FILE STRUCTURE:
 * - ATOMS: Raw, explicit Tailwind classes representing single visual values.
 * - SEMANTIC SLICES: Logical combinations of ATOMS mapped to dark/light modes.
 * - COMPONENT STYLES: Exported dictionaries ready for UI consumption.
 * 
 * * * 💡 EXAMPLE OF FULL APPLICATION:
 * * // 1. Define Explicit Atoms
 * const BG_BRAND = 'bg-blue-600'
 * const TXT_INVERT = 'text-white'
 * const HOVER_BRAND = 'hover:bg-blue-700'
 * * // 2. Compose Component (Outside-In)
 * export const cardStyles = {
 *  button: 
 *          'flex items-center justify-center w-full px-4 py-2 ' +    // L1: Layout
 *          `rounded-md ${BG_BRAND} ${TXT_INVERT} font-bold ` +       // L2: Appearance
 *          `${HOVER_BRAND} shadow-md active:scale-95 transition-all` // L3: Behavior
 * }
 * ============================================================================
 */

// ==========================================
// 1. ATOMS: Raw Tailwind Classes (Explicit)
// ==========================================

// BACKGROUNDS
const BG_BASE_050 = 'bg-gray-50'
const BG_BASE_100 = 'bg-gray-100'
const BG_BASE_200 = 'bg-gray-200'
const BG_BASE_400 = 'bg-gray-400'
const BG_BASE_800 = 'bg-gray-800'
const BG_BASE_INSET = 'bg-gray-100'
const BG_NEUTRAL = 'bg-white'
const BG_NEUTRAL_GLASS = 'bg-white/95'
const BG_SUCCESS = 'bg-green-500'
const BG_OVERLAY = 'bg-black/60'
const BG_INFO_50 = 'bg-blue-50'

// DARK MODE BACKGROUNDS
const DARK_BG_MAIN = 'dark:bg-gray-950'
const DARK_BG_MAIN_GLASS = 'dark:bg-gray-950/95'
const DARK_BG_ALT = 'dark:bg-gray-900'
const DARK_BG_SURFACE = 'dark:bg-gray-800'
const DARK_BG_BASE_500 = 'dark:bg-gray-500'
const DARK_BG_SURFACE_HOVER = 'dark:hover:bg-gray-700'
const DARK_BG_INSET = 'dark:bg-gray-950'

// INTERACTION BACKGROUNDS (HOVER/ACTIVE/FOCUS)
const HOVER_BG_BASE_100 = 'hover:bg-gray-100'
const HOVER_BG_BASE_200 = 'hover:bg-gray-200'
const HOVER_BG_ACCENT_600 = 'hover:bg-blue-600'
const HOVER_BG_ACCENT_700 = 'hover:bg-blue-700'
const ACTIVE_BG_ACCENT_600 = 'active:bg-blue-600'
const HOVER_BG_DANGER_050 = 'hover:bg-red-50'
const DARK_HOVER_BG_DANGER_950_30 = 'dark:hover:bg-red-950/30'
const FOCUS_WITHIN_BG_NEUTRAL = 'focus-within:bg-white'
const DARK_FOCUS_WITHIN_BG_SURFACE = 'dark:focus-within:bg-gray-800'

// TEXTS
const TEXT_BASE_300 = 'text-gray-300'
const TEXT_BASE_500 = 'text-gray-500'
const TEXT_BASE_700 = 'text-gray-700'
const TEXT_BASE_900 = 'text-gray-900'
const TEXT_NEUTRAL = 'text-white'
const TEXT_WARNING_500 = 'text-yellow-500'

// DARK MODE TEXTS
const DARK_TEXT_MAIN = 'dark:text-white'
const DARK_TEXT_MUTED = 'dark:text-gray-400'
const DARK_TEXT_PLACEHOLDER = 'dark:placeholder:text-gray-500'

// INTERACTION TEXTS (HOVER/GROUP)
const HOVER_TEXT_NEUTRAL = 'hover:text-white'
const HOVER_TEXT_DANGER_500 = 'hover:text-red-500'
const HOVER_TEXT_DANGER_600 = 'hover:text-red-600'
const GROUP_HOVER_TEXT_BASE_900 = 'group-hover:text-gray-900'
const GROUP_DARK_HOVER_TEXT_NEUTRAL = 'dark:group-hover:text-white'

// BORDERS
const BORDER_BASE_100 = 'border-gray-100'
const BORDER_BASE_200 = 'border-gray-200'
const BORDER_NEUTRAL = 'border-white'
const BORDER_ACCENT_600 = 'border-blue-600'
const DARK_BORDER_MAIN = 'dark:border-gray-900'
const DARK_BORDER_SUBTLE = 'dark:border-gray-800'
const DARK_BORDER_BASE_950 = 'dark:border-gray-950'
const FOCUS_WITHIN_BORDER_ACCENT_600 = 'focus-within:border-blue-600'

// RINGS & OFFSETS
const RING_ACCENT_600 = 'ring-blue-600'
const FOCUS_RING_ACCENT_600 = 'focus:ring-blue-600'
const RING_OFFSET_NEUTRAL = 'ring-offset-white'
const DARK_RING_OFFSET_950 = 'dark:ring-offset-gray-950'

// ACCENT & DANGER SPECIFICS
const TEXT_ACCENT_600 = 'text-blue-600'
const DARK_TEXT_ACCENT_MUTED = 'dark:text-blue-100/80'
const DARK_TEXT_ACCENT_100 = 'dark:text-blue-100'
const DARK_BG_INFO_SUBTLE = 'dark:bg-blue-600/10'
const TEXT_DANGER_500 = 'text-red-500'
const TEXT_DANGER_700 = 'text-red-700'
const BG_ACCENT_600 = 'bg-blue-600'
const BG_DANGER_500_20 = 'bg-red-500/20'
const BG_DANGER_500_10 = 'bg-red-500/10'
const HOVER_BG_DANGER_500_20 = 'hover:bg-red-500/20'
const HOVER_BG_DANGER_500_30 = 'hover:bg-red-500/30'
const SHADOW_ACCENT_600_20 = 'shadow-blue-600/20'

// PLACEHOLDERS
const PLACEHOLDER_BASE_400 = 'placeholder-gray-400'

// ==========================================
// 2. SEMANTIC SLICES
// ==========================================

const COLOR_BG_MAIN = `${BG_NEUTRAL} ${DARK_BG_MAIN}`
const COLOR_BG_ALT = `${BG_BASE_050} ${DARK_BG_ALT}`
const COLOR_SURFACE = `${BG_NEUTRAL} ${DARK_BG_SURFACE}`
const COLOR_SURFACE_SUBTLE = `${BG_BASE_100} ${DARK_BG_SURFACE}`
const COLOR_SURFACE_HOVER = `${HOVER_BG_BASE_100} ${DARK_BG_SURFACE_HOVER}`
const COLOR_BORDER = `${BORDER_BASE_200} ${DARK_BORDER_MAIN}`
const COLOR_BORDER_DARK = `${BORDER_BASE_200} ${DARK_BORDER_SUBTLE}`
const COLOR_BORDER_LIGHT = `${BORDER_BASE_100} ${DARK_BORDER_MAIN}`
const COLOR_TEXT_STRONG = `${TEXT_BASE_900} ${DARK_TEXT_MAIN}`
const COLOR_TEXT_MAIN = `${TEXT_BASE_700} ${DARK_TEXT_MAIN}`
const COLOR_TEXT_MUTED = `${TEXT_BASE_500} ${DARK_TEXT_MUTED}`
const COLOR_INFO_BG = `${BG_INFO_50} ${DARK_BG_INFO_SUBTLE}`

// ==========================================
// 3. UTILS & COMPONENT STYLES
// ==========================================

const BORDER_BASE = `border ${COLOR_BORDER}`
const BORDER_DARK = `border ${COLOR_BORDER_DARK}`
const BORDER_LIGHT = `border ${COLOR_BORDER_LIGHT}`
const TRANSITION_BASE = 'transition-all duration-300'
const TRANSITION_SCALE = 'transition-all duration-200 active:scale-95'
const FLEX_CENTER = 'flex items-center justify-center'
const FLEX_START = 'flex items-center justify-start'

export const animationStyles = {
      transition: TRANSITION_BASE,
      typingDot: `size-2 rounded-full ` +
            `${BG_BASE_400} ${DARK_BG_BASE_500} ` +
            `animate-bounce`
}

export const buttonStyles = {
      action: `${FLEX_CENTER} ` +
            `rounded-lg ` +
            `${TRANSITION_SCALE}`,
      base: 'inline-flex items-center justify-center ' +
            'rounded-lg ' +
            'cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none transition-colors',
      danger: `${TEXT_DANGER_500} ` +
            `${HOVER_TEXT_DANGER_600} ${HOVER_BG_DANGER_050} ${DARK_HOVER_BG_DANGER_950_30}`,
      dangerActive: `${BG_DANGER_500_20} ` +
            `${TEXT_DANGER_500}`,
      dangerSoft: `${BG_DANGER_500_10} ` +
            `${HOVER_BG_DANGER_500_30}`,
      ghostInset: `${BG_BASE_INSET} ${DARK_BG_INSET} ` +
            `${HOVER_BG_BASE_100} ${DARK_BG_SURFACE_HOVER}`,
      language: 'rounded-[2px] ' +
            'bg-transparent ' +
            `hover:scale-110 ${TRANSITION_BASE}`,
      languageActive: `ring-2 ${RING_ACCENT_600} ring-offset-2 ${RING_OFFSET_NEUTRAL} ${DARK_RING_OFFSET_950} ` +
            `opacity-100`,
      languageInactive: 'opacity-80 hover:opacity-100',
      primaryForm: 'w-full mt-0 py-3.5 ' +
            'rounded-xl font-bold',
      quickAction: `${FLEX_START} w-full gap-3 px-4 py-3 text-left ` +
            `rounded-none ${COLOR_SURFACE} ` +
            `group ${COLOR_SURFACE_HOVER} ${ACTIVE_BG_ACCENT_600} transition-colors`,
      quickActionsToggle: `flex items-center justify-between w-full h-11 px-4 ` +
            `rounded-xl ${BORDER_BASE} ${BG_BASE_050} ${DARK_BG_SURFACE} ` +
            `${COLOR_SURFACE_HOVER} transition-all`,
      send: 'p-3 ' +
            'rounded-xl ' +
            `shadow-lg ${SHADOW_ACCENT_600_20} disabled:opacity-50`,
      sidebarAction: `${FLEX_START} w-full gap-3 ` +
            `${COLOR_SURFACE_HOVER} transition-colors`,
      social: 'size-8 ' +
            `rounded-lg ${BG_BASE_100} ${DARK_BG_SURFACE} ${COLOR_TEXT_MUTED} ` +
            `${HOVER_BG_ACCENT_600} ${HOVER_TEXT_NEUTRAL} ${DARK_HOVER_BG_DANGER_950_30} hover:scale-110 ${TRANSITION_SCALE}`,
      themeToggle: 'size-10 p-0 ' +
            `rounded-lg ${BORDER_BASE} ${BG_BASE_100} ${DARK_BG_SURFACE} ${TEXT_BASE_700} ${DARK_TEXT_MAIN} ` +
            `cursor-pointer ${HOVER_BG_BASE_200} ${DARK_BG_SURFACE_HOVER} transition-colors`,
      variantDefault: `${BG_ACCENT_600} ${TEXT_NEUTRAL} ` +
            `${HOVER_BG_ACCENT_700}`,
      variantGhost: 'bg-transparent ' +
            `${COLOR_TEXT_MAIN} ` +
            `${COLOR_SURFACE_HOVER}`,
      variantGhostDestructive: 'bg-transparent ' +
            `${TEXT_BASE_500} ` +
            `${HOVER_BG_DANGER_500_20} ${HOVER_TEXT_DANGER_500}`
}

export const iconStyles = {
      animated: `${TRANSITION_BASE}`,
      disclaimer: `${TEXT_DANGER_700} ` +
            `animate-pulse`,
      flag: 'w-8 h-auto shrink-0 ' +
            'rounded-[2px] ' +
            'shadow-sm',
      infoBanner: 'shrink-0 mt-[-2px] ' +
            `${DARK_TEXT_ACCENT_100} `,
      lg: 'size-6',
      md: 'size-5',
      muted: `${COLOR_TEXT_MUTED}`,
      quickAction: `${COLOR_TEXT_MUTED} ` +
            `${GROUP_HOVER_TEXT_BASE_900} ${GROUP_DARK_HOVER_TEXT_NEUTRAL} transition-colors`,
      sm: 'size-4',
      tooltipIcon: 'gap-1 ' +
            `${TEXT_WARNING_500} ` +
            `group-hover:rotate-90 ${TRANSITION_BASE}`,
      xs: 'size-3',
      xlg: 'size-8',
      xxlg: 'size-10',
      xxxlg: 'size-16'
}

export const inputStyles = {
      base: 'w-full px-4 py-3 ' +
            'rounded-xl outline-none ' +
            `${TRANSITION_BASE}`,
      border: `${BORDER_BASE}`,
      chat: 'w-full ' +
            `bg-transparent border-none ${COLOR_TEXT_STRONG} text-sm ${PLACEHOLDER_BASE_400} ${DARK_TEXT_PLACEHOLDER} ` +
            'outline-none focus:ring-0',
      colors: `${COLOR_BG_ALT} ${COLOR_TEXT_STRONG}`,
      disabled: 'disabled:cursor-not-allowed disabled:opacity-50',
      focus: `focus:border-transparent ` +
            `focus:ring-2 ${FOCUS_RING_ACCENT_600}`,
      placeholder: `${PLACEHOLDER_BASE_400} ${DARK_TEXT_PLACEHOLDER}`
}

export const layoutStyles = {
      messageContainer: 'flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]',
      messageWrapperAI: 'flex flex-row items-start justify-start gap-3 w-full ' +
            'animate-in fade-in slide-in-from-left-2 duration-300',
      messageWrapperUser: 'flex flex-row-reverse items-start justify-start gap-3 w-full ' +
            'animate-in fade-in slide-in-from-right-2 duration-300',
      disclaimer: 'gap-1.5 ' +
            'cursor-default ' +
            'opacity-80 hover:opacity-100 transition-opacity',
      flexContain: 'flex-1 min-w-0 gap-3',
      fullContain: 'flex-1 min-w-0 w-full',
      formSection: 'flex flex-col gap-2',
      inlineBaseline: 'flex items-baseline gap-2',
      header: 'sm:flex-row sm:items-center shrink-0 z-20 gap-4 px-4 sm:px-6 py-4',
      headerActions: 'self-end sm:self-auto shrink-0 gap-3 mt-2 sm:mt-0',
      languageSection: 'items-center gap-3 mb-2',
      quickActionsGrid: `${BG_BASE_100} ${DARK_BORDER_MAIN}`,
      quickActionsMenu: 'absolute bottom-[calc(65%+8px)] left-1/2 -translate-x-1/2 ' +
            'w-full p-0 ' +
            'overflow-hidden z-50' +
            'animate-in fade-in slide-in-from-bottom-10 duration-500 fill-mode-forwards ease-out',
      selector: 'gap-2 pr-3 ' +
            'transition-colors',
      stackRow: 'flex-wrap gap-x-2 gap-y-1 pb-0.5 ' +
            `text-[10px] sm:text-xs ${COLOR_TEXT_MUTED} ` +
            'transition-colors',
      textContain: 'flex-1 min-w-0',
      tooltipContainer: 'relative items-center ' +
            'cursor-help group',
      typingIndicator: 'gap-3 mt-2 ' +
            'opacity-50'
}

export const popoverStyles = {
      base: 'w-max z-50 ' +
            'animate-in fade-in',
      layouts: {
            col: 'flex flex-col gap-2 p-3',
            default: 'p-3',
            row: `${FLEX_CENTER} gap-3 p-3`
      },
      placements: {
            bottom: 'absolute top-full left-1/2 mt-2 ' +
                  '-translate-x-1/2 slide-in-from-top-2',
            left: 'absolute right-full top-1/2 mr-2 ' +
                  '-translate-y-1/2 slide-in-from-right-2',
            right: 'absolute left-full top-1/2 ml-2 ' +
                  '-translate-y-1/2 slide-in-from-left-2',
            top: 'absolute bottom-full left-1/2 mb-2 ' +
                  '-translate-x-1/2 slide-in-from-bottom-2'
      },
      tooltipArrow: 'size-2 -mt-1 ' +
            `border-r border-b ${COLOR_BORDER_DARK} ${BG_BASE_800} ` +
            'rotate-45',
      tooltipWrapper: 'absolute bottom-full left-1/2 mb-2 z-50 pointer-events-none ' +
            '-translate-x-1/2 ' +
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
      wrapper: `${FLEX_CENTER} relative`
}

export const surfaceStyles = {
      avatarBase: 'rounded-full ' +
            `bg-cover bg-center border-2 ${BORDER_ACCENT_600} ` +
            `${TRANSITION_BASE}`,
      chatBody: 'flex-1 overflow-y-auto p-6 ' +
            `${COLOR_BG_ALT} ` +
            'scroll-smooth transition-colors duration-300',
      chatContainer: 'w-full max-w-[1024px] h-full ' +
            `border-x ${BORDER_DARK} ${COLOR_BG_MAIN} ` +
            'shadow-2xl transition-colors duration-300',
      chatFooter: 'shrink-0 z-20 p-4 ' +
            `border-t ${BORDER_DARK} ${COLOR_BG_MAIN} ` +
            'transition-colors duration-300',
      chatInput: 'flex-1 h-12 px-4 ' +
            `rounded-xl border border-transparent ${COLOR_SURFACE_SUBTLE} ` +
            `${FOCUS_WITHIN_BORDER_ACCENT_600} ${FOCUS_WITHIN_BG_NEUTRAL} ${DARK_FOCUS_WITHIN_BG_SURFACE} shadow-sm transition-colors`,
      divider: 'shrink-0 ' +
            `${BG_BASE_200} ${DARK_BG_SURFACE_HOVER} ` +
            'transition-colors',
      header: 'border-b ' +
            `${BORDER_DARK} ${BG_NEUTRAL_GLASS} ${DARK_BG_MAIN_GLASS} ` +
            'backdrop-blur-sm',
      infoBanner: 'gap-2.5 p-3.5 ' +
            `rounded-xl ${COLOR_INFO_BG}`,
      logo: 'size-20 shrink-0 p-0.5 ' +
            `rounded-lg ${BORDER_BASE} ${BG_NEUTRAL}`,
      mainWrapper: 'font-sans ' +
            `${COLOR_BG_ALT} ${COLOR_TEXT_STRONG} ` +
            'transition-colors duration-300',
      messageBubbleAI: 'w-full p-5 ' +
            `rounded-2xl rounded-bl-none ${BORDER_LIGHT} ${COLOR_SURFACE} ${COLOR_TEXT_MAIN} text-[15px] ` +
            'shadow-sm space-y-2 transition-colors',
      messageBubbleUser: 'px-4 py-3 ' +
            `rounded-2xl rounded-br-none ${BG_ACCENT_600} ${TEXT_NEUTRAL} text-[15px] font-medium ` +
            `shadow-md ${SHADOW_ACCENT_600_20}`,
      modalContent: 'w-full max-w-md overflow-hidden ' +
            `rounded-2xl ${BORDER_BASE} ${COLOR_SURFACE} ` +
            'shadow-2xl',
      modalHeader: 'flex items-center justify-between shrink-0 mt-4 ' +
            `border-b ${BORDER_DARK}`,
      modalForm: 'flex flex-col gap-4 m-4',
      modalOverlay: `${FLEX_CENTER} fixed inset-0 z-50 px-4 ` +
            `${BG_OVERLAY} ` +
            'backdrop-blur-sm',
      popover: `rounded-xl ` +
            `${BORDER_BASE} ${COLOR_SURFACE} ` +
            'shadow-xl',
      statusBase: 'absolute ' +
            `rounded-full border-2 ${BORDER_NEUTRAL} ${DARK_BORDER_BASE_950} ${BG_SUCCESS} ` +
            'transition-colors',
      typingBubble: 'gap-1 px-4 py-3 ' +
            `rounded-2xl rounded-bl-none ${BORDER_LIGHT} ${COLOR_SURFACE} ` +
            'transition-colors'
}

export const typographyStyles = {
      dateBadge: 'px-3 py-1 ' +
            `rounded-full ${BG_BASE_200} ${DARK_BG_SURFACE} ` +
            'transition-colors',
      disclaimer: 'text-left text-[20px] leading-tight ' +
            'transition-colors',
      headerSubtitle: 'mt-0.5 whitespace-nowrap ' +
            'text-xs sm:text-sm ' +
            'transition-colors',
      headerTitle: 'truncate ' +
            'text-base sm:text-lg leading-tight ' +
            'transition-colors',
      infoBannerText: 'leading-none ' +
            `${TEXT_ACCENT_600} ${DARK_TEXT_ACCENT_MUTED} text-base text-justify`,
      language: `${COLOR_TEXT_MAIN}`,
      modalTitle: `${COLOR_TEXT_STRONG}`,
      quickAction: `${COLOR_TEXT_MAIN} ` +
            `${GROUP_HOVER_TEXT_BASE_900} ${GROUP_DARK_HOVER_TEXT_NEUTRAL} transition-colors`,
      separator: 'hidden sm:inline ' +
            `${TEXT_BASE_300} ${DARK_BORDER_MAIN} ` +
            'transition-colors',
      toggleLabel: 'flex items-center justify-start gap-2 ' +
            `${COLOR_TEXT_MAIN} ` +
            'transition-colors',
      tooltip: 'px-3 py-1.5 whitespace-nowrap ' +
            `rounded-md border ${BORDER_BASE_100} ${DARK_BORDER_MAIN} ${BG_BASE_800} ${DARK_BG_SURFACE} ${TEXT_NEUTRAL} ` +
            'shadow-lg'
}

export const markdownStyles = {
      wrapper: 'max-w-none ' +
            `prose prose-sm dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 ${COLOR_TEXT_MAIN}`,
      paragraph: 'mb-4 last:mb-0 ' +
            'leading-relaxed',
      codeInline: 'px-1.5 py-0.5 ' +
            `rounded-md font-mono text-[0.9em] ${BORDER_LIGHT} ${COLOR_BG_ALT} ${COLOR_TEXT_STRONG}`,
      link: 'font-medium ' +
            `${TEXT_ACCENT_600} ` +
            'hover:underline underline-offset-4 transition-colors',
      list: 'pl-4 space-y-1 my-2',
      listItem: 'list-disc list-outside',
      heading: 'mt-4 mb-2 ' +
            `font-bold ${COLOR_TEXT_STRONG}`
}

export const dividerStyles = {
      base: 'shrink-0 ' +
            `${BG_BASE_200} ${DARK_BG_SURFACE_HOVER} ` +
            'transition-colors',
      header: 'w-[1px] h-6 mx-2 ' +
            `${BG_BASE_200} ${DARK_BG_SURFACE_HOVER} ` +
            'transition-colors',
      vertical: 'w-[1px] h-4 mx-2',
      horizontal: 'w-full h-[1px] my-2'
}