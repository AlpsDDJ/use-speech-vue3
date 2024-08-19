/**
 * 创建一个等待指定毫秒数的Promise对象
 *
 * @param ms - 延迟的毫秒数，用于控制异步操作的等待时间
 * @returns 返回一个Promise对象，该对象在指定的毫秒数后自动解析
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 异步等待直到条件满足或超过最大等待时间。
 *
 * @param waitCondition - 等待条件函数，返回布尔值，用于判断是否继续等待。
 * @param ms - 每次等待的间隔时间（毫秒），默认为10毫秒。
 * @param maxMs - 最大等待时间（毫秒），默认为0表示无限等待。
 */
export const waitFor = async (waitCondition: () => boolean, ms: number = 10, maxMs: number = 0) => {
    let idx = 0;
    while (waitCondition() && (maxMs === 0 || idx * ms < maxMs)) {
        maxMs && idx++;
        await wait(ms);
    }
};