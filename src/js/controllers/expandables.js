var Expandable = function (element) {
	this.element = document.querySelector(element);
	this.height = undefined;

	this.setup();
}

Expandable.prototype.setup = function () {
	this.height = this.element.height

	this.handler();

	return this;
}

Expandable.prototype.handler = function () {
	var self = this,
			isOpen = false;

	this.element.addEventListener('click', function () {

		if (isOpen === false) 
			self.element.attribute('height', self.height + 'px')
		else
			self.element.attribute('height', '0px')
		
		return false;
	})

	return this;
}