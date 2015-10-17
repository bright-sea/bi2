const {
  Router,    
  Route,
  IndexRoute
} = ReactRouter;

Meteor.startup(function () {

    require(["wpt/WebPivotTable"], function(WebPivotTable){
        new WebPivotTable({
            customOptions: {

                leavePageWarning: 0,
                uiFlags: {
                    helpBtn: 1,
                    aboutBtn: 1,

                    openWptMenu: 1,
                    saveWptMenu: 1,
                    sourceDataMenu: 1,
                    exportReportMenu: 0,
                    settingMenu: 1,

                    csvFileMenu: 1,
                    xlsFileMenu: 1,
                    xlsxFileMenu: 1,
                    gssFileMenu: 0,
                    olapCubeMenu: 0,

                    internetLinkMenu: 0,
                    localDriveMenu: 1,
                    cloudDriveMenu: 0,
                    copyPasteMenu: 1
                },

                fileLinks: [{
                    type: "WPT",
                    url: "http://bi2.io/json/sample91.wpt",
                    label: "Predefined small CSV WebPivotTable file"
                }, {
                    type: "WPT",
                    url: "http://bi2.io/json/sample92.wpt",
                    label: "Predefined Mondrian OLAP WebPivotTable file"
                }, {
                    type: "WPT",
                    url: "http://bi2.io/json/sample93.wpt",
                    label: "Predefined large CSV WebPivotTable file"
                }, {
                    type: "CSV",
                    url: "http://bi2.io/json/example.csv",
                    label: "USA Selection Poll Data (Total 4,000 records)"
                }, {
                    type: "CSV",
                    url: "http://bi2.io/json/sales.csv",
                    label: "Sales Sample Data (Total 2,823 records)"
                }, {
                    type: "CSV",
                    url: "http://bi2.io/json/FL_insurance.csv",
                    label: "Florida Insurance Data (Total 36,634 records)"
                }, {
                    type: "EXCEL",
                    url: "http://bi2.io/json/example.xls",
                    label: "USA Selection Poll Data (Total 4,000 records)"
                }, {
                    type: "EXCEL",
                    url: "http://bi2.io/json/sales.xls",
                    label: "Sales Sample Data (Total 2,823 records)"
                }, {
                    type: "EXCEL",
                    url: "http://bi2.io/json/FL_insurance.xls",
                    label: "Florida Insurance Data (Total 36,634 records)"
                }, {
                    type: "EXCEL",
                    url: "http://bi2.io/json/example.xlsx",
                    label: "USA Selection Poll Data (Total 4,000 records)"
                }, {
                    type: "EXCEL",
                    url: "http://bi2.io/json/sales.xlsx",
                    label: "Sales Sample Data (Total 2,823 records)"
                }, {
                    type: "EXCEL",
                    url: "http://bi2.io/json/FL_insurance.xlsx",
                    label: "Florida Insurance Data (Total 36,634 records)"
                }, {
                    type: "WSWPT",
                    url: "http://bi2.io/json/sample91.wpt",
                    label: "Predefined small CSV WebPivotTable file"
                }, {
                    type: "WSWPT",
                    url: "http://bi2.io/json/sample92.wpt",
                    label: "Predefined Mondrian OLAP WebPivotTable file"
                }, {
                    type: "WSWPT",
                    url: "http://bi2.io/json/sample93.wpt",
                    label: "Predefined large CSV WebPivotTable file"
                }, {
                    type: "WSDATA",
                    url: "http://bi2.io/json/sample91.wpt",
                    label: "Predefined small CSV WebPivotTable file"
                }, {
                    type: "WSDATA",
                    url: "http://bi2.io/json/sample92.wpt",
                    label: "Predefined Mondrian OLAP WebPivotTable file"
                }, {
                    type: "WSDATA",
                    url: "http://bi2.io/json/sample93.wpt",
                    label: "Predefined large CSV WebPivotTable file"
                }, {
                    type: "GSS",
                    url: "https://docs.google.com/spreadsheet/pub?key=0Alkl5EEsxBwBdDFLV2Q4a1NWMmw1TXZBRlFMZ1Rxd0E&output=html",
                    label: "USA Selection Poll Data (Total 4,000 records)"
                }, {
                    type: "GSS",
                    url: "https://docs.google.com/spreadsheet/pub?key=0Alkl5EEsxBwBdHJMOTh4Sm1BSFlDYXRwVW5lc0xuMVE&output=html",
                    label: "Sales Sample Data (Total 2,823 records)"
                }, {
                    type: "OLAP",
                    url: "http://sampledata.infragistics.com/olap/msmdpump.dll",
                    label: "Sample Microsoft Analysis Service"
                }, {
                    type: "OLAP",
                    url: "http://bi2.io:8080/mondrian/xmla",
                    label: "Sample Mondrian OLAP Server"
                    //                    },{
                    //                        type: "OLAP",
                    //                        url: "http://olap.flexmonster.com/olap/msmdpump.dll",
                    //                        label: "Sample Microsoft Analysis Service"
                    //                    },{
                    //                        type: "OLAP",
                    //                        url: "http://bi2.io:8282/icCube/xmla",
                    //                        label: "Sample IcCube OLAP Server"
                }],

                filepicker: {
                    key: "A4bieoUsyR4yBrNPkFIvrz"  //bi2.io
                }
            }
        },"wpt-container").setCsvUrl("/json/example.csv");
    });


  React.render(
    <Router history={createBrowserHistory()}>
      <Route  path="/" component={AppMain}>
        <IndexRoute component={PostsList} />
        <Route path="*" component={AppNotFound}/>
      </Route>
    </Router>, 
    document.getElementById("app-container"));    
});




      // <Route  path="/" component={AppBody}>
      //   <Route path="todoList/:listId" component={TodoListPage} />
      //   <Route path="join" component={AuthJoinPage} />
      //   <Route path="signin" component={AuthSignInPage} />
      //   <IndexRoute component={AppLoading} />
      //   <Route path="*" component={AppNotFound}/>
      // </Route>
