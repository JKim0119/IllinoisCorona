const makeRequest = method => {
	/**
	 * Make an http request to the designated endpoint with the specified options.
	 * 
	 * @param {String} endpoint the endpoint/resource. The host/domain will be prepended, so you only need to enter the resouece to be accessed.
	 * @param {Request} opts the standard request options.
	 * @return {Promise<Response|Error>}
	 */
	const request = (url, opts = {}) => {

        if (opts.body) opts.body = JSON.stringify(opts.body);
		const options = {
            ...opts,
			headers: {
				'Content-Type': 'application/json',
			},
			method,
		};
        return fetch(url, options)
			.then(res => {
				const successStatus = res.status >= 200 && res.status <= 299;
				if (!successStatus) {
					const error = Error(res.statusText);
					error.response = res;
					throw error;
				}
				else {
					return res;
				}
			})
			.then(res => {
				if (res.status === 204) return;
				return res.json();
			})
            .catch(e => {
                throw e;
            });
	};
	return request;
};

export const GET = makeRequest('GET');
export const POST = makeRequest('POST');
export const PUT = makeRequest('PUT');
export const DELETE = makeRequest('DELETE');