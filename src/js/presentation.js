(function() {

	var presBtn = document.getElementById('start-presentation-btn');
	var _el = document.querySelectorAll('section.tt-info');

	// function createToolTip(element) {
	// 	var element = document.createElement('div');
	// 	element.id = 'tooltip';
	// 	body.appendChild(element);
	// }

	document.addEventListener('click', function(e) {
		var _hasInfo = document.querySelectorAll('[data-info]');

		if (_hasInfo) {

			// create the tool tip window
			var infoWin = document.createElement('div');
			infoWin.id = 'tooltip';

			// add the tool tip window to the current event target
			e.target.appendChild(infoWin);
			var data = _el.getAttribute('data-info');
			infoWin.innerHTML = data;

			var toolTip = document.getElementById('tooltip');

			// createToolTip(toolTip);
			// console.log(e.target);
			// console.log(_el);
			console.log('i am working right now');

		}// if data-info exists

		_el.addEventListener('mouseout', function(evt) {

			if (toolTip) {
				toolTip.remove();
				console.log('closing tool tip');
			} 

		}, false); // on mouse out

	}, false);	// on mouse over

})();