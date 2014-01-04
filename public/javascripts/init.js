$(function () {
  // some init code here
  // window.router = new AppRouter();
  // Backbone.history.start();
  var collection = new FaceCollection();
  collection.fetch({
    success: function (data) {
      var view = new FaceCollectionView({collection: data});
      $("body").append(view.render().el);
    }
  });
});
