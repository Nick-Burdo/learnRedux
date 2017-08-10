/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 09.08.17
 * @since 1.0.0
 */

const remoteActionMiddleware = socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    return next(action);
};

export default remoteActionMiddleware;

 
