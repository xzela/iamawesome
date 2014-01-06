var Face = Backbone.Model.extend({
  idAttribute: "_id"
});

var FaceCollection = Backbone.Collection.extend({
  model: Face,
  url: "/faces"
});

var FaceView = Backbone.View.extend({
  tagName: "li",
  classname: "face",
  render: function () {
    var template = $("#facetemplate").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var FaceCollectionView = Backbone.View.extend({
  tagName: "ul",
  render: function () {
    this.$el.html("");
    this.collection.each(function (face) {
      var faceView = new FaceView({model: face});
      this.$el.append(faceView.render().el);
    }, this);
    return this;
  }
});

//  DELETE THIS
//  render: function () {
//    this.$el.html("");
//    this.collection.each(function (book) {
//      var bookView = new BookView({model: book});
//      this.$el.append(bookView.render().el);
//    }, this);
//    return this;
//  }
//

// var BookView = Backbone.View.extend({
//  events: {
//    "click .name": "singleBookLink"
//  },
//  tagName: "li",
//  className: "book",
//  render: function () {
//    var template = $("#booktemplate").html();
//    var compiled = Handlebars.compile(template);
//    var html = compiled(this.model.attributes);

//    this.$el.html(html);

//    return this;
//  },
//  singleBookLink: function (e) {
//    //e.preventDefault();
//    var id = this.model.get('_id');
//    router.navigate("book/" + id, {trigger: true});
//  }
// });


// var BookDetailView = Backbone.View.extend({
//  render: function () {
//    var template = $("#detailbooktemplate").html();
//    var compiled = Handlebars.compile(template);
//    var html = compiled(this.model.attributes);
//    this.$el.html(html);
//    return this;
//  }
// });


// var BookCollectionView = Backbone.View.extend({
//  initialize: function () {
//    //this.listenTo(this.collection, "reset", this.render);
//  },
//  tagName: "ul",
//  className: "books",
//  render: function () {
//    this.$el.html("");
//    this.collection.each(function (book) {
//      var bookView = new BookView({model: book});
//      this.$el.append(bookView.render().el);
//    }, this);
//    return this;
//  }
// });


// var AppRouter = Backbone.Router.extend({
//  initialize: function () {
//    this._setupCollection();
//  },
//  routes: {
//    "" : "index",
//    "book/:id": "singleBook"
//  },
//  _setupCollection: function () {
//    if (this.collection) return;
//    var data = $("#initialContent").html();
//    collection = new BookCollection();
//    collection.fetch({
//      success: function (data) {
//        this.collection = data;
//      }
//    });
//  },
//  _renderView : function (view) {
//    $(".app").html(view.render().el);
//  },
//  index: function () {
//    var view = new BookCollectionView({collection: this.collection});
//    this._renderView(view);
//  },
//  singleBook: function (id) {
//    console.log("singleBookMethod: " + id);
//    var book = this.collection.get(id);
//    var view  = new BookDetailView({model: book});
//    this._renderView(view);
//  }
// });
