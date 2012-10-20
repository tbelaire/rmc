require(
['ext/jquery','course', 'took_this', 'user', 'tips', 'prof', 'ratings',
'user_course', 'review', 'sign_in'],
function($, course, tookThis, user, tips, prof, ratings, user_course, _review, _sign_in) {

  course.CourseCollection.addToCache(pageData.courseObj);
  user.UserCollection.addToCache(pageData.userObjs);
  user_course.UserCourses.addToCache(pageData.userCourseObjs);
  prof.ProfCollection.addToCache(pageData.professorObjs);

  var courseObj = pageData.courseObj;
  var courseModel = course.CourseCollection.getFromCache(courseObj.id);
  var userCourse = courseModel.get('user_course');

  var overallRating = courseModel.getOverallRating();
  var ratingBoxView = new ratings.RatingBoxView({ model: overallRating });
  $('#rating-box-container').html(ratingBoxView.render().el);

  var courseInnerView = new course.CourseInnerView({
    courseModel: courseModel,
    userCourse: userCourse
  });
  $('#course-inner-container').html(courseInnerView.render().el);
  courseInnerView.animateBars();

  var tookThisSidebarView = new tookThis.TookThisSidebarView({
    userCourses: courseModel.get('friend_user_courses'),
    courseCode: courseModel.get('code'),
    currentTermId: window.pageData.currentTermId
  });
  $('#took-this-sidebar-container').html(tookThisSidebarView.render().el);

  var tipsCollection = new _review.ReviewCollection(window.pageData.tipObjs);
  var tipsView = new tips.ExpandableTipsView({ reviews: tipsCollection });
  $('#tips-collection-container').replaceWith(tipsView.render().el);

  // TODO(david): Handle no professors for course
  var profsCollection = courseModel.get('professors');
  var profsView = new prof.ProfCollectionView({ collection: profsCollection });
  $('#professor-review-container').html(profsView.render().el);

  _sign_in.renderBannerIfNecessary(
      'BANNER_COURSE_PAGE',
      'See friends taking this course!');

  mixpanel.track('Impression: Single course page');
});
