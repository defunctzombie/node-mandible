var fs = require('fs');
var handlebars = require('handlebars');
var juice = require('juice');

var Emailer = function(dir) {
    if (!(this instanceof Emailer)) {
        return new Emailer(dir);
    }

    var self = this;
    self.dir = dir;
};

Emailer.prototype.html = function(name, locals, cb) {
    var self = this;
    var dir = self.dir;

    var layout_path = dir + '/layout.html';
    var layout_src = fs.readFileSync(layout_path, 'utf8');
    var layout_tmpl = handlebars.compile(layout_src);

    var html_path = dir + '/' + name + '.html';
    var html_src = fs.readFileSync(html_path, 'utf8');
    var html_tmpl = handlebars.compile(html_src);

    locals.body = html_tmpl(locals);

    var html = juice(layout_tmpl(locals))
    cb(null, html);
};

Emailer.prototype.txt = function(name, locals, cb) {
    var self = this;
    var dir = self.dir;

    var layout_path = dir + '/layout.txt';
    var layout_src = fs.readFileSync(layout_path, 'utf8');
    var layout_tmpl = handlebars.compile(layout_src);

    var txt_path = dir + '/' + name + '.txt';
    var txt_src = fs.readFileSync(txt_path, 'utf8');
    var txt_tmpl = handlebars.compile(txt_src);

    locals.body = txt_tmpl(locals);
    cb(null, layout_tmpl(locals));
};

Emailer.prototype.render = function(name, locals, cb) {
    var self = this;

    self.txt(name, locals, function(err, text) {
        if (err) {
            return cb(err);
        }

        self.html(name, locals, function(err, html) {
            if (err) {
                return cb(err);
            }

            cb(null, text, html);
        })
    });
};

module.exports = function mandible(dir) {
    return Emailer(dir);
};
