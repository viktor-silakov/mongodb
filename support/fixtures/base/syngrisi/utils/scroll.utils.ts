/**
 * Scrolls the window up or down at a specified speed.
 *
 * @async
 * @function
 * @param {Object} args - The arguments for the scroll function.
 * @param {('up'|'down')} args.direction - The direction to scroll. "up" to scroll up and "down" to scroll down.
 * @param {('slow'|'fast')} args.speed - The speed of the scroll. "slow" for slower scrolling and "fast" for faster scrolling.
 *
 * @example
 * // Scrolls down at a slow speed.
 * scroll({ direction: "down", speed: "slow" });
 *
 * @example
 * // Scrolls up at a fast speed.
 * scroll({ direction: "up", speed: "fast" });
 */
export const scroll = async (args: ScrollArgs): Promise<void> => {
    const {direction, speed} = args;

    const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
    const scrollHeight = (): number => document.body.scrollHeight;
    const start: number = direction === 'down' ? 0 : scrollHeight();
    const shouldStop = (position: number): boolean => direction === 'down' ? position > scrollHeight() : position < 0;
    const increment: number = direction === 'down' ? 100 : -100;
    const delayTime: number = speed === 'slow' ? 50 : 10;

    for (let i = start; !shouldStop(i); i += increment) {
        window.scrollTo(0, i);
        await delay(delayTime);
    }
};

export function scrollToBottom(page: Page) {
    return page.evaluate(scroll, {direction: 'down', speed: 'slow'});
}

export function scrollToTop(page: Page) {
    return page.evaluate(scroll, {direction: 'up', speed: 'fast'});
}
