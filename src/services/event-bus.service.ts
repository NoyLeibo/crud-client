export const SHOW_MSG: string = 'show-msg';

function createEventEmitter(): { on: (evName: string, listener: Function) => () => void; emit: (evName: string, data: any) => void } {
    const listenersMap: { [key: string]: Function[] } = {};
    return {
        on(evName: string, listener: Function): () => void {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener];
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener);
            };
        },
        emit(evName: string, data: any): void {
            if (!listenersMap[evName]) return;
            listenersMap[evName].forEach(listener => listener(data));
        }
    };
}

export const eventBus = createEventEmitter();

export function showUserMsg(msg: { txt: string; type: string }): void {
    eventBus.emit(SHOW_MSG, msg);
}

export function showSuccessMsg(txt: string): void {
    showUserMsg({ txt, type: 'success' });
}

export function showErrorMsg(txt: string): void {
    showUserMsg({ txt, type: 'error' });
}

(window as any).showUserMsg = showUserMsg;