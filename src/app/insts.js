
import Vue from 'vue';
import $ from 'jquery';
import popper from 'popper.js';
import Inst from '../vue/install.vue';

(function () {
     var getClass = function (object) {
       return Object.prototype.toString.call(object).slice(8, -1);
     };
     window.makeid = function (n) {
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
    window.array_merge = function (arr1, arr2) {
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
  
})();
﻿
// .............................................................................

function application() {}

application.prototype.init = function() {
    BX24.init(function(){
        console.log('init');
    });
}
// .............................................................................

application.prototype.prepareEntity = function(opts) {
    var batch = [];
    batch.push(['entity.add', 
        {'ENTITY': 'Options', 'NAME': 'Options', 'ACCESS': {U1:'W',AU:'R'}}]);
    batch.push(['entity.update', 
        {'ENTITY': 'Options', 'ACCESS': {AU: 'W'}}]);
    batch.push(['entity.item.property.add', 
        {ENTITY: 'Options', 
            PROPERTY: 'dbname', NAME: 'dbname', TYPE: 'S'}]); 
    batch.push(['entity.item.add', {
        ENTITY: 'Options',
        DATE_ACTIVE_FROM: new Date(),
        DETAIL_PICTURE: '',
        NAME: 'dbname',
        PROPERTY_VALUES: {
            dbname: opts.dbname
        }   
        }]);
    return batch;
};

// .............................................................................

var getoption = async function(item) {
    var res;
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
                        reject(result.error)
                    }
                    else
                    {
                        resolve(result.answer)
                        res = result;
                    }                
                }
            );
    });
    console.log('p & res');
    console.log(p);
    console.log(res);
    return p; // res;
};

// .............................................................................

var saveoptions = async function(opts) {
    
    // check presence first!
    // get dbname from options
    // 
    var opt_present = false;
    var p;
    try {
       p = await getoption('dbname');
       opt_present = true;
    }
    catch(e)
    {
        console.log('catched:');
        console.log(e)
    }
    
    console.log('get:');
    console.log(p);
    
    if(!opt_present) {
        var b = app.prepareEntity(opts);
        var pr = new Promise((resolve, reject) => {
        
            BX24.callBatch(b, 
                function(result) {
                    if(result.error) {
                        reject(result.error);
                    }
                    else {
                        resolve(result)
                    }
                }
            );
        });
        console.log('pr:');
        console.log(pr);
        return pr;
    } else {
    
        return p;
    }
};

// .............................................................................

var createdbname = function() {
    return 'db_' + makeid(10);
}

// .............................................................................

application.prototype.install = async function(ai, asc) {
    
    var dbname = createdbname(); // or get it from user input
    console.log(dbname);
    var p01 = await saveoptions(
        {
            dbname: dbname
        }
    );
    console.log('p01:');
    console.log(p01);
    
    var params = array_merge(
        {
            'operation': 'updcodes', 
            dbname: dbname,
            'ai' :ai, 'ac':asc
        }, BX24.getAuth());
    
    $.ajax({url:'cntr/instcntr.php', type:'POST',data:params, dataType:'json',
        success:function(data){
            console.log(data);
            //var answer = JSON.parse(data);
            console.log(data['result']);
            BX24.installFinish();
    },
        error: function(e){ console.log('ajax createdb',e );}
    })        
}

application.prototype.delopts = async function() {
    console.log('before od');
    await BX24.callMethod('entity.delete', {'ENTITY': 'Options'});
    console.log('after od');
}

var app = new application();

// .............................................................................

new Vue({
  el: '#inst-i',
  components: {
    'inst-i': Inst
  }
})

export default app

