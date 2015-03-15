import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';

var client = rest.wrap(mime).wrap(errorCode);
export default client;
