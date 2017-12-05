<!DOCTYPE html>
<html>
  <head>
    <title>URL Shortener</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <header>
      <h1>
        URL Shortener
      </h1>
    </header>

Example usage:

        https://little-url.herokuapp.com/new/https://www.google.com
        https://little-url.herokuapp.com/new/http://foo.com:80
        
Example output:

        { "original_url":"http://www.google.com", "short_url":"https://little-url.herokuapp.com/81" }
        { "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
  </body>
</html>
