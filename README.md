# mandible

html and txt email templates with handlebars

```js
var Mandible = require('mandible');

var mandible = Mandible('/path/to/email/templates')

// render this named template with the given locals
// name is resolved to '/path/to/email/templats/name.txt' and 'name.html'
mandible.render(name, locals, function(err, text, html) {
    // send email with text and html body parts
});
```

## Layouts

By default, each template is rendered into a layout.txt or layout.html file in the email templates directory. Use the `{{{body}}}` syntax to indicate where in the layout the child template should be inserted.

## Stylesheets

The [juice](https://www.npmjs.com/package/juice) module is used to inline the stylesheet into the html template for portability across email clients.

Just reference the stylesheet file in the layout.html as such

```html
link rel="stylesheet" href="style.css" />
```

## LICENSE

MIT
