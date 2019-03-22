import {Vue, app, bus} from './app';

export default {    
    props: {
        cellcomp: String
    },
    data: function(){
        return {
            objectid: 0,
            objectname: '',
            records: [],
            app: undefined,
            showFloorPlan: false,
            cellComponent: this.cellcomp,
            c_floorid: undefined,
            c_floorplot: undefined
        };
    },
    
    methods: {
        refreshdata: async function(id) {    
            var floors = await app.refreshdata(id);
            var d = await Promise.all(
                floors.map( (f) => {
                    var ret = app.getFloorData(f.id);
                    return ret;
                })
            );
            this.records = d;
        },
        clickFloor: function(floorid, floorplot) {
            //Vue.dialog.alert('floor ' + floorid);
            console.log('floor ', floorid);
            this.c_floorid = floorid;
            this.c_floorplot = floorplot;
            this.showFloorPlan = true;
        }
    },
    
    mounted: function () {
        var self = this;
        this.records = [];
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
        });
        bus.$on('refresh-data', function (n,name) {
            console.log('got refresh-data', n);
            self.records = []; // Clear data!!!
            self.objectid = n;
            self.objectname = name;
            self.refreshdata(n);
        });
        bus.$on('close-floorplot', function () {
            self.showFloorPlan = false;
        });

    }
}
