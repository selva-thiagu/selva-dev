/**
 *  SERVICE: PAGINATION SERVICE
 *
 * Description: This service handles the crud operation on specific model/entity
 */
angular.module('pagination', []);
angular.module('pagination').factory('paginationService', ['$http', '$q', function($http, $q) {
    var paginationObj = {};
    var paginationString;
    
    var pagesOnToolbar = 5;
    var itemsPerPage = 15;
    var pageNum = 1;
    var filer;
    var tags;
    var displayName;
    var params={};
    if(typeof(searchString)=='object'){
        filter = {}
        for(var key in searchString){
            if(searchString[key]){
                filter[key] = searchString[key];
            }
            
        }
    }else{
        filter=searchString;
    }
    var params = queryData;
    //console.log('initial query is'+ params);
    params.searchString = JSON.stringify(filter);
    params.itemsPerPage = itemsPerPage;
    
    console.log('params ------ ' + JSON.stringify(params));
    if(queryData && queryData.itemsPerPage){
        params.itemsPerPage = parseInt(queryData.itemsPerPage);
    }
    if(queryData && queryData.pageNum){
        console.log('pagenum in params before parsing is'+ params.pageNum + ' ------- ' + parseInt(queryData.pageNum));
        pageNum = parseInt(queryData.pageNum);
        console.log('pagenum in params after parsing is'+ params.pageNum);
    }else{
        params.pageNum = pageNum;
    }
    paginationString = '<ul class="pagination pagination-sm" style="margin:0px; 0px; padding-top:15px; padding-bottom:15px;">';
    if(noofRecords > 0){
        var noofPages = Math.ceil(noofRecords/itemsPerPage);
        var pageStartNum = (Math.ceil(pageNum/pagesOnToolbar)-1)*pagesOnToolbar;
        var pageEndNum = ((Math.ceil(pageNum/pagesOnToolbar)-1)*pagesOnToolbar)+pagesOnToolbar+1;
        if(noofPages < pageEndNum){
            pageEndNum = noofPages+1;
        }
        var recordsFrom = ((pageNum-1)*itemsPerPage)+1;
        var recordsTo = (recordsFrom-1)+itemsPerPage;
        if(recordsTo > noofRecords){
            recordsTo = noofRecords;
        }
        var leftArrow = false;
        var rightArrow = false;
        if(Math.ceil(noofPages/pagesOnToolbar)>Math.ceil(pageNum/pagesOnToolbar)){
            rightArrow = true;
        }
        if(Math.ceil(pageNum/pagesOnToolbar)>1){
            leftArrow = true;
        }
        paginationString = paginationString+'<li><span class="label">Showing '+recordsFrom+' - '+recordsTo+' of '+noofRecords+'</span></li>';
        if(leftArrow == false){
            paginationString = paginationString+'<li class="disabled"><a>&laquo</a></li>';
        }else{
            params.pageNum = pageStartNum;
            if(filter){paginationString = paginationString+'<li title="previous set of pages"><a data-ep2action=\'{"call":"'+call+'","params":'+JSON.stringify(params)+',"showin":"'+showin+'"}\'>&laquo</a></li>';}else{
                paginationString = paginationString+'<li title="previous set of pages"><a data-ep2action=\'{"call":"'+call+'","params":'+JSON.stringify(params)+',"showin":"'+showin+'"}\'>&laquo</a></li>';
            }
            
        }
        for(var i=pageStartNum+1;i<pageEndNum;i++){
            if(pageNum == i){
                paginationString = paginationString+'<li class="active" title="page '+i+'"><a>'+i+'</a></li>';
            }else{
                params.pageNum = i;
                if(filter){paginationString = paginationString+'<li title="page '+i+'"><a data-ep2action=\'{"call":"'+call+'","params":'+JSON.stringify(params)+',"showin":"'+showin+'"}\'>'+i+'</a></li>';}else{
                    paginationString = paginationString+'<li title="page '+i+'"><a data-ep2action=\'{"call":"'+call+'","params":'+JSON.stringify(params)+',"showin":"'+showin+'"}\'>'+i+'</a></li>';
                }
            }
        }
        if(rightArrow == false){
            paginationString = paginationString+'<li class="disabled"><a>&raquo</a></li>';
        }else{
            params.pageNum = pageEndNum;
            if(filter){paginationString = paginationString+'<li title="next set of pages"><a data-ep2action=\'{"call":"'+call+'","params":'+JSON.stringify(params)+',"showin":"'+showin+'"}\'>&raquo</a></li>';}else{
                paginationString = paginationString+'<li title="next set of pages"><a data-ep2action=\'{"call":"'+call+'","params":'+JSON.stringify(params)+',"showin":"'+showin+'"}\'>&raquo</a></li>';    
            }
        }
        paginationString = paginationString+'</div>';
    }else{
        paginationString = paginationString+'<li><span class="label">Showing '+noofRecords+' - '+noofRecords+' of '+noofRecords+'</span></li>';
    }
    
    paginationObj.pageNum = pageNum;
    paginationObj.itemsPerPage = itemsPerPage;
    paginationObj.paginationString = paginationString;
    
    return paginationObj;
}]);
