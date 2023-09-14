const getImageUrl = (imageName) => {
	//get api url form env
	let api = process.env.REACT_APP_API;

	if (api[api.length - 1] !== "/") {
		const url = `${api}/files/${imageName}`;
		return url;
	}

	const url = `${api}files/${imageName}`;
	return url;
};

export default getImageUrl;
