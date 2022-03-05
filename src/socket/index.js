import io from 'socket.io-client';

const endpoint = 'http://192.168.15.16:8081';
const metricSocket = io(`${endpoint}/metric`, { autoConnect: false });
const analysisSocket = io(`${endpoint}/analysis`, { autoConnect: false });

export { metricSocket, analysisSocket };
