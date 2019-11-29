export var RestfulResource;
(function (RestfulResource) {
    let Routes;
    (function (Routes) {
        Routes["Create"] = "create";
        Routes["Edit"] = "edit";
        Routes["Destroy"] = "destroy";
        Routes["Index"] = "index";
        Routes["Show"] = "show";
        Routes["Store"] = "store";
        Routes["Update"] = "update";
    })(Routes = RestfulResource.Routes || (RestfulResource.Routes = {}));
})(RestfulResource || (RestfulResource = {}));
