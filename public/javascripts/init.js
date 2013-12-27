$(function() {
	// some init code here
	var collection = new BookCollection();
	collection.fetch({
		success: function(data) {
			var view = new BookCollectionView({collection: data});
			$("body").append(view.render().el);
		}
	});
});
