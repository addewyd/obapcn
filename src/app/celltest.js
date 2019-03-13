import {app, bus} from './app';

export default {  
    props: {
        d: Object
    },
    data: function() {
        return {
            showFI: false,
            showOI: false,
            showFloorPlan: false
        }
    },
    methods: {
        clickFI: function(c) {
            this.showFI = c;
        },
        clickOI: function(c) {
            this.showOI = c;
        }
    },
    computed: {
        status: function() {
            if(parseInt(this.d.sold) > 0) return "chess f-sold";
            return "chess"
        },
        isSold: function() {
            return (parseInt(this.d.sold) > 0);
        }
    },
    mounted: function () {
        var self = this;
        bus.$on('close-fi', function () {
            self.showFI = false;
        });
        bus.$on('close-oi', function () {
            self.showOI = false;
        });
    }
}
