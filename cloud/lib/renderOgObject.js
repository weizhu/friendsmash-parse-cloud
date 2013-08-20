/*
 * Render a public web page that contains required Open Graph metedata
 * for an given OG object.
 *
 */
function renderOgObject(parseClass, id, res) {
  var query = new Parse.Query(Achievement);
  query.get(id).then(function(result) {
    var ogProps = result.getOgProperties();
    res.render('ogObject', {
      title: parseClass.OG.type,
      ogProps: ogProps
    });
  });
}

exports.render = renderOgObject;
