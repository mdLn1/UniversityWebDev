
module.exports = function(text, label = '') {
	if (!label) return { msg: text, type: 'danger' } ;

	return { msg: text, type: label } ;
};