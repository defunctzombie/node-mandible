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

## LICENSE

MIT
