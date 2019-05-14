import {app, bus} from './app';

export default {
    props: {
        d: Object,
        objectid: String,
        objectname: String
    },
    data: function() {
        return {
            showFI: false,
            showOI: false,
            showFloorPlan: false,
            fdata: this.d,
            deal: undefined,
            orderdata: undefined,
            saving: {state: false}
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
        cellstyle: function() {
            if(this.deal && this.fdata.deal_id) {
                var st_colors = [
                    'aaffaa',
                    '7aaaff',
                    'ffaaff',
                    'aaffff',
                    '7fffaa',
                    '2fff4a',
                    'ff2f4a',
                    'aaff1a',
                    '7aaa1f',
                    'ff1aff',
                    'faff8f',
                    '1fffaa',
                    '1fff4a',
                    '1f2ffa'
                ];
                var i = 0;
                var stages = {};
                app.states.forEach(e => {
                    stages[e.STATUS_ID] =  st_colors[i++];
                });
                var st = stages[this.deal.STAGE_ID];
                return "background-color: #" + ( st ? st : "aaaaaa");
            }
            else if(!this.deal && this.fdata.deal_id) {
                return "background-color: #ffcaaa";
            } else {
                return "background-color: #f0f0f0";
            }
        },
        isSold: function() {
            return (parseInt(this.d.sold) > 0);
        }
    },
    asyncComputed: {
        dealdata: async function() {
            if(this.fdata.deal_id) {
                var d = await app.getDealData(this.fdata.deal_id);
                if(d.success) {
                    this.deal = d.data;
                }
                else {
                    console.log('error(as)',d.data);
                    this.deal = undefined;
                }
            }
            return this.deal;
        },
        odata: async function() {
                var d = await app.getOrderData(this.d.id);
                if(d.length < 1) this.orderdata = {};
                else this.orderdata = d[0];
                //bus.$emit('order-refresh');
                return d;
        }

    },
    created: function () {
        var self = this;

        this.$on('close-fi', function () {

            // how to restore this.fdata here?
            bus.$emit('refresh-data', self.objectid, self.objectname);
            self.showFI = false;
        });
        this.$on('close-oi', async function () {
            // ???? odata refresh
                var d = await app.getOrderData(self.d.id);
                if(d.length < 1) self.orderdata = {};
                else self.orderdata = d[0];

            self.showOI = false;
        });
        this.$on('save-fi', function () {
            console.log('got save-fi');
            self.saving.state = true;
        });
        this.$on('save-oi', function () {
            console.log('got save-oi');
            self.saving.state = true;
        });

    },
    beforeDestroy: function() {
        this.$off('close-fi');
        this.$off('close-oi');
        this.$off('save-fi');
        this.$off('save-oi');
    }
}
