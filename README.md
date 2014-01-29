Plot
======

The best project ever.

## install

### from bower
```
bower install Plot
```

### from github
```
git clone git://github.com/fujisawa-shin/Plot.git
```

## usage
```
// =================================== //
//  simple async process
// =================================== //

var $body = $('body');
var posts;

var plot = new Plot([function (next) {
    $.getJson('/api/posts', function (json) {
        posts = json;
        next();    
    });
}, function () {
    $.each(posts, function (index, post) {
        $body.append('<div class="post">' + post.title + '</div>');
    });
}]).play();

```

```
// =================================== //
//  write plot & parallel process
// =================================== //

var $body = $('body');
var posts;

var plot = new Plot([
    'load_posts',
    'check_posts',
    'preload_image',
    'render'
]);

plot.cut('load_posts', function (next) {
    $.getJson('/api/posts', function (json) {
        posts = json;
        next();    
    });
});

plot.cut('check_posts', function (next) {
    $.each(posts, function (index, post) {
        var imageUrl = post.image_url;
    
        plot.cut('preload_image', function (next) {
            var image = new Image();
            image.src = imageUrl;
            image.onload = next;
        });
    });
});

plot.cut('render', function (next) {
    $.each(posts, function (index, post) {
        $body.append([
            '<div class="post">',
            '<h1>' + post.title + '</h1>',
            '<img src="' + post.image_url + '" />',
            '</div>'
        ].join('\n'));
    });
});
```
