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

    var html = layout_tmpl(locals);

    // apply the delicious juice!
    juice.juiceContent(html, { url: 'file://' + dir + '/layout.html' }, function(err, html) {
        cb(err, html);
    });
};

Emailer.prototype.txt = function(name, locals, cb) {
    var self = this;
    var dir = self.dir;

    var layout_path = dir + '/layout.txt';
    var layout_src = fs.readFileSync(layout_path, 'utf8');
    var layout_tmpl = handlebars.compile(layout_src);

    var html_path = dir + '/' + name + '.txt';
    var html_src = fs.readFileSync(html_path, 'utf8');
    var html_tmpl = handlebars.compile(html_src);

    locals.body = html_tmpl(locals);

    cb(null, layout_tmpl(locals));
};

module.exports = function mandible(dir) {
    return Emailer(dir);
};
