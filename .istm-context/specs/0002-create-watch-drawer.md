# Spec 0002: Sliding Create Watch Drawer Panel

This specification outlines the transition of the watch creation panel from an inline layout compressing the main content grid to a sliding drawer overlay.

## Summary

The watch creation drawer will slide in from the right side. It will cover the main workspace content instead of shifting the layout. It will include a semi transparent backdrop to improve user focus.

### Acceptance Criteria

- The drawer slides in from the right side of the screen when clicking the "Create Watch" button.
- The drawer floats over the main dashboard content. It does not compress or squeeze the main grid.
- A dark overlay mask with a subtle blur effect covers the background.
- Clicking the backdrop overlay mask or the close icon button dismisses the drawer.
- The drawer uses a width of 520px on desktop systems and runs full screen on mobile devices.
- The entry and exit animations use Framer Motion with ease out transition curves.
- The drawer is rendered outside the standard layout tree (using React Portals if necessary, or at the root level of the layout hierarchy) to prevent parent CSS properties from breaking the fixed position context.

## Design and UI Tokens

- **Backdrop Overlay**: `bg-ink/30` with `backdrop-blur-xs` overlay.
- **Drawer Surface**: `bg-surface border-l border-hairline shadow-high`.
- **Drawer Width**: `w-full md:w-[520px]`.
- **Z-Index Position**: `z-50` to ensure it renders above all other interface layers.
- **Animations**: Slide animation from `x: "100%"` to `x: 0` using standard ease out motion settings.

## Implementation Steps

### Step 1: Update the Parent Dashboard Layout
Modify `WatchList.tsx` to extract the sliding panel container from the flex grid. Place it inside a fixed position overlay wrapper.

### Step 2: Implement the Motion Drawer Container
Add a backdrop mask using `motion.div` with an opacity fade. Render the drawer side panel inside it with slide controls:
- Start position: `x: "100%"`
- End position: `x: 0`
- Exit position: `x: "100%"`

### Step 3: Verify and Test the Interface
Ensure form submissions work correctly within the overlay container. Verify focus states and close functions on click events.
