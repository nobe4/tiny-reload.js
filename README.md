# tiny-reload.js

Drop-in file reloader, vanilla JS.

Watch a set of URLs and reload the page when one changes.

# How-to

See [https://github.com/nobe4/tiny-reload.js/blob/master/index.html] or 

```html
<body>
	<script type="text/javascript" src="tiny-reload.js"></script>
	<script type="text/javascript">
		tinyReload([
			'tiny-reload.js',
			'index.html',
		]);
	</script>
</body>
```

# Config

The `tinyReload` function accepts 3 arguments:

- An array, listing all the URLs you want to watch.
- An integer, the number of milliseconds between two fetch (optional, default to `10000`).
- A boolean, whether you want to display the errors or not (optional, default to `false`).

# License

[MIT](https://github.com/nobe4/tiny-reload.js/blob/master/LICENSE)
