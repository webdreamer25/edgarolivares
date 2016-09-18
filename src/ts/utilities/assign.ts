export const Obj = {
	
	assign: () => {
		if (!Object.prototype.assign) {
			Object.prototype.assign = function () {
				let args = [].slice.call(arguments),
						target = args.shift()

				return args.reduce(function (base, obj) {
					Object.keys(obj).forEach(function (prop) {
						if (obj.hasOwnProperty(prop)) {
							base[prop] = obj[prop]
						}
					})

					return base
				}, target)
			}
		}
	}

}