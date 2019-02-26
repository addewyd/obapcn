import {app, bus} from './app';

export default {    
    props: {
        cellcomp: String
    },
    data: function(){
        return {
            objectid: 0,
            records: [],
            app: undefined,
            cellComponent: this.cellcomp
        };
    },
    
    methods: {
        refreshdata: async function(id) {    
            var floors = await app.refreshdata(id);
            var d = await Promise.all(
                floors.map( (f) => {
                var ret = app.getFloorData(f.id);
                return ret;
            }));
            this.records = d;
        }
    },
    
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
        });
        bus.$on('refresh-data', function (n) {
            console.log('got refresh-data', n);
            self.objectid = n;
            self.refreshdata(n);
        });
    }
}
