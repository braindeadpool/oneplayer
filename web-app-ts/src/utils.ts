export function secondsToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let formattedTime = '';
    if (hours > 0) {
        if (hours < 10) {
            formattedTime += '0';
        }
        formattedTime += hours.toString() + ':';
    }
    if (minutes < 10) {
        formattedTime += '0';
    }
    formattedTime += minutes.toString() + ':';

    if (seconds < 10) {
        formattedTime += '0';
    }
    formattedTime += seconds.toString();
    return formattedTime;
}

export function getLastValueFromArrayOrValue(value: number | number[]): number {
    if (Array.isArray(value)) {
        return value[value.length - 1];
    } else {
        return value;
    }
}
