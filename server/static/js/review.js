define(
['ext/backbone', 'ext/jquery', 'ext/underscore', 'ext/underscore.string',
'ratings', 'ext/select2', 'ext/autosize'],
function(Backbone, $, _, _s, ratings, select2) {

  // TODO(david): May want to refactor to just a UserCourse model
  var UserReviewModel = Backbone.Model.extend({
    defaults: {
      term: 'Spring 2012',
      professor: {
        name: 'Larry Smith',
        passion: 4,
        clarity: 4,
        overall: 4,
        comments: 'Professor was Larry Smith. Enough said.'
      },
      course: {
        easiness: 3,
        interest: 5,
        overall: 5,
        comments: 'blha blahb lbha lbahbla blhabl blah balhb balh balh'
      }
    }
  });

  var UserReviewView = Backbone.View.extend({
    events: {
      'change .prof-select': 'showReview'
    },

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(
        _.template($('#review-tpl').html(), this.model.toJSON()));

      // TODO(david): Make this prettier and conform to our styles
      // TODO(david): Allow adding a prof
      this.$('.prof-select').select2({
      });

      this.$('.comments')
        .autosize()
        .css('resize', 'none');

      return this;
    },

    showReview: function() {
      this.$('.review-details').slideDown();
    }
  });

  return {
    UserReviewModel: UserReviewModel,
    UserReviewView: UserReviewView
  };
});
