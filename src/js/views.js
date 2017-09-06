(function ($) {
  var View = {
    render: function (options) {
      options = options || {}

      this.$el = $(options.el);

      $.ajax({
        url: options.restUrl,
        dataType: 'JSON',
        success: this.successHandler.bind(this)
      })
    },

    successHandler: function (response) {
      this.onRender(response)
    }
  }

  var SkillListView = Object.create(View)

  SkillListView.onRender = function (data) {
    var model = data['skill-list']

    model.unshift(null);

    var tpl = '', len = model.length, col = 0, n = 7, i = 1;

    for (; col < 3; col++) {
      tpl += '<div class="col-md-4">';
      
      (function (i, n) {
        for (; i < len; i++) {
          if (i === len) break

          tpl += '<div class="skill">'
          tpl += '<h3 class="text-uppercase toggle">' + model[i].name + '</h3>'
          tpl += '<div class="progress-bar" data-progress="' + model[i].level + '">'
          tpl += '<span class="face"><span class="percentile">0</span></span></div></div>'

          if (i === n) break
        }
      })(i, n);

      n += 7;
      i += 7;
      
      tpl += '</div>';
    }

    this.$el.append(tpl)
  }

  var ExperienceListView = Object.create(View)

  ExperienceListView.onRender = function (data) {
    var model = data['experience']

    model.unshift(null)

    var tpl = '', len = model.length, n = 1, i = 1
    var direction = 'Left', delay = '100'

    for (var row = 0; row < 3; row++) {
      tpl += '<div class="row clearfix">';

      for (var col = 0; col < 2; col++) {
        tpl += '<div class="col-md-6 job not-animated" data-animate="fadeIn' + direction + '" data-animate-delay="' + delay + '">';
        
        (function (i, n) {
          for (; i < len; i++) {
            var res = model[i].responsibilities;
            // if (i === len) break

            tpl += '<div class="media"><div class="media-object"><i class="fa fa-suitcase"></i></div><div class="media-body">'
            tpl += '<h4 class="text-uppercase">' + model[i].company + ' <span class="text-success">' + model[i].title + '</span></h4>'
            tpl += '<p class="year text-success">' + model[i].duration + '</p></div></div><ul class="responsibilities">';
            

            for (var r = 0; r < res.length; r++) {
              tpl += '<li>' + res[r] + '</li>'; 
            }
            
            tpl += '</ul>';

            if (i === n) break
          }
        })(i, n);

        n += 1
        i += 1

        switch (direction) {
          case 'Left':
            direction = 'Right'
            break
          default: 
            direction = 'Left'
            break
        }
        
        tpl += '</div>'
      }
      
      tpl += '</div>'
    }

    this.$el.append(tpl)
  }

  SkillListView.render({
    el: '.experience',
    restUrl: 'data/skills.json'
  });

  ExperienceListView.render({
    el: '.employment',
    restUrl: 'data/experience.json'
  });

  console.log('view have been rendered.');
})(jQuery)