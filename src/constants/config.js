/**
 * Configuration constants for the 3D Product Viewer
 */

// Camera configuration
export const CAMERA_CONFIG = {
    FOV: 75,
    NEAR: 0.1,
    FAR: 1000,
    INITIAL_POSITION: [0, 5, 10],
    ROTATION_SPEED: 0.5,
    ROTATION_RADIUS: 10
};

// Lighting configuration
export const LIGHTING_CONFIG = {
    AMBIENT: {
        COLOR: 0xffffff,
        INTENSITY: 0.5
    },
    DIRECTIONAL: {
        COLOR: 0xffffff,
        INTENSITY: 1,
        POSITION: [5, 5, 5],
        CAST_SHADOWS: true
    }
};

// Product configuration
export const PRODUCT_CONFIG = {
    CHAIR: {
        SEAT: {
            WIDTH: 1,
            HEIGHT: 0.1,
            DEPTH: 1,
            COLOR: 0x8B4513
        },
        BACK: {
            WIDTH: 1,
            HEIGHT: 1,
            DEPTH: 0.1,
            COLOR: 0x8B4513
        },
        LEGS: {
            RADIUS: 0.05,
            HEIGHT: 1,
            COLOR: 0x8B4513
        }
    },
    BOOKS: {
        COUNT: 3,
        DIMENSIONS: {
            WIDTH: 0.8,
            HEIGHT: 0.1,
            DEPTH: 0.6
        },
        COLORS: [0x4B0082, 0x800000, 0x006400],
        SPACING: 0.15
    }
};

// Animation configuration
export const ANIMATION_CONFIG = {
    SPEED: 1,
    AMPLITUDE: 0.1,
    FLOAT_SPEED: 0.5,
    ROTATION_SPEED: 0.3,
    SCALE_SPEED: 0.2
};

// Interaction configuration
export const INTERACTION_CONFIG = {
    HOVER_SCALE: 1.1,
    CLICK_SCALE: 1.2,
    HIGHLIGHT_COLOR: 0xffff00,
    HIGHLIGHT_INTENSITY: 0.5
}; 