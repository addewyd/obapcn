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
            showNewFloor: false,
            cellComponent: this.cellcomp,
            c_floorid: undefined,
            c_floorplot: undefined
        };
    },
    
    methods: {
        refreshdata: async function(id) { 
            console.log('RD1', id);
            this.objectid = id;
            var floors = await app.refreshdata(id);
            var d = await Promise.all(
                floors.map( (f) => {
                    var ret = app.getFloorData(f.id);
                    return ret;
                })
            );
            this.records = d;
            console.log('RD2', id);
        },
        clickFloor: function(floorid, floorplot) {
            //Vue.dialog.alert('floor ' + floorid);
            console.log('floor ', floorid);
            this.c_floorid = floorid;
            this.c_floorplot = floorplot;
            this.showFloorPlan = true;
        },
        newFloor: function() {
            if(this.objectid == 0 || this.objectid === '') {
               Vue.dialog.alert('Объект не выбран') ;
            }
            else {
                this.showNewFloor = true;
            }
        },
        delFloor: async function(id) {
            this.$dialog
                .confirm({
                    title: "Really delete?",
                })
                .then(dialog => {
                    Promise.all([
                        app.delFloor(id),
                        this.refreshdata(this.objectid)
                    ])
                })
                .catch(() => { 
                    // resolve(false);
                });             
        },
        delEmptyFloors: async function() {
            await Promise.all([
                app.delEmptyFloors(this.objectid),
                this.refreshdata(this.objectid)
            ]);
            
        }
    },
    
    mounted: function () {
        var self = this;
        this.records = [];
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
        });
        bus.$on('refresh-data', function (n, name) {
            console.log('got refresh-data', n, name);
            self.records = []; // Clear data!!!
            self.objectid = n;
            // have to get real name by id!
            self.objectname = name;
            self.refreshdata(n);
        });
        bus.$on('close-floorplot', function () {
            self.showFloorPlan = false;
        });
        bus.$on('close-newfloor', function () {
            console.log('got cnf');
            self.showNewFloor = false;
        });
    }
}
