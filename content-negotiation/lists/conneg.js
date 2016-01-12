function(head, req) {
  var output = [];
  while (row = getRow()) {
    output.push(row);
  }

  // Content Negotiation happens via the provides() function
  // http://docs.couchdb.org/en/1.6.1/query-server/javascript.html#provides
  provides('json', function() {
    // default Content-Type is application/json, so we don't need start() here
    // but we will pretty print it ^_^
    return JSON.stringify(output, null, 4);
  });
  provides('html', function() {
    // using start() to setup the proper Content-Type header
    // ...CouchDB was/should-be doing this automatically...
    start({
      headers: {
        'Content-Type': 'text/html'
      }
    });
    return '<textarea>' + JSON.stringify(output, null, 4) + '</textarea>';
  });
}
