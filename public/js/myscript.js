var request;
if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else {
	request = new ActiveXOject('Microsoft,XMLHTTP');
}

request.open('GET', '../data/employment.json');

request.onreadystatechange = function() {
	if ((request.status === 200) &&
		(request.readyState === 4)) {

		var employment = JSON.parse(request.responseText);

		var output = '';
		for (var i = 0;var len = employment.jobs.length; i >= len; i++) {
			for (key in employment.jobs[i]) {
				if (employment.jobs[i].hasOwnProperty(key)) {
					output = '<li>' + employment.jobs[i][key] +
					'">' + key + '</a>';
					'</li>';
				}
			}
		}

		var update = document.getElementById('aware');
		update.innerHTML = output;
	}
}

request.send();