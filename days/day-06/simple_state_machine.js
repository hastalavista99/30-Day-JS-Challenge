// Exercise: Write a function that implements a simple state machine

/**
 * A simplified state machine implementation
 * Learning project to understand state management patterns
 */
class StateMachine {
    /**
     * Create a new state machine
     * @param {Object} config - Configuration
     * @param {string} config.initial - Initial state
     * @param {Object} config.states - State definitions with transitions
     */
    constructor({ initial, states }) {
        if (!initial || !states || !states[initial]) {
            throw new Error('Invalid configuration');
        }

        this.current = initial;
        this.states = states;
        this.context = {};
        this.history = [{ state: initial, time: Date.now() }];
    }

    /**
     * Transition to a new state based on an event
     * @param {string} event - The event triggering the transition
     * @param {Object} [data] - Event data
     * @returns {boolean} - Whether transition succeeded
     */
    transition(event, data = {}) {
        const state = this.states[this.current];

        // Check if transition exists for this event
        if (!state.transitions || !state.transitions[event]) {
            return false;
        }

        // Get target state
        const transition = state.transitions[event];
        const target = typeof transition === 'string' ? transition : transition.target;

        if (!this.states[target]) {
            return false;
        }

        // Run guard if exists
        if (transition.guard && !transition.guard(this.context, data)) {
            return false;
        }

        // Run exit action
        if (state.exit) {
            state.exit(this.context, data);
        }

        // Run transition action
        if (transition.action) {
            const updates = transition.action(this.context, data);
            if (updates) {
                this.context = { ...this.context, ...updates };
            }
        }

        // Update state
        const prevState = this.current;
        this.current = target;

        // Add to history
        this.history.push({
            from: prevState,
            to: this.current,
            event,
            time: Date.now()
        });

        // Run entry action
        if (this.states[target].entry) {
            this.states[target].entry(this.context, data);
        }

        return true;
    }

    /**
     * Check if a transition is possible
     * @param {string} event - The event to check
     * @returns {boolean} - Whether transition is allowed
     */
    can(event) {
        const state = this.states[this.current];
        return !!(state.transitions && state.transitions[event]);
    }

    /**
     * Get current state
     * @returns {string} - Current state
     */
    getState() {
        return this.current;
    }

    /**
     * Update context data
     * @param {Object} updates - Context updates
     */
    setContext(updates) {
        this.context = { ...this.context, ...updates };
    }

    /**
     * Get context data
     * @returns {Object} - Current context
     */
    getContext() {
        return { ...this.context };
    }
}

// Example usage: Traffic Light
function example() {
    const light = new StateMachine({
        initial: 'red',
        states: {
            red: {
                entry: () => console.log('Red light! Stop!'),
                transitions: {
                    next: {
                        target: 'green',
                        action: (ctx) => ({ cycles: (ctx.cycles || 0) + 1 })
                    }
                }
            },
            yellow: {
                entry: () => console.log('Yellow light! Caution!'),
                transitions: {
                    next: 'red'
                }
            },
            green: {
                entry: () => console.log('Green light! Go!'),
                transitions: {
                    next: 'yellow'
                }
            }
        }
    });

    light.setContext({ cycles: 0 });

    // Run through a complete cycle
    console.log(`Current: ${light.getState()}`);
    light.transition('next'); // red -> green
    console.log(`Current: ${light.getState()}`);
    light.transition('next'); // green -> yellow
    console.log(`Current: ${light.getState()}`);
    light.transition('next'); // yellow -> red
    console.log(`Current: ${light.getState()}`);

    console.log('Context:', light.getContext());
    return light;
}

// Only uncomment for testing
// example();

module.exports = { StateMachine };

/*
 * Learning notes:
 * 1. Keep interfaces simple but flexible
 * 2. Guard functions prevent invalid transitions
 * 3. Actions allow state changes to have side effects
 * 4. Context provides memory between transitions
 * 5. State entry/exit hooks are powerful for reactions
 */