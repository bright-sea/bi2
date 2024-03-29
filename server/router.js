// Include the body-parser NPM package using the Meteor.npmRequire method we
// get from the meteorhacks:npm package.
var bodyParser = Meteor.npmRequire( 'body-parser'),
    request = Meteor.npmRequire("request"),
    fs = Meteor.npmRequire('fs'),
    temp = Meteor.npmRequire('temp').track(),
    phantomjs = Meteor.npmRequire('phantomjs'),
    phantom = Meteor.npmRequire('phantom');


// Define our middleware using the Picker.middleware() method.
Picker.middleware( bodyParser.json({limit: '100mb'}) );
Picker.middleware( bodyParser.urlencoded( { limit: '100mb', extended: false } ) );

// Define our routes.
Picker.route( '/wpt/fileProxy', function( params, req, res, next ) {

    request(req.headers.fileurl).pipe(res);

});


Picker.route( '/wpt/xmlaProxy', function( params, req, res, next ) {

    req.pipe(request.get(req.headers.xmlaurl)).pipe(res);

});

Picker.route( '/wpt/generatePdf', function( params, req, res, next ) {

    var type = req.body.type,
        options = req.body.options? JSON.parse(req.body.options) : {},
        html = req.body.html;

    phantom.create({
        //port: 12345,
        binary: phantomjs.path
    },function (ph) {
        ph.createPage(function (page) {
            page.settings = {
                loadImages: true,
                localToRemoteUrlAccessEnabled: true,
                javascriptEnabled: true,
                loadPlugins: false
//                    userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'
            };
            //page.set('viewportSize', { width: 800, height: 600 });
            //page.set('scrollPosition',{top: 100, left: 0});

            var paperSize = {
                margin: {
                    top: options.paperMarginTop || '1cm',
                    left: options.paperMarginLeft || '1cm',
                    bottom: options.paperMarginBottom || '1cm',
                    right: options.paperMarginRight || '1cm'
                },
                header: {
                    height: options.headerHeight || '1cm',
                    contents: ph.callback(function(pageNum, numPages) {
                        return '';
                        //                       return '<h1>test header <span style="float:right">' + pageNum + ' / ' + numPages + '</span></h1>';
                    })
                },
                footer: {
                    height: options.footerHeight || '1cm',
                    contents: ph.callback(function(pageNum, numPages) {
//                        return '<h1>'+(options.footer || 'test footer')+' <span style="float:right">' + pageNum + ' / ' + numPages + '</span></h1>';
                        return '<span style="float:right">' + pageNum + ' / ' + numPages + '</span>';
                    })
                }
            };

            if (/Custom/i.test(options.paperFormat)){
                paperSize.width =  options.paperWidth || '600px';   // 'mm', 'cm', 'in', 'px'. No unit means 'px'.
                paperSize.height = options.paperHeight || '600px';
            }else{
                paperSize.format = options.paperFormat || 'A4';   //'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'.
                paperSize.orientation = options.paperOrientation || 'portrait';  //'portrait', 'landscape'
            }
            page.set('paperSize', paperSize);
            page.set('zoomFactor', options.zoomFactor || 1);

            page.set('content', html, function (error) {

                temp.open('report', function(err, info) {
                    if (!err) {
                        page.render(info.path, {
                            format: type,
                            quality: '100'
                        }, function (error) {
                            var readStream = fs.createReadStream(info.path);
                            readStream.pipe(res);
                            readStream.on('close', function(){
                                temp.cleanup();
                            });
                        });
                        ph.exit();
                    }
                });
            });
        });
    });

});

