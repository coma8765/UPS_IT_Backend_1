const { nanoid } = require('nanoid');

var short_urls = { };

exports.shorten 	= function (rq, rp) {
	var random_path = nanoid(8); 
	while ( Object.keys(short_urls).includes(random_path)) { random_path = nanoid(8); };
	short_urls[random_path] = { 
		"origin_url": rq.body["urlToShorten"], 
		"count_redirect":0 
	};

	var data = { 
		"status": "Created",
		"shortenedUrl": "http://localhost/" + random_path
	};
	rp.status(201).send(data);

};


exports.redirect	= function (rq, rp) {
	var path = rq.path.split("/")[1];

	if ( Object.keys( short_urls ).includes( path )) {
		short_urls[ path ][ "count_redirect" ] += 1;
		rp.set({"Location": short_urls[ path ]["origin_url"]});
		var data = {"redirectTo": short_urls[ path ]["origin_url"] };
		rp.status(301).json(data); //.redirect(301, short_urls[ path ]["origin_url"] );
	} else {
		rp.status(404).send("Page not found");
	};
};

exports.countRedirect 	= function (rq, rp) {
	path = rq.path.split("/")[1];
	if ( Object.keys( short_urls ).includes( path ))               	
		var data = { viewCount: short_urls[path]["count_redirect"]  };
		rp.status(200).json(data);
        } else {
                rp.status(404).send("Page not found");
        };

};
