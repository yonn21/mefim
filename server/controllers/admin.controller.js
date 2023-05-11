const actors = require("../models/actors");
const admins = require("../models/admins");
const comments = require("../models/comments");
const directors = require("../models/directors");
const genres = require("../models/genres");
const movies = require("../models/movies");
const ratings = require("../models/ratings");
const users = require("../models/users");

class AdminController {
  getLoginPage(req, res, next) {
    res.render("login", { message: req.flash("error") });
  }

  getLogout(req, res, next) {
    req.logout();
    res.redirect("/admin/login");
  }

  getDashboardPage(req, res, next) {
    if (req.isAuthenticated()) {
      movies.find({}, (err, movieResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            res.render("dashboard", {
              message: req.flash("success"),
              admin: adminResult,
              movies: movieResult,
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  // Movie manager
  getMovieManagerPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 10;
      movies.find({}, (err, movieResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            directors.find({}, (err, directorResult) => {
              actors.find({}, (err, actorResult) => {
                genres.find({}, (err, genreResult) => {
                  ratings.find({}, (err, ratingResult) => {
                    comments.find({}, (err, commentResult) => {
                      res.render("movie-management", {
                        message: req.flash("success"),
                        page: 1,
                        numberItemPerPage: numberItemPerPage,
                        admin: adminResult,
                        movies: movieResult,
                        directors: directorResult,
                        actors: actorResult,
                        genres: genreResult,
                        ratings: ratingResult,
                        comments: commentResult,
                      });
                    });
                  });
                });
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getMovieManagerAtPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 10;
      var page = req.params.page;
      movies.find({}, (err, movieResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            directors.find({}, (err, directorResult) => {
              actors.find({}, (err, actorResult) => {
                genres.find({}, (err, genreResult) => {
                  ratings.find({}, (err, ratingResult) => {
                    comments.find({}, (err, commentResult) => {
                      res.render("movie-management", {
                        message: req.flash("success"),
                        page: page,
                        numberItemPerPage: numberItemPerPage,
                        admin: adminResult,
                        movies: movieResult,
                        directors: directorResult,
                        actors: actorResult,
                        genres: genreResult,
                        ratings: ratingResult,
                        comments: commentResult,
                      });
                    });
                  });
                });
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  // getAddMoviePage(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     directors.find({}, (err, directorResult) => {
  //       actors.find({}, (err, actorResult) => {
  //         genres.find({}, (err, genreResult) => {
  //           res.render("movie-add", {
  //             message: req.flash("success"),
  //             directorOptions: directorResult,
  //             actorOptions: actorResult,
  //             genreOptions: genreResult,
  //           });
  //         });
  //       });
  //     });
  //   } else {
  //     res.redirect("/admin/login");
  //   }
  // }

  // postAddMovie(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     var data = {
  //       primary_title: req.body.primary_title,
  //       secondary_title: req.body.secondary_title,
  //       directors: req.body.directors,
  //       actors: req.body.actors,
  //       genres: req.body.genres,
  //       year: req.body.year,
  //       country: req.body.country,
  //       type: req.body.type,
  //       duration: req.body.duration,
  //       type_sub: req.body.type_sub,
  //       trailer: req.body.trailer,
  //       episodes: req.body.episodes,
  //       summary: req.body.summary,
  //       thumbnail: req.body.thumbnail,
  //       cover_image: req.body.cover_image,
  //       rating: [],
  //       comment: [],
  //       views_week: 0,
  //       views_month: 0,
  //       views_year: 0,
  //       views_all: 0,
  //       number_favourited: 0,
  //     };
  //     var newMovie = new movies(data);
  //     newMovie
  //       .save()
  //       .then(() => {
  //         req.flash("success", "Thêm phim thành công!");
  //         res.redirect("/admin/movie-management/page-1");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         req.flash("error", "Thêm phim không thành công! Có lỗi xảy ra!");
  //         res.redirect("/admin/movie-management/page-1");
  //       });
  //   } else {
  //     res.redirect("/admin/login");
  //   }
  // }

  getDeleteMovieInfo(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      movies.findOneAndRemove({ _id: id }, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Xóa phim không thành công! Có lỗi xảy ra!");
          next();
        }
        req.flash("success", "Xóa phim thành công!");
        res.redirect("/admin/movie-management/page-1");
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  // Director manager
  getDirectorManagerPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 10;
      directors.find({}, (err, directorResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            movies.find({}, (err, movieResult) => {
              res.render("director-management", {
                message: req.flash("success"),
                page: 1,
                numberItemPerPage: numberItemPerPage,
                admin: adminResult,
                movies: movieResult,
                directors: directorResult,
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getDirectorManagerAtPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 10;
      var page = req.params.page;
      directors.find({}, (err, directorResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            movies.find({}, (err, movieResult) => {
              res.render("director-management", {
                message: req.flash("success"),
                page: page,
                numberItemPerPage: numberItemPerPage,
                admin: adminResult,
                movies: movieResult,
                directors: directorResult,
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getAddDirectorPage(req, res, next) {
    if (req.isAuthenticated()) {
      admins.findOne(
        { "loginInformation.username": req.session.passport.user.username },
        (err, adminResult) => {
          res.render("director-add", {
            admin: adminResult,
          });
        }
      );
    } else {
      res.redirect("/admin/login");
    }
  }

  postAddDirector(req, res, next) {
    if (req.isAuthenticated()) {
      var data = {
        director_name: req.body.director_name,
        director_thumbnail: `/${req.file.path}`,
        director_description: req.body.director_description,
      };
      var newDirector = new directors(data);
      newDirector
        .save()
        .then(() => {
          req.flash("success", "Thêm đạo diễn thành công!");
          res.redirect("/admin/director-management/page-1");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Thêm đạo diễn không thành công! Có lỗi xảy ra!");
        });
    } else {
      res.redirect("/admin/login");
    }
  }

  getUpdateDirectorPage(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      directors.findOne({ _id: id }, (err, directorResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            res.render("director-edit", {
              director: directorResult,
              admin: adminResult,
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  postUpdateDirectorPage(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      directors.findOne({ _id: id }, (err, directorResult) => {
        var data = {
          director_name: req.body.director_name,
          director_thumbnail: req.file
            ? `/${req.file.path}`
            : directorResult.director_thumbnail,
          director_description: req.body.director_description,
        };
        directors
          .findOneAndUpdate({ _id: id }, data, { new: true })
          .then(() => {
            req.flash("success", "Cập nhật thông tin đạo diễn thành công!");
            res.redirect("/admin/director-management/page-1");
          })
          .catch((err) => {
            req.flash(
              "error",
              "Cập nhật thông tin đạo diễn không thành công! Có lỗi xảy ra!"
            );
            next();
          });
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getDeleteDirectorInfo(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      directors.findOneAndRemove({ _id: id }, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Xóa đạo diễn không thành công! Có lỗi xảy ra!");
          next();
        }
        req.flash("success", "Xóa đạo diễn thành công!");
        res.redirect("/admin/director-management/page-1");
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  // Actor manager
  getActorManagerPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 10;
      actors.find({}, (err, actorResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            movies.find({}, (err, movieResult) => {
              res.render("actor-management", {
                message: req.flash("success"),
                page: 1,
                numberItemPerPage: numberItemPerPage,
                admin: adminResult,
                movies: movieResult,
                actors: actorResult,
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getActorManagerAtPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 10;
      var page = req.params.page;
      actors.find({}, (err, actorResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            movies.find({}, (err, movieResult) => {
              res.render("actor-management", {
                message: req.flash("success"),
                page: page,
                numberItemPerPage: numberItemPerPage,
                admin: adminResult,
                movies: movieResult,
                actors: actorResult,
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getAddActorPage(req, res, next) {
    if (req.isAuthenticated()) {
      admins.findOne(
        { "loginInformation.username": req.session.passport.user.username },
        (err, adminResult) => {
          res.render("actor-add", {
            admin: adminResult,
          });
        }
      );
    } else {
      res.redirect("/admin/login");
    }
  }

  postAddActor(req, res, next) {
    if (req.isAuthenticated()) {
      var data = {
        actor_name: req.body.actor_name,
        actor_thumbnail: `/${req.file.path}`,
        actor_description: req.body.actor_description,
      };
      var newActor = new actors(data);
      newActor
        .save()
        .then(() => {
          req.flash("success", "Thêm diễn viên thành công!");
          res.redirect("/admin/actor-management/page-1");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Thêm diễn viên không thành công! Có lỗi xảy ra!");
        });
    } else {
      res.redirect("/admin/login");
    }
  }

  getUpdateActorPage(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      actors.findOne({ _id: id }, (err, actorResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            res.render("actor-edit", {
              actor: actorResult,
              admin: adminResult,
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  postUpdateActorPage(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      actors.findOne({ _id: id }, (err, actorResult) => {
        var data = {
          actor_name: req.body.actor_name,
          actor_thumbnail: req.file
            ? `/${req.file.path}`
            : actorResult.actor_thumbnail,
          actor_description: req.body.actor_description,
        };
        actors
          .findOneAndUpdate({ _id: id }, data, { new: true })
          .then(() => {
            req.flash("success", "Cập nhật thông tin diễn viên thành công!");
            res.redirect("/admin/actor-management/page-1");
          })
          .catch((err) => {
            req.flash(
              "error",
              "Cập nhật thông tin diễn viên không thành công! Có lỗi xảy ra!"
            );
            next();
          });
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getDeleteActorInfo(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      actors.findOneAndRemove({ _id: id }, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Xóa diễn viên không thành công! Có lỗi xảy ra!");
          next();
        }
        req.flash("success", "Xóa diễn viên thành công!");
        res.redirect("/admin/actor-management/page-1");
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  // Genre manager
  getGenreManagerPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 20;
      genres.find({}, (err, genreResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            movies.find({}, (err, movieResult) => {
              res.render("genre-management", {
                message: req.flash("success"),
                page: 1,
                numberItemPerPage: numberItemPerPage,
                admin: adminResult,
                movies: movieResult,
                genres: genreResult,
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getGenreManagerAtPage(req, res, next) {
    if (req.isAuthenticated()) {
      var numberItemPerPage = 20;
      var page = req.params.page;
      genres.find({}, (err, genreResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            movies.find({}, (err, movieResult) => {
              res.render("genre-management", {
                message: req.flash("success"),
                page: page,
                numberItemPerPage: numberItemPerPage,
                admin: adminResult,
                movies: movieResult,
                genres: genreResult,
              });
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getAddGenrePage(req, res, next) {
    if (req.isAuthenticated()) {
      admins.findOne(
        { "loginInformation.username": req.session.passport.user.username },
        (err, adminResult) => {
          res.render("genre-add", {
            admin: adminResult,
          });
        }
      );
    } else {
      res.redirect("/admin/login");
    }
  }

  postAddGenre(req, res, next) {
    if (req.isAuthenticated()) {
      var data = {
        genre_name: req.body.genre_name,
        genre_description: req.body.genre_description,
      };
      var newGenre = new genres(data);
      newGenre
        .save()
        .then(() => {
          req.flash("success", "Thêm thể loại thành công!");
          res.redirect("/admin/genre-management/page-1");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Thêm thể loại không thành công! Có lỗi xảy ra!");
        });
    } else {
      res.redirect("/admin/login");
    }
  }

  getUpdateGenrePage(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      genres.findOne({ _id: id }, (err, genreResult) => {
        admins.findOne(
          { "loginInformation.username": req.session.passport.user.username },
          (err, adminResult) => {
            res.render("genre-edit", {
              genre: genreResult,
              admin: adminResult,
            });
          }
        );
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  postUpdateGenrePage(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      genres.findOne({ _id: id }, (err, genreResult) => {
        var data = {
          genre_name: req.body.genre_name,
          genre_description: req.body.genre_description,
        };
        genres
          .findOneAndUpdate({ _id: id }, data, { new: true })
          .then(() => {
            req.flash("success", "Cập nhật thông tin thể loại thành công!");
            res.redirect("/admin/genre-management/page-1");
          })
          .catch((err) => {
            req.flash(
              "error",
              "Cập nhật thông tin thể loại không thành công! Có lỗi xảy ra!"
            );
            next();
          });
      });
    } else {
      res.redirect("/admin/login");
    }
  }

  getDeleteGenreInfo(req, res, next) {
    if (req.isAuthenticated()) {
      var id = req.params.id;
      genres.findOneAndRemove({ _id: id }, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Xóa thể loại không thành công! Có lỗi xảy ra!");
          next();
        }
        req.flash("success", "Xóa thể loại thành công!");
        res.redirect("/admin/genre-management/page-1");
      });
    } else {
      res.redirect("/admin/login");
    }
  }
}

module.exports = new AdminController();
