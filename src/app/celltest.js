import {app, bus} from './app';

export default {  
    props: {
        d: Object
    },
    data: function() {
        return {
            showFI: false
        }
    },
    methods: {
        click: function(c) {
            this.showFI = c;
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
    }
}
