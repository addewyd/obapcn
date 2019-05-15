
     var getClass = function (object) {
       return Object.prototype.toString.call(object).slice(8, -1);
     };
     var makeid = function (n) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };
    var isValidCollection = function (obj) {
        try {
            return (
                typeof obj !== "undefined" &&  // Element exists
                getClass(obj) !== "String" &&  // weed out strings for length check
                typeof obj.length !== "undefined" &&  // Is an indexed element
                !obj.tagName &&  // Element is not an HTML node
                !obj.alert &&  // Is not window
                typeof obj[0] !== "undefined"  // Has at least one element
            );
        } catch (e) {
            return false;
        }
    };

// .............................................................................

    var array_merge = function (arr1, arr2) {
        // Variable declarations
        var arr1Class, arr2Class, i, il;

        // Save class names for arguments
        arr1Class = getClass(arr1);
        arr2Class = getClass(arr2);

        if (arr1Class === "Array" && isValidCollection(arr2)) {  // Array-like merge
            if (arr2Class === "Array") {
                arr1 = arr1.concat(arr2);
            } else {  // Collections like NodeList lack concat method
                for (i = 0, il = arr2.length; i < il; i++) {
                    arr1.push(arr2[i]);
                }
            }
        } else if (arr1Class === "Object" && arr1Class === arr2Class) {  // Object merge
            for (i in arr2) {
                if (i in arr1) {
                    if (getClass(arr1[i]) === getClass(arr2[i])) {  // If properties are same type
                        if (typeof arr1[i] === "object") {  // And both are objects
                            arr1[i] = array_merge(arr1[i], arr2[i]);  // Merge them
                        } else {
                            arr1[i] = arr2[i];  // Otherwise, replace current
                        }
                    }
                } else {
                    arr1[i] = arr2[i];  // Add new property to arr1
                }
            }
        }
        return arr1;
    };

// .............................................................................﻿

var getoption = async function(item) {
    var p =
        await new Promise((resolve, reject) =>
    {
        BX24.callMethod('entity.item.get', {
            ENTITY: 'Options',
            SORT: {DATE_ACTIVE_FROM: 'ASC'}
        },
        function (result) {
            console.log('in callback');
                    if (result.error()) {
                        console.error('err:');
                        console.error(result.error());
                        reject([false, result.error])
                    }
                    else
                    {
                        resolve([true,result.answer]);
                    }
                }
            );
    });
    if(p[0] && p[1].total > 0) {
        return p[1].result[0].PROPERTY_VALUES[item];
    }
    return undefined;
};

// .............................................................................

var xhrHandler = function (emitter) {
    //console.log(emitter);
    var jqXHR = window.ActiveXObject ?
            new window.ActiveXObject("Microsoft.XMLHTTP") :
            new window.XMLHttpRequest();

    jqXHR.onloadstart = function (e) {
        //self.emitter('start', e);
    };
    jqXHR.onloadend = function (e) {
        //self.emitter('finish', e);
    };
    //Upload progress
    jqXHR.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round((evt.loaded * 100) / evt.total);
            //self.emitter('progress', percentComplete);
        }
    }, false);
    //Download progress
    jqXHR.addEventListener("progress", function (evt)
    {
        if (evt.lengthComputable) {
            var percentComplete = Math.round((evt.loaded * 100) / evt.total);
            //self.emitter('progress', percentComplete);
        }
    }, false);

    return jqXHR;
}

var addmon = function(d, m) {
    var dd = Date.parse(d);
    dd = new Date(dd);
    dd.setMonth(dd.getMonth() + m);
    var datestring =
            dd.getFullYear() + '-' +
            ("0"+(dd.getMonth()+1)).slice(-2)
            + "-"
            + ("0" + dd.getDate()).slice(-2);
    return datestring;
}

export { getoption, array_merge, makeid, xhrHandler, addmon };
