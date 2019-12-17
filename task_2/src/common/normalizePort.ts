/**
 * Normalize a port into a number, string, or false.
 */

export default function normalizePort(val: string = '') {
    const portLoc = parseInt(val, 10);

    if (Number.isNaN(portLoc)) {
        // named pipe
        return false;
    }

    if (portLoc >= 0) {
        // port number
        return portLoc;
    }

    return false;
}
